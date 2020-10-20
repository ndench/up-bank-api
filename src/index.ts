import { UtilApi } from './util/api';
import { AccountsApi } from './accounts/api';
import { CategoriesApi } from './categories/api';
import { UpClient } from './helper/client';
import { TransactionsApi } from './transactions/api';
import { TagsApi } from './tags/api';
import { WebhookApi } from './webhooks/api';

export class UpApi {
  public readonly util: UtilApi;
  public readonly accounts: AccountsApi;
  public readonly categories: CategoriesApi;
  public readonly transactions: TransactionsApi;
  public readonly tags: TagsApi;
  public readonly webhooks: WebhookApi;

  private readonly api: UpClient;

  constructor(apiKey: string) {
    this.api = new UpClient(apiKey);
    this.util = new UtilApi(this.api);
    this.accounts = new AccountsApi(this.api);
    this.categories = new CategoriesApi(this.api);
    this.transactions = new TransactionsApi(this.api);
    this.tags = new TagsApi(this.api);
    this.webhooks = new WebhookApi(this.api);
  }

  public updateApiKey(apiKey: string) {
    this.api.updateApiKey(apiKey);
  }
}

export * from './utilities';
export * from './interfaces';
export * from './util/interfaces';
export * from './accounts/interfaces';
export * from './categories/interfaces';
export * from './tags/interfaces';
export * from './transactions/interfaces';
export * from './webhooks/interfaces';
