import { Relationship, PaginationLinks } from '../interfaces';

/**
 * Provides information about a tag.
 */
export interface TagResource {
  /**
   * The type of this resource: `tags`
   */
  type: string;
  /**
   * The label of the tag, which also acts as the tag’s unique identifier.
   */
  id: string;
  relationships: {
    transactions: Relationship<undefined>;
  };
}

/**
 * Uniquely identifies a single tag in the API.
 */
export interface TagInputResourceIdentifier {
  /**
   * The type of this resource: `tags`
   */
  type: string;
  /**
   * The label of the tag, which also acts as the tag’s unique identifier.
   */
  id: string;
}

export interface ListTagsRequest {
  /** The number of records to return in each page. e.g. ?page[size]=30 */
  pageSize?: number;
}

/**
 * Successful response to get all tags. This returns a paginated list of
 * tags, which can be scrolled by following the `prev` and `next` links if
 * present.
 */
export interface ListTagsResponse {
  /**
   * The list of tags returned in this response.
   */
  data: TagResource[];
  links: PaginationLinks<ListTagsResponse>;
}

/**
 * Request to add or remove tags associated with a transaction.
 */
export interface UpdateTransactionTagsRequest {
  /**
   * The tags to add to or remove from the transaction.
   */
  data: TagInputResourceIdentifier;
}
