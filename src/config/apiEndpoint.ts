import { env } from "@/env";

export const ROOT_ENDPOINT: string = env.NEXT_PUBLIC_API_URL;

export const PATH_ENDPOINTS = {
  LOGIN: "/mmauth/api/v1/oauth2/auth-code",
  REGISTER: "/mmauth/api/v1/auth/register",
} as const;
