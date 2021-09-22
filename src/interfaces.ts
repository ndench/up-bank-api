export interface MoneyObject {
  /** The ISO 4217 currency code. */
  currencyCode: string;
  /**
   * The amount of money, formatted as a string in the relevant currency.
   * For example, for an Australian dollar value of $10.56, this field will be "10.56".
   * The currency symbol is not included in the string.
   */
  value: string;
  /**
   * The amount of money in the smallest denomination for the currency, as a 64-bit integer.
   * For example, for an Australian dollar value of $10.56, this field will be 1056.
   */
  valueInBaseUnits: number;
}

export interface RelationshipData<RelationshipType extends string> {
  /** The type of this resource */
  type: RelationshipType;
  /** The unique identifier of the resource within its type. */
  id: string;
}

export interface Relationship<TRelationshipData> {
  data: TRelationshipData;
  links?: {
    /** The link to retrieve the related resource(s) in this relationship. */
    related: string;
  };
}

export interface PaginationLinks<ReturnType> {
  /** The link to the previous page in the results. If this value is null there is no previous page. */
  prev: () => Promise<ReturnType> | null;
  /** The link to the next page in the results. If this value is null there is no next page. */
  next: () => Promise<ReturnType> | null;
}

export interface UpApiError {
  response: {
    data: ErrorResponse;
    status: number;
  };
}

/**  Generic error response that returns one or more errors. */
export interface ErrorResponse {
  /** The list of errors returned in this response. */
  errors: ErrorObject[];
}

export interface ErrorObject {
  /**
   * The HTTP status code associated with this error. This can also be obtained from the response headers.
   * The status indicates the broad type of error according to HTTP semantics.
   */
  status: string;
  /**
   * A short description of this error. This should be stable across multiple occurrences of this type
   * of error and typically expands on the reason for the status code.
   */
  title: string;
  /**
   * A detailed description of this error. This should be considered unique to individual occurrences
   * of an error and subject to change. It is useful for debugging purposes.
   */
  detail: string;
  /**
   * If applicable, location in the request that this error relates to. This may be a parameter in
   * the query string, or a an attribute in the request body.
   */
  source?: {
    /** If this error relates to a query parameter, the name of the parameter. */
    parameter?: string;
    /** If this error relates to an attribute in the request body, a rfc-6901 JSON pointer to the attribute. */
    pointer?: string;
  };
}
