import { isUpApiError, UpApi } from "../src";

require('dotenv').config();

const args = require('minimist')(process.argv.slice(2));
if (args._.length < 2) {
  console.log('Usage: up <module> <endpoint> [<path-param>] [option=value ...]')
  process.exit();
}

const apiModule = args._[0];
const apiEndpoint = args._[1];
const pathParam = args._[2] ?? null;
delete args._;
const apiParams = args;

const up = new UpApi(process.env.API_KEY);

const validateApiKey = async () => {
  try {
    await up.util.ping();
  } catch (e) {
    if (isUpApiError(e)) {
      if (401 === e.response.status) {
        throw new Error('Invalid API key');
      }
    }

    // Unexpected error
    throw e;
  }
};

const executeApiCall = async (module: string, endpoint: string, pathParam: object | null, params: object) => {
  await validateApiKey();

  if (!up.hasOwnProperty(module)) {
    console.error(`Invalid API module: ${module}`);
    process.exit(1);
  }

  if (typeof up[module][endpoint] !== 'function') {
    console.error(`Invalid endpoint in "${endpoint}": ${module}`);
    process.exit(1);
  }

  const args = pathParam === null ? [params] : [pathParam, params];

  try {
    return await up[module][endpoint](...args);
  } catch (e) {
    if (isUpApiError(e)) {
      // Handle error returned from Up API
      console.log(e.response.data.errors);

      return;
    }

    // Unexpected error
    throw e;
  }
}

executeApiCall(apiModule, apiEndpoint, pathParam, apiParams).then(async (response) => {
  console.dir(response, {depth: null});
});

