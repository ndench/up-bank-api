import { UpClient } from '../src/helper/client';
import { UpApi } from "../src";
jest.mock('../src/helper/client');

describe('the accounts api', () => {
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    UpClient.mockClear();

    api = new UpApi();
  });

  it('retrieves an account by id', async () => {
    const accountId = 'foobar';

    await api.accounts.retrieve(accountId);

    const mockClient = UpClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(accountId);
  });
});
