import { UpClient } from 'helper/client';
import { ListWebhooksRequest, UpApi } from 'index';
import { mocked } from 'ts-jest/utils';
import faker from 'faker';

jest.mock('helper/client');

describe('the webhooks api', () => {
  const mockedClient = mocked(UpClient, true);
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedClient.mockClear();

    api = new UpApi();
  });

  it('lists webhooks without query params', async () => {
    await api.webhooks.list();

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`webhooks?`);
  });

  it('lists webhooks with query params', async () => {
    const params: ListWebhooksRequest = {
      pageSize: faker.random.number,
    };

    await api.webhooks.list(params);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(
      `webhooks?page[size]=${params.pageSize}`
    );
  });

  it('creates a webhook without a description', async () => {
    const url = faker.internet.url();

    await api.webhooks.create(url);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.post).toHaveBeenCalledWith(`webhooks`, {
      attributes: { url, description: null },
    });
  });

  it('creates a webhook with a description', async () => {
    const url = faker.internet.url;
    const description = faker.company.bs();

    await api.webhooks.create(url, description);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.post).toHaveBeenCalledWith(`webhooks`, {
      attributes: { url, description },
    });
  });

  it('retrieves a webhook by id', async () => {
    const webhookId = faker.random.uuid();

    await api.webhooks.retrieve(webhookId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.get).toHaveBeenCalledWith(`webhooks/${webhookId}`);
  });

  it('deletes a webhook', async () => {
    const webhookId = faker.random.uuid();

    await api.webhooks.delete(webhookId);

    const mockClient = mockedClient.mock.instances[0];
    expect(mockClient.delete).toHaveBeenCalledWith(`webhooks/${webhookId}`);
  });
});
