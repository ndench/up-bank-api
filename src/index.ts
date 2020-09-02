import { UtilApi } from './util/api';
import { AccountsApi } from "./accounts/api";
import { CategoriesApi } from "./categories/api";
import { UpClient } from "./helper/client";

export class UpApi {
  public util: UtilApi;
  public accounts: AccountsApi;
  public categories: CategoriesApi;

  constructor(apiKey: string) {
    const api = new UpClient(apiKey);
    this.util = new UtilApi(api);
    this.accounts = new AccountsApi(api);
    this.categories = new CategoriesApi(api);
  }
}

export * from './interfaces';
export * from './util/interfaces';
export * from './accounts/interfaces';

