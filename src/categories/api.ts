import { AxiosInstance } from 'axios';
import { CategoryResource, ListCategoriesRequest } from './interfaces';

const ENDPOINT = 'categories';

/**
 * Categories enable understanding where your money goes by driving powerful insights in Up.
 * All categories in Up are pre-defined and are automatically assigned to new purchases in most cases.
 * A parent-child relationship is used to represent categories, however parent categories cannot be
 * directly assigned to transactions.
 */
export class CategoriesApi {
  constructor(private api: AxiosInstance) {
  }

  /**
   * Retrieve a list of all categories and their ancestry. The returned list is not paginated.
   */
  async list(
    params: ListCategoriesRequest,
  ): Promise<CategoryResource[]> {
    const urlParams = [];
    if (params.parent) {
      urlParams.push(`filter[parent]=${params.parent}`);
    }

    const res = await this.api.get<CategoryResource[]>(`${ENDPOINT}?${urlParams.join('&')}`);
    return res.data;
  }

  /**
   * Retrieve a specific category by providing its unique identifier.
   * @param categoryId The unique identifier for the category. e.g. restaurants-and-cafes
   */
  async retrieve(
    categoryId: string
  ): Promise<CategoryResource> {
    const res = await this.api.get<CategoryResource>(`${ENDPOINT}/${categoryId}`);
    return res.data;
  }
}
