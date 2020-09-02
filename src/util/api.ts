import { AxiosInstance } from 'axios';
import { Pong } from './interfaces';

const ENDPOINT = 'util';

/**
 * Some endpoints exist not to expose data, but to test the API itself.
 * Currently there is only one endpoint in this group: ping!
 */
export class UtilApi {
  constructor(private api: AxiosInstance) {}

  /**
   * Make a basic ping request to the API.
   * This is useful to verify that authentication is functioning correctly.
   * On authentication success an HTTP 200 status is returned.
   * On failure an HTTP 401 error response is returned.
   */
  async ping(): Promise<Pong> {
    const res = await this.api.get<Pong>(`${ENDPOINT}/ping`);
    return res.data;
  }
}
