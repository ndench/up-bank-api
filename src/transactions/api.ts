import { ListTransactionRequest, ListTransactionsResponse, TransactionResource } from './interfaces';
import { UpClient } from "../helper/client";

const ENDPOINT = 'transactions';

/**
 * Transactions represent the movement of money into and out of an account. They have many
 * characteristics that vary depending on the kind of transaction. Transactions may be temporarily
 * HELD (pending) or SETTLED, typically depending on which payment method was used at the point of sale.
 */
export class TransactionsApi {
  constructor(private api: UpClient) {}

  /**
   * Retrieve a list of all transactions across all accounts for the currently authenticated user.
   * The returned list is paginated and can be scrolled by following the next and prev links where present.
   * To narrow the results to a specific date range pass one or both of filter[since] and filter[until] in
   * the query string. These filter parameters should not be used for pagination. Results are ordered
   * newest first to oldest last.
   */
  public async list(
    params: ListTransactionRequest,
  ): Promise<ListTransactionsResponse> {
    const urlParams = this.createUrlParams(params);

    return this.api.get<ListTransactionsResponse>(`${ENDPOINT}?${urlParams.join('&')}`);
  }

  /**
   * Retrieve a specific transaction by providing its unique identifier.
   * @param transactionId The unique identifier for the transaction. e.g. 58c28694-4639-4992-94f3-b030bdb06a8e
   */
  public async retrieve(
    transactionId: string
  ): Promise<TransactionResource> {
    return this.api.get<TransactionResource>(`${ENDPOINT}/${transactionId}`);
  }

  /**
   * Retrieve a list of all transactions for a specific account. The returned list is paginated and can be
   * scrolled by following the next and prev links where present. To narrow the results to a specific date
   * range pass one or both of filter[since] and filter[until] in the query string. These filter parameters
   * should not be used for pagination. Results are ordered newest first to oldest last.
   * @param accountId The unique identifier for the account. e.g. 7a2dfb6f-4c5c-47db-9a95-8794b1ae1470
   */
  public async listByAccount(
    accountId: string,
    params: ListTransactionRequest,
  ): Promise<ListTransactionsResponse> {
    const urlParams = this.createUrlParams(params);

    return this.api.get<ListTransactionsResponse>(`/accounts/${accountId}/${ENDPOINT}?${urlParams.join('&')}`);
  }

  private createUrlParams(params: ListTransactionRequest): string[]
  {
    const urlParams = [];
    if (params.pageSize) {
      urlParams.push(`page[size]=${params.pageSize}`);
    }

    if (params.filterStatus) {
      urlParams.push(`filter[status]=${params.filterStatus}`);
    }

    if (params.filterSince) {
      urlParams.push(`filter[since]=${params.filterSince}`);
    }

    if (params.filterUntil) {
      urlParams.push(`filter[until]=${params.filterUntil}`);
    }

    if (params.filterCategory) {
      urlParams.push(`filter[category]=${params.filterCategory}`);
    }

    if (params.filterTag) {
      urlParams.push(`filter[tag]=${params.filterTag}`);
    }

    return urlParams;
  }
}
