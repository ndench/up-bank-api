import { UpClient } from 'helper/client';
import { ListTransactionRequest, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the transactions api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('lists transactions without query params', async () => {
    await api.transactions.list();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`transactions?`);
  });

  it('lists transactions with query params', async () => {
    const params: ListTransactionRequest = {
      pageSize: faker.random.number,
      filterCategory: faker.random.word,
    };

    await api.transactions.list(params);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `transactions?page[size]=${params.pageSize}&filter[category]=${params.filterCategory}`
    );
  });

  it('retrieves a transaction by id', async () => {
    const transactionId = faker.random.uuid();

    await api.transactions.retrieve(transactionId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `transactions/${transactionId}`
    );
  });
});
