import { UtilApi } from './util/api';
import { AccountsApi } from './accounts/api';
import { CategoriesApi } from './categories/api';
import { UpClient } from './helper/client';
import { TransactionsApi } from './transactions/api';
import { TagsApi } from './tags/api';

export class UpApi {
  public util: UtilApi;
  public accounts: AccountsApi;
  public categories: CategoriesApi;
  public transactions: TransactionsApi;
  public tags: TagsApi;

  constructor(apiKey: string) {
    const api = new UpClient(apiKey);
    this.util = new UtilApi(api);
    this.accounts = new AccountsApi(api);
    this.categories = new CategoriesApi(api);
    this.transactions = new TransactionsApi(api);
    this.tags = new TagsApi(api);
  }
}

export * from './utilities';
export * from './interfaces';
export * from './util/interfaces';
export * from './accounts/interfaces';
export * from './categories/interfaces';
export * from './tags/interfaces';
export * from './transactions/interfaces';
