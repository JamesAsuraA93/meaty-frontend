import { env } from "@/env";

export const ROOT_ENDPOINT: string = env.NEXT_PUBLIC_API_URL;

export const PATH_ENDPOINTS = {
  LOGIN: "http://localhost:8001/login",
  REGISTER: "http://localhost:8001/register",
} as const;
