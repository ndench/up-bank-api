import { MoneyObject, PaginationLinks, Relationship } from '../interfaces';

export interface ListTransactionRequest {
  /** The number of records to return in each page. e.g. ?page[size]=30 */
  pageSize?: number;
  /**
   * The transaction status for which to return records. This can be used to filter HELD transactions
   * from those that are SETTLED.
   * e.g. ?filter[status]=HELD
   */
  filterStatus?: string;
  /**
   * The start date-time from which to return records, formatted according to rfc-3339. Not
   * to be used for pagination purposes.
   * e.g. ?filter[since]=2020-01-01T01:02:03+10:00
   */
  filterSince?: string;
  /**
   * The end date-time up to which to return records, formatted according to rfc-3339. Not to
   * be used for pagination purposes.
   * e.g. ?filter[until]=2020-02-01T01:02:03+10:00
   */
  filterUntil?: string;
  /**
   * The category identifier for which to filter transactions. Both parent and child categories
   * can be filtered through this parameter. Providing an invalid category identifier results in a 404 response.
   * e.g. ?filter[category]=good-life
   */
  filterCategory?: string;
  /**
   * A transaction tag to filter for which to return records. If the tag does not exist, zero records
   * are returned and a success response is given.
   * e.g. ?filter[tag]=Holiday
   */
  filterTag?: string;
}

export enum TransactionTypeEnum {
  held = 'HELD',
  settled = 'SETTLED',
}

export interface HoldInfoObject {
  /** The amount of this transaction while in the HELD status, in Australian dollars. */
  amount: MoneyObject;
  /**
   * The foreign currency amount of this transaction while in the HELD status. This field will be null
   * for domestic transactions. The amount was converted to the AUD amount reflected in the amount field.
   */
  foreignAmount: MoneyObject | null;
}

export interface RoundUpObject {
  /** The total amount of this Round Up, represented as negative value. */
  amount: MoneyObject;
  /**
   * The portion of the Round Up amount owing to boosted Round Ups, represented as a negative value.
   * If no boost was added to the Round Up this field will be null.
   */
  boostPortion: MoneyObject | null;
}

export interface CashbackObject {
  /** A brief description of why this cashback was paid. */
  description: string;
  /** The total amount of cashback paid, represented as a positive value. */
  amount: MoneyObject;
}

export interface TransactionResource {
  /** The type of this resource: accounts */
  type: string;
  /** The unique identifier for this account. */
  id: string;
  attributes: {
    /**
     * The current processing status of this transaction,
     * according to whether or not this transaction has settled or is still held.
     */
    status: TransactionTypeEnum;
    /**
     * The original, unprocessed text of the transaction. This is often not a perfect indicator of
     * the actual merchant, but it is useful for reconciliation purposes in some cases.
     */
    rawText: string | null;
    /** A short description for this transaction. Usually the merchant name for purchases. */
    description: string;
    /** Attached message for this transaction, such as a payment message, or a transfer note. */
    message: string | null;
    /**
     * If this transaction is currently in the HELD status, or was ever in the HELD status,
     * the amount and foreignAmount of the transaction while HELD.
     */
    holdInfo: HoldInfoObject | null;
    /** Details of how this transaction was rounded-up. If no Round Up was applied this field will be null. */
    roundUp: RoundUpObject | null;
    /** The total amount of cashback paid, represented as a positive value. */
    cashback: CashbackObject | null;
    /**
     * The amount of this transaction in Australian dollars. For transactions that were once HELD
     * but are now SETTLED, refer to the holdInfo field for the original amount the transaction was HELD at.
     */
    amount: MoneyObject;
    /**
     * The foreign currency amount of this transaction. This field will be null for domestic transactions.
     * The amount was converted to the AUD amount reflected in the amount of this transaction.
     * Refer to the holdInfo field for the original foreignAmount the transaction was HELD at.
     */
    foreignAmount: MoneyObject | null;
    /**
     * The date-time at which this transaction settled. This field will be null for transactions
     * that are currently in the HELD status.
     */
    settledAt: string;
    /** The date-time at which this transaction was first encountered. */
    createdAt: string;
  };
  relationships: {
    account: {
      data: Relationship;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    category: {
      data: null | Relationship;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    parentCategory: {
      data: null | Relationship;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
    tags: {
      data: Relationship[];
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string;
      };
    };
  };
  links: {
    /** The canonical link to this resource within the API. */
    self: string;
  };
}

export interface ListTransactionsResponse {
  /** The list of transactions returned in this response. */
  data: TransactionResource[];
  links: PaginationLinks;
}
