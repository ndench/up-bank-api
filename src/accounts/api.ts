import {
  AccountResource,
  ListAccountResponse,
  ListAccountsRequest,
} from './interfaces';
import { UpClient } from '../helper/client';

const ENDPOINT = 'accounts';

/**
 * Accounts represent the underlying store used to track balances and the transactions
 * that have occurred to modify those balances over time. Up currently has two types of
 * account: SAVER - used to earn interest and to hit savings goals, and
 * TRANSACTIONAL - used for everyday spending.
 */
export class AccountsApi {
  constructor(private api: UpClient) {}

  /**
   * Retrieve a paginated list of all accounts for the currently authenticated user.
   * The returned list is paginated and can be scrolled by following the prev and next links where present.
   */
  public async list(
    params: ListAccountsRequest = {}
  ): Promise<ListAccountResponse> {
    const urlParams = [];
    if (params.pageSize) {
      urlParams.push(`page[size]=${params.pageSize}`);
    }

    return this.api.get<ListAccountResponse>(
      `${ENDPOINT}?${urlParams.join('&')}`
    );
  }

  /**
   * Retrieve a specific account by providing its unique identifier.
   * @param accountId The unique identifier for the account. e.g. e7a729f0-aaa7-4d6a-b231-f794c0155e1d
   */
  public async retrieve(accountId: string): Promise<{ data: AccountResource }> {
    return this.api.get<{ data: AccountResource }>(`${ENDPOINT}/${accountId}`);
  }
}
