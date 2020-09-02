export interface ListAccountsRequest {
  /** The number of records to return in each page. e.g. ?page[size]=30 */
  pageSize?: bigint
}

export enum AccountTypeEnum {
  saver = 'SAVER',
  transactional = 'TRANSACTIONAL',
}

export interface MoneyObject {
  /** The ISO 4217 currency code. */
  currencyCode: string,
  /**
   * The amount of money, formatted as a string in the relevant currency.
   * For example, for an Australian dollar value of $10.56, this field will be "10.56".
   * The currency symbol is not included in the string.
   */
  value: string,
  /**
   * The amount of money in the smallest denomination for the currency, as a 64-bit integer.
   * For example, for an Australian dollar value of $10.56, this field will be 1056.
   */
  valueInBaseUnits: bigint,
}

export interface AccountResource {
  /** The type of this resource: accounts */
  type: string,
  /** The unique identifier for this account. */
  id: string,
  attributes: {
    /** The name associated with the account in the Up application. */
    displayName: string,
    /** The bank account type of this account. */
    accountType: AccountTypeEnum,
  },
  /** The available balance of the account, taking into account any amounts that are currently on hold. */
  balance: MoneyObject,
  /** The date-time at which this account was first opened. */
  createdAt: string,
  relationships: {
    links?: {
      /** The link to retrieve the related resource(s) in this relationship. */
      related: string,
    },
  },
  links: {
    /** The canonical link to this resource within the API. */
    self: string,
  },
}

export interface Links {
  /** The link to the previous page in the results. If this value is null there is no previous page. */
  prev: string | null,
  /** The link to the next page in the results. If this value is null there is no next page. */
  next: string | null,
}

export interface ListAccountResponse {
  /** The list of accounts returned in this response. */
  data: AccountResource[];
  links: Links;
}
