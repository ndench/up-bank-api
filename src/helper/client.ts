import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../constants';

interface UpBaseResponse {
  data?: unknown;
  links?: {
    next: null | string;
    prev: null | string;
  };
}

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

  processLink<T>(link: string): null | (() => Promise<T>) {
    if (link) {
      const linkFunc: () => Promise<T> = async () => {
        const parsedLink = link.slice(BASE_URL.length);
        return await this.get<T>(parsedLink);
      };
      linkFunc.bind(this);
      return linkFunc;
    }
    return null;
  }

  public async get<T extends UpBaseResponse>(url: string): Promise<T> {
    const res = await this.getApi().get<T>(url);

    const links = res.data?.links;
    /*
     * If links exist, process the strings into functions that
     * re-execute 'this.get()' with the new url
     */
    if (links) {
      const linksProcessObj = (res.data as unknown) as {
        links: {
          next: null | (() => Promise<T>);
          prev: null | (() => Promise<T>);
        };
      };

      linksProcessObj.links.next = this.processLink<T>(links.next);
      linksProcessObj.links.prev = this.processLink<T>(links.prev);
    }

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
