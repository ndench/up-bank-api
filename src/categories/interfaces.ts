import { Relationship, RelationshipData } from '../interfaces';

export interface ListCategoriesRequest {
  /**
   * The unique identifier of a parent category for which to return only its children.
   * Providing an invalid category identifier results in a 404 response.
   * e.g. ?filter[parent]=good-life
   */
  parent?: string;
}

export interface CategoryResource {
  /** The type of this resource: categories */
  type: string;
  /** The unique identifier for this category. This is a human-readable but URL-safe value. */
  id: string;
  attributes: {
    /** The name of this category as seen in the Up application. */
    name: string;
  };
  relationships: {
    parent: Relationship<null | RelationshipData<'categories'>>;
    children: Relationship<Array<RelationshipData<'categories'>>>;
  };
  links: {
    /** The canonical link to this resource within the API. */
    self: string;
  };
}
