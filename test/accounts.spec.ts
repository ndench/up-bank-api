import { UpClient } from 'helper/client';
import { UpApi } from "index";
import mockAxios from 'jest-mock-axios';
import { mocked } from "ts-jest/utils";
import { BASE_URL } from "../src/constants";

describe('the accounts api', () => {
  let api: UpApi;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockAxios.reset();

    api = new UpApi('foobar');
  });

  it('updates the api key', async () => {
    api.updateApiKey('foobar');

    expect(mockAxios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer foobar`,
      },
    });
  });

  it('fetches account by id', async () => {
    await api.accounts.retrieve('baz');

    mockAxios.mockResponse({
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    expect(mockAxios.get).toHaveBeenCalledWith(`/accounts/baz`)
  });
});
