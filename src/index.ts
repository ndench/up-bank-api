import axios, { AxiosInstance } from 'axios';
import { UtilApi } from './util/api';
import { AccountsApi } from "./accounts/api";
import { CategoriesApi } from "./categories/api";

export class UpApi {
  protected api: AxiosInstance;

  public util: UtilApi;
  public accounts: AccountsApi;
  public categories: CategoriesApi;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://api.up.com.au/api/v1/',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
    });

    this.util = new UtilApi(this.api);
    this.accounts = new AccountsApi(this.api);
    this.categories = new CategoriesApi(this.api);
  }
}

export * from './interfaces';
export * from './util/interfaces';
export * from './accounts/interfaces';

