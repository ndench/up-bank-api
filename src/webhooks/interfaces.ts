import { Relationship, RelationshipData, PaginationLinks } from '../interfaces';

/**
 * Provides information about a webhook.
 */
export interface WebhookResource {
  /**
   * The type of this resource: `webhooks`
   */
  type: string;
  /**
   * The unique identifier for this webhook.
   */
  id: string;
  attributes: {
    /**
     * The URL that this webhook is configured to `POST` events to.
     */
    url: string;
    /**
     * An optional description that was provided at the time the webhook was
     * created.
     */
    description: string | null;
    /**
     * A shared secret key used to sign all webhook events sent to the
     * configured webhook URL. This field is returned only once, upon the
     * initial creation of the webhook. If lost, create a new webhook and
     * delete this webhook.
     *
     * The webhook URL receives a request with a
     * `X-Up-Authenticity-Signature` header, which is the SHA-256 HMAC of
     * the entire raw request body signed using this `secretKey`. It is
     * advised to compute and check this signature to verify the
     * authenticity of requests sent to the webhook URL. See
     * [Handling webhook events](#callback_post_webhookURL) for full
     * details.
     */
    secretKey?: string;
    /**
     * The date-time at which this webhook was created.
     */
    createdAt: string;
  };
  relationships: {
    logs: Relationship<undefined>;
  };
  links?: {
    /**
     * The canonical link to this resource within the API.
     */
    self: string;
  };
}

export interface ListWebhooksRequest {
  /** The number of records to return in each page. e.g. ?page[size]=30 */
  pageSize?: number;
}

/**
 * Successful response to get all webhooks. This returns a paginated list of
 * webhooks, which can be scrolled by following the `prev` and `next` links
 * if present.
 */
export interface ListWebhooksResponse {
  /**
   * The list of webhooks returned in this response.
   */
  data: WebhookResource[];
  links: PaginationLinks<ListWebhooksResponse>;
}

/**
 * Represents a webhook specified as request input.
 */
export interface WebhookInputResource {
  attributes: {
    /**
     * The URL that this webhook should post events to. This must be a valid
     * HTTP or HTTPS URL that does not exceed 300 characters in length.
     */
    url: string;
    /**
     * An optional description for this webhook, up to 64 characters in
     * length.
     */
    description?: string | null;
  };
}

/**
 * Request to create a new webhook. This currently only requires a `url`
 * attribute.
 */
export interface CreateWebhookRequest {
  /**
   * The webhook resource to create.
   */
  data: WebhookInputResource;
}

/**
 * Successful response after creating a webhook.
 */
export interface CreateWebhookResponse {
  /**
   * The webhook that was created.
   */
  data: WebhookResource;
}

/**
 * Provides the event data used in asynchronous webhook event callbacks to
 * subscribed endpoints. Webhooks events have defined `eventType`s and may
 * optionally relate to other resources within the Up API.
 */
export interface WebhookEventResource {
  /**
   * The type of this resource: `webhook-events`
   */
  type: string;
  /**
   * The unique identifier for this event. This will remain constant across
   * delivery retries.
   */
  id: string;
  attributes: {
    /**
     * The type of this event. This can be used to determine what action to
     * take in response to the event.
     */
    eventType:
      | 'TRANSACTION_CREATED'
      | 'TRANSACTION_SETTLED'
      | 'TRANSACTION_DELETED'
      | 'PING';
    /**
     * The date-time at which this event was generated.
     */
    createdAt: string;
  };
  relationships: {
    webhook: Relationship<RelationshipData<'webhooks'>>;
    transaction?: Relationship<RelationshipData<'transactions'>>;
  };
}

/**
 * Asynchronous callback request used for webhook event delivery.
 */
export interface WebhookEventCallback {
  /**
   * The webhook event data sent to the subscribed webhook.
   */
  data: WebhookEventResource;
}

/**
 * Successful response to get a single webhook.
 */
export interface GetWebhookResponse {
  /**
   * The webhook returned in this response.
   */
  data: WebhookResource;
}

/**
 * Provides historical webhook event delivery information for analysis and
 * debugging purposes.
 */
export interface WebhookDeliveryLogResource {
  /**
   * The type of this resource: `webhook-delivery-logs`
   */
  type: string;
  /**
   * The unique identifier for this log entry.
   */
  id: string;
  attributes: {
    /**
     * Information about the request that was sent to the webhook URL.
     */
    request: {
      /**
       * The payload that was sent in the request body.
       */
      body: string;
    };
    /**
     * Information about the response that was received from the webhook URL.
     */
    response: {
      /**
       * The HTTP status code received in the response.
       */
      statusCode: number;
      /**
       * The payload that was received in the response body.
       */
      body: string;
    } | null;
    /**
     * Specifies the nature of the success or failure of a webhook delivery
     * attempt to the subscribed webhook URL. The currently returned values are
     * described below:
     *
     * - **`DELIVERED`**: The event was delivered to the webhook URL
     *   successfully and a `200` response was received.
     * - **`UNDELIVERABLE`**: The webhook URL was not reachable, or timed out.
     * - **`BAD_RESPONSE_CODE`**: The event was delivered to the webhook URL
     *   but a non-`200` response was received.
     */
    deliveryStatus: 'DELIVERED' | 'UNDELIVERABLE' | 'BAD_RESPONSE_CODE';
    /**
     * The date-time at which this log entry was created.
     */
    createdAt: string;
  };
  relationships: {
    webhookEvent: {
      data: RelationshipData<'webhook-events'>;
    };
  };
}

/**
 * Successful response to get all delivery logs for a webhook. This returns
 * a paginated list of delivery logs, which can be scrolled by following the
 * `next` and `prev` links if present.
 */
export interface ListWebhookDeliveryLogsResponse {
  /**
   * The list of delivery logs returned in this response.
   */
  data: WebhookDeliveryLogResource[];
  links: PaginationLinks<ListWebhookDeliveryLogsResponse>;
}
