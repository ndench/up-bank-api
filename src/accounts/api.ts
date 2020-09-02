import { AxiosInstance } from 'axios';
import { AccountResource, ListAccountResponse, ListAccountsRequest } from './interfaces';
import { CategoryResource } from "../categories/interfaces";

const ENDPOINT = 'accounts';

/**
 * Accounts represent the underlying store used to track balances and the transactions
 * that have occurred to modify those balances over time. Up currently has two types of
 * account: SAVER - used to earn interest and to hit savings goals, and
 * TRANSACTIONAL - used for everyday spending.
 */
export class AccountsApi {
  constructor(private api: AxiosInstance) {
  }

  /**
   * Retrieve a paginated list of all accounts for the currently authenticated user.
   * The returned list is paginated and can be scrolled by following the prev and next links where present.
   */
  async list(
    params: ListAccountsRequest,
  ): Promise<ListAccountResponse> {
    const urlParams = [];
    if (params.pageSize) {
      urlParams.push(`list?page[size]=${params.pageSize}`);
    }

    const res = await this.api.get<ListAccountResponse>(`${ENDPOINT}/list?${urlParams.join('&')}`);
    return res.data;
  }

  /**
   * Retrieve a specific account by providing its unique identifier.
   * @param accountId The unique identifier for the account. e.g. e7a729f0-aaa7-4d6a-b231-f794c0155e1d
   */
  async retrieve(
    accountId: string
  ): Promise<AccountResource> {
    const res = await this.api.get<AccountResource>(`${ENDPOINT}/${accountId}`);
    return res.data;
  }
}
