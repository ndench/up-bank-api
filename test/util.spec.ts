import { UpClient } from 'helper/client';
import { ListAccountsRequest, ListCategoriesRequest, ListTransactionRequest, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the util api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('pings', async () => {
    await api.util.ping();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`util/ping`);
  });
});
