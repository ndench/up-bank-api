# up-bank-api

[![npm version](https://badge.fury.io/js/up-bank-api.svg)](https://www.npmjs.com/package/up-bank-api)
[![npm downloads](https://img.shields.io/npm/dt/up-bank-api)](https://www.npmjs.com/package/up-bank-api)
[![download size](https://img.shields.io/bundlephobia/min/up-bank-api)](https://www.npmjs.com/package/up-bank-api)
[![Publish](https://github.com/ndench/up-bank-api/workflows/Publish/badge.svg)](https://github.com/ndench/up-bank-api/actions?query=workflow%3APublish)

A TypeScript wrapper around the [UpBank API](https://developer.up.com.au/).

## Usage

```sh
$ npm install up-bank-api
```

Simply instantiate the API with your API Key and you should be able to start using it.

```typescript
import { UpApi, isUpApiError } from 'up-bank-api';

const up = new UpApi('api-key-in-here');

const validateApiKey = async () => {
  try {
    await up.util.ping();
  } catch (e) {
    if (isUpApiError(e)) {
      if (401 === e.response.status) {
        console.log('Invalid API key');

        return false;
      }
    }

    // Unexpected error
    throw e;
  }

  return true;
};

const validApiKey = await validateApiKey();

if (validApiKey) {
  try {
    const accounts = await up.accounts.list({ pageSize: 30 });
  } catch (e) {
    if (isUpApiError(e)) {
      // Handle error returned from Up API
      console.log(e.response.data.errors);
    }

    // Unexpected error
    throw e;
  }
}
```

## Supported modules

The following modules of the Up API are fully supported:

- [Accounts](https://developer.up.com.au/#accounts)
- [Categories](https://developer.up.com.au/#categories)
- [Transactions](https://developer.up.com.au/#transactions)
- [Utility](https://developer.up.com.au/#utility_endpoints)
- [Tags](https://developer.up.com.au/#tags)
- [Webhooks](https://developer.up.com.au/#webhooks)

## Development

To aid development, we have a CLI script which can access the Up Bank API directly. Copy `.env.dist` to `.env` and 
insert your API key. Then you can call each endpoint and see exactly what data in returned:

```shell
# Print all accounts
yarn run up accounts list

# Print only the first 2 accounts
yarn run up accounts list --pageSize=2

# Print the first 5 transactions in a specific account
yarn run up transactions listByAccount <uuid> --pageSize=5
```

## Publishing

To publish a new version we use the `yarn release` command, which is configured to run the `np` command
as [detailed here](https://zellwk.com/blog/publish-to-npm/). This command will update the `package.json`
version number, and open a GitHub page in your browser ready to tag a release.

Publishing to npm is handled by the `publish` GitHub action.

## Special thanks

Special thanks to [LifeBac/intakeq-api](https://github.com/LifeBac/intakeq-api) for API architecture inspiration.
