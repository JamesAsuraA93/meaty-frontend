import axios, { AxiosError } from "axios";
import type { UrlBuilded } from "@/utils/UrlBuilder";
import {
  failure,
  type MMApiErrorShape,
  type Result,
  success,
} from "@/@types/handler";
import { env } from "@/env";

export const call = async <T>({
  url,
  method,
  data,
}: {
  url: UrlBuilded;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, string>;
  token?: string;
}): Promise<
  Result<
    {
      data: T;
      timestamp: string;
    },
    MMApiErrorShape
  >
> => {
  try {
    const basicAuth = env.GATWAY_APIKEY;

    const response = await axios<{
      data: T;
      timestamp: string;
    }>({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        apiKey: `${basicAuth}`,
      },
    });

    return success(response.data);
  } catch (error) {
    console.error(error);

    if (error instanceof AxiosError) {
      return failure((error.response?.data as MMApiErrorShape) ?? null);
    }

    if (error instanceof Error) {
      return failure(
        ({
          data: null,
          error: null,
          message: error.message,
          timestamp: new Date(),
        } as MMApiErrorShape) ?? null,
      );
    }

    return failure({
      data: null,
      error: null,
      message: "Unknown error",
      timestamp: new Date(),
    } as MMApiErrorShape);
  }
};

const api = {
  get: async <T>(url: UrlBuilded) =>
    call<T>({
      url,
      method: "GET",
    }),
  post: async <T>(url: UrlBuilded, data: Record<string, string>) =>
    call<T>({
      url,
      method: "POST",
      data,
    }),
  put: async <T>(url: UrlBuilded, data: Record<string, string>) =>
    call<T>({
      url,
      method: "PUT",
      data,
    }),
  delete: async <T>(url: UrlBuilded) =>
    call<T>({
      url,
      method: "DELETE",
    }),
};

export default api;
