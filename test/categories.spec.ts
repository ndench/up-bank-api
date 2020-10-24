import { UpClient } from 'helper/client';
import { ListAccountsRequest, ListCategoriesRequest, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the categories api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('lists categories without query params', async () => {
    await api.categories.list();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`categories?`);
  });

  it('lists categories with query params', async () => {
    const params: ListCategoriesRequest = {
      parent: faker.random.word(),
    };

    await api.categories.list(params);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `categories?filter[parent]=${params.parent}`
    );
  });

  it('retrieves a category by id', async () => {
    const categoryId = faker.random.uuid();

    await api.categories.retrieve(categoryId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`categories/${categoryId}`);
  });
});
