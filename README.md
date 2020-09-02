# up-bank-api

A TypeScript wrapper around the [UpBank API](https://developer.up.com.au/).

## Usage

```sh
$ npm install up-bank-api
```

Simply instantiate the API with your API Key and you should be able to start using it.

```typescript
import { UpApi } from 'up-bank-api';

const up = new UpApi('api-key-in-here');

const listAccounts = async () => {
  const res = await up.accounts.list({ pageSize: 30 });

  // Do something with the result
  console.log(res);
};

listClients();
```
