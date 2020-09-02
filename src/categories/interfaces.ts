export interface ListCategoriesRequest {
  /**
   * The unique identifier of a parent category for which to return only its children.
   * Providing an invalid category identifier results in a 404 response.
   * e.g. ?filter[parent]=good-life
   */
  parent?: string
}

export interface CategoryResource {
  /** The type of this resource: categories */
  type: string,
  /** The unique identifier for this category. This is a human-readable but URL-safe value. */
  id: string,
  attributes: {
    /** The name of this category as seen in the Up application. */
    name: string;
  },
  relationships: {
    parent: {
      data: null | CategoryRelationship;
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string,
      },
    },
    children: {
      data: CategoryRelationship[],
      links?: {
        /** The link to retrieve the related resource(s) in this relationship. */
        related: string,
      },
    },
  },
  links: {
    /** The canonical link to this resource within the API. */
    self: string,
  },
}

interface CategoryRelationship {
  /** The type of this resource: categories */
  type: string;
  /** The unique identifier of the resource within its type. */
  id: string;
}
