import { PATH_ENDPOINTS, ROOT_ENDPOINT } from "../config/apiEndpoint";

export type UrlBuilded =
  `${string}${(typeof PATH_ENDPOINTS)[keyof typeof PATH_ENDPOINTS]}`;

export class UrlBuilder {
  private combined;

  constructor({ path }: { path: keyof typeof PATH_ENDPOINTS }) {
    this.combined = `${ROOT_ENDPOINT}${PATH_ENDPOINTS[path]}`;
  }

  private validateQuery(
    q: Record<string, (string | string[]) | undefined>,
  ): q is Record<string, string> {
    Object.keys(q).forEach((key) => {
      const quy = q;
      if (!quy) return;
      if (quy[key] === undefined) {
        delete quy[key];
      }
      if (Array.isArray(quy[key])) {
        quy[key] = (quy[key] as string[])?.join(",");
      }
    });

    return true;
  }

  query(q: { query?: Record<string, (string | string[]) | undefined> }) {
    if (!q.query) return this;

    // handle type Record<string, string | undefined> to Record<string, string>
    if (this.validateQuery(q.query)) {
      const query = new URLSearchParams(q.query);
      this.combined = `${this.combined}?${query.toString()}`;
      return this;
    }

    return this;
  }

  param(value: string | number, key: string) {
    this.combined = this.combined.replace(`:${key}`, value.toString());

    return this;
  }

  build() {
    return this.combined as UrlBuilded;
  }
}
