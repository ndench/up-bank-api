import axios, { AxiosInstance } from 'axios';

export class UpClient {
  private api: AxiosInstance;

  constructor(apiKey: string) {
    this.api = axios.create({
      baseURL: 'https://api.up.com.au/api/v1/',
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const res = await this.api.get<T>(url);
    return res.data;
  }

  public async post<T, V>(url: string, payload?: T): Promise<V> {
    const res = await this.api.post<V>(url, { data: payload });
    return res.data;
  }

  public async delete<T, V>(url: string, payload?: T): Promise<V> {
    const res = await this.api.delete<V>(url, { data: { data: payload } });
    return res.data;
  }
}
