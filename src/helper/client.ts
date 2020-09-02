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
        'Authorization': `Bearer ${apiKey}`
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const res = await this.api.get<T>(url);
    return res.data;
  }
}
