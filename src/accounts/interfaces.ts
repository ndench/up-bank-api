import { MoneyObject, PaginationLinks } from "../interfaces";

export interface ListAccountsRequest {
  /** The number of records to return in each page. e.g. ?page[size]=30 */
  pageSize?: number;
}

export enum AccountTypeEnum {
  saver = 'SAVER',
  transactional = 'TRANSACTIONAL',
}

export interface AccountResource {
  /** The type of this resource: accounts */
  type: string;
  /** The unique identifier for this account. */
  id: string;
  attributes: {
    /** The name associated with the account in the Up application. */
    displayName: string;
    /** The bank account type of this account. */
    accountType: AccountTypeEnum;
  };
  /** The available balance of the account, taking into account any amounts that are currently on hold. */
  balance: MoneyObject;
  /** The date-time at which this account was first opened. */
  createdAt: string;
  relationships: {
    links?: {
      /** The link to retrieve the related resource(s) in this relationship. */
      related: string;
    };
  };
  links: {
    /** The canonical link to this resource within the API. */
    self: string;
  };
}

export interface ListAccountResponse {
  /** The list of accounts returned in this response. */
  data: AccountResource[];
  links: PaginationLinks;
}
