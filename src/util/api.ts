import { Pong } from './interfaces';
import { UpClient } from '../helper/client';
import { ENDPOINTS } from 'src/constants';

/**
 * Some endpoints exist not to expose data, but to test the API itself.
 * Currently there is only one endpoint in this group: ping!
 */
export class UtilApi {
  constructor(private api: UpClient) {}

  /**
   * Make a basic ping request to the API.
   * This is useful to verify that authentication is functioning correctly.
   * On authentication success an HTTP 200 status is returned.
   * On failure an HTTP 401 error response is returned.
   */
  public async ping(): Promise<Pong> {
    return this.api.get<Pong>(`${ENDPOINTS.UTIL}/ping`);
  }
}
