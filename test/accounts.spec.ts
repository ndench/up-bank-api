import { UpClient } from 'helper/client';
import { ListAccountsRequest, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the accounts api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('lists accounts without query params', async () => {
    await api.accounts.list();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`accounts?`);
  });

  it('lists accounts with query params', async () => {
    const params: ListAccountsRequest = {
      pageSize: faker.random.number(),
    };

    await api.accounts.list(params);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `accounts?page[size]=${params.pageSize}`
    );
  });

  it('retrieves an account by id', async () => {
    const accountId = faker.random.uuid();

    await api.accounts.retrieve(accountId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`accounts/${accountId}`);
  });
});
