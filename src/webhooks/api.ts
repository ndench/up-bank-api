import {
  ListWebhooksRequest,
  ListWebhooksResponse,
  CreateWebhookResponse,
  WebhookInputResource,
  WebhookEventResource,
  WebhookResource,
} from './interfaces';
import { UpClient } from '../helper/client';
import { ENDPOINTS } from '../constants';

/**
 * Webhooks provide a mechanism for a configured URL to receive events when
 * transaction activity occurs on Up. You can think of webhooks as being like
 * push notifications for your server-side application.
 */
export class WebhookApi {
  constructor(private api: UpClient) {}

  /**
   * Retrieve a list of configured webhooks. The returned list is not
   * paginated.
   */
  public async list(
    params: ListWebhooksRequest = {}
  ): Promise<{ data: ListWebhooksResponse[] }> {
    const urlParams = [];
    if (params.pageSize) {
      urlParams.push(`page[size]=${params.pageSize}`);
    }

    return this.api.get<{ data: ListWebhooksResponse[] }>(
      `${ENDPOINTS.WEBHOOKS}?${urlParams.join('&')}`
    );
  }

  /**
   * Create a new webhook with a given URL. The URL will receive webhook events
   * as JSON-encoded POST requests. The URL must respond with a HTTP 200 status
   * on success.
   * @param url The URL that this webhook should post events to. This must be a
   * valid HTTP or HTTPS URL that does not exceed 300 characters in length.
   * @param description An optional description for this webhook, up to 64
   * characters in length.
   */
  public async create(
    url: string,
    description?: string | null
  ): Promise<CreateWebhookResponse> {
    const data: WebhookInputResource = {
      attributes: {
        url,
        description: description ?? null,
      },
    };
    return this.api.post<WebhookInputResource, CreateWebhookResponse>(
      ENDPOINTS.WEBHOOKS,
      data
    );
  }

  /**
   * Retrieve a specific webhook by providing its unique identifier.
   * @param id The unique identifier for the webhook. e.g.
   * a3f1e92b-b790-42cf-afe7-6f4efad9fa9d
   */
  public async retrieve(id: string): Promise<WebhookResource> {
    return this.api.get<WebhookResource>(`${ENDPOINTS.WEBHOOKS}/${id}`);
  }

  /**
   * Delete a specific webhook by providing its unique identifier. Once deleted,
   * webhook events will no longer be sent to the configured URL.
   * @param id The unique identifier for the webhook. e.g.
   * a3f1e92b-b790-42cf-afe7-6f4efad9fa9d
   */
  public async delete(id: string): Promise<void> {
    return this.api.delete(`${ENDPOINTS.WEBHOOKS}/${id}`);
  }

  /**
   * Send a `PING` event to a webhook by providing its unique identifier. This is
   * useful for testing and debugging purposes. The event is delivered
   * asynchronously and its data is returned in the response to this request
   * @param id The unique identifier for the webhook. e.g.
   * a3f1e92b-b790-42cf-afe7-6f4efad9fa9d
   */
  public async ping(id: string): Promise<WebhookEventResource> {
    return this.api.post<void, WebhookEventResource>(
      `${ENDPOINTS.WEBHOOKS}/${id}/ping`
    );
  }
}
