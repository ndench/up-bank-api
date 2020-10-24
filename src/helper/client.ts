import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants';

export class UpClient {
  private api: AxiosInstance | null = null;

  constructor(apiKey: string | null = null) {
    if (null !== apiKey) {
      this.updateApiKey(apiKey);
    }
  }

  public updateApiKey(apiKey: string): void {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const res = await this.getApi().get<T>(url);
    return res.data;
  }

  public async post<T, V>(url: string, payload?: T): Promise<V> {
    const res = await this.getApi().post<V>(url, { data: payload });
    return res.data;
  }

  public async delete<T, V>(url: string, payload?: T): Promise<V> {
    const res = await this.getApi().delete<V>(url, { data: { data: payload } });
    return res.data;
  }

  private getApi(): AxiosInstance {
    if (null == this.api) {
      throw new Error(
        'You must specify an apiKey first, try calling updateApi().'
      );
    }

    return this.api;
  }
}
