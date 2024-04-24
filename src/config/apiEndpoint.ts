import { env } from "@/env";

export const ROOT_ENDPOINT: string = env.NEXT_PUBLIC_API_URL;

export const PATH_ENDPOINTS = {
  LOGIN: "/auth/api/v1/auth/login",
  REGISTER: "/auth/api/v1/auth/register",
} as const;
