import { UpClient } from 'helper/client';
import { UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
jest.mock('helper/client');

describe('the accounts api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('retrieves an account by id', async () => {
    const accountId = 'foobar';

    await api.accounts.retrieve(accountId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`accounts/${accountId}`);
  });
});
