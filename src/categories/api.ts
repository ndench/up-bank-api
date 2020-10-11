import { CategoryResource, ListCategoriesRequest } from './interfaces';
import { UpClient } from '../helper/client';
import { ENDPOINTS } from '../constants';

/**
 * Categories enable understanding where your money goes by driving powerful insights in Up.
 * All categories in Up are pre-defined and are automatically assigned to new purchases in most cases.
 * A parent-child relationship is used to represent categories, however parent categories cannot be
 * directly assigned to transactions.
 */
export class CategoriesApi {
  constructor(private api: UpClient) {}

  /**
   * Retrieve a list of all categories and their ancestry. The returned list is not paginated.
   */
  public async list(
    params: ListCategoriesRequest = {}
  ): Promise<{ data: CategoryResource[] }> {
    const urlParams = [];
    if (params.parent) {
      urlParams.push(`filter[parent]=${params.parent}`);
    }

    return this.api.get<{ data: CategoryResource[] }>(
      `${ENDPOINTS.CATEGORIES}?${urlParams.join('&')}`
    );
  }

  /**
   * Retrieve a specific category by providing its unique identifier.
   * @param categoryId The unique identifier for the category. e.g. restaurants-and-cafes
   */
  public async retrieve(
    categoryId: string
  ): Promise<{ data: CategoryResource }> {
    return this.api.get<{ data: CategoryResource }>(
      `${ENDPOINTS.CATEGORIES}/${categoryId}`
    );
  }
}
