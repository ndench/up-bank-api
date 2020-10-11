import {
  ListTagsRequest,
  ListTagsResponse,
  TagInputResourceIdentifier,
} from './interfaces';
import { UpClient } from '../helper/client';
import { ENDPOINTS } from '../constants';

/**
 * Tags are custom labels that can be associated with transactions on Up. Within
 * the Up application, tags provide additional insight into spending. For
 * example, you could have a "Take Away" tag that you apply to purchases from
 * food delivery services. The Up API allows you to manage the tags associated
 * with transactions. Each transaction may have up to 6 tags.
 */
export class TagsApi {
  constructor(private api: UpClient) {}

  /**
   * Retrieve a list of all tags currently in use. The returned list is not
   * paginated.
   */
  public async list(
    params: ListTagsRequest = {}
  ): Promise<{ data: ListTagsResponse[] }> {
    const urlParams = [];
    if (params.pageSize) {
      urlParams.push(`page[size]=${params.pageSize}`);
    }

    return this.api.get<{ data: ListTagsResponse[] }>(
      `${ENDPOINTS.TAGS}?${urlParams.join('&')}`
    );
  }

  /**
   * Associates one or more tags with a specific transaction. No more than 6
   * tags may be present on any single transaction. Duplicate tags are silently
   * ignored.
   * @param transactionId The unique identifier for the transaction. e.g.
   * 0a3c4bdd-1de5-4b9b-bf9e-53fb0b5f2cd7
   * @param tags The tags to add to the transaction.
   */
  public async addTagsToTransaction(
    transactionId: string,
    tags: TagInputResourceIdentifier[]
  ): Promise<void> {
    return this.api.post(TagsApi.buildTransactionTagsPath(transactionId), tags);
  }

  /**
   * Disassociates one or more tags from a specific transaction. Tags that are
   * not associated are silently ignored.
   * @param transactionId The unique identifier for the transaction. e.g.
   * 0a3c4bdd-1de5-4b9b-bf9e-53fb0b5f2cd7
   * @param tags The tags to remove from the transaction.
   */
  public async removeTagsFromTransaction(
    transactionId: string,
    tags: TagInputResourceIdentifier[]
  ): Promise<void> {
    return this.api.delete(
      TagsApi.buildTransactionTagsPath(transactionId),
      tags
    );
  }

  /**
   * Build API path to access the tags for a given transaction.
   * @param transactionId The unique identifier for the transaction. e.g.
   * 0a3c4bdd-1de5-4b9b-bf9e-53fb0b5f2cd7
   */
  private static buildTransactionTagsPath(transactionId: string) {
    return `${ENDPOINTS.TRANSACTIONS}/${transactionId}/relationships/tags`;
  }
}
