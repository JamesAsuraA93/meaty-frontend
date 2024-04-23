import { env } from "@/env";
import type { OAuthConfig } from "next-auth/providers/index";

const MormapProvider: OAuthConfig<{
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}> = {
  id: "mormap",
  name: "Mormap",
  type: "oauth",
  version: "2.0",
  profile: async (profile, _tokens) => {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.avatar,
      role: profile.role,
    };
  },
  requestTokenUrl: env.MORMAP_REQUEST_TOKEN_URL,
  authorization: env.MORMAP_AUTHORIZATION_URL,
  userinfo: env.MORMAP_PROFILE_URL,
  clientId: env.NEXT_PUBLIC_MORMAP_CLIENT_ID,
  clientSecret: env.NEXTAUTH_SECRET,
  issuer: env.MORMAP_ISSUER,
  token: env.MORMAP_ACCESS_TOKEN_URL,
};

export default MormapProvider;
