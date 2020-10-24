import { UpClient } from 'helper/client';
import { ListTagsRequest, TagInputResourceIdentifier, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the tags api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('lists tags without query params', async () => {
    await api.tags.list();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`tags?`);
  });

  it('lists tags with query params', async () => {
    const params: ListTagsRequest = {
      pageSize: faker.random.number(),
    };

    await api.tags.list(params);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `tags?page[size]=${params.pageSize}`
    );
  });

  it('adds tags to transaction', async () => {
    const transactionId = faker.random.uuid();

    const tags: TagInputResourceIdentifier[] = [
      {
        type: faker.random.word(),
        id: faker.random.uuid(),
      },
      {
        type: faker.random.word(),
        id: faker.random.uuid(),
      },
    ];

    await api.tags.addTagsToTransaction(transactionId, tags);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.post).toHaveBeenCalledWith(
      `transactions/${transactionId}/relationships/tags`,
      tags
    );
  });

  it('removes tags from transaction', async () => {
    const transactionId = faker.random.uuid();

    const tags: TagInputResourceIdentifier[] = [
      {
        type: faker.random.word(),
        id: faker.random.uuid(),
      },
      {
        type: faker.random.word(),
        id: faker.random.uuid(),
      },
    ];

    await api.tags.removeTagsFromTransaction(transactionId, tags);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.delete).toHaveBeenCalledWith(
      `transactions/${transactionId}/relationships/tags`,
      tags
    );
  });
});
