import type { OAuthConfig } from "next-auth/providers/index";

const MeatyProvider: OAuthConfig<{
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}> = {
  id: "meaty",
  name: "Meaty",
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

  // requestTokenUrl: env.MEATY_REQUEST_TOKEN_URL,
  // authorization: env.MEATY_AUTHORIZATION_URL,
  // userinfo: env.MEATY_PROFILE_URL,
  // clientId: env.NEXT_PUBLIC_MEATY_CLIENT_ID,
  // clientSecret: env.NEXTAUTH_SECRET,
  // issuer: env.MEATY_ISSUER,
  // token: env.MEATY_ACCESS_TOKEN_URL,
};

export default MeatyProvider;
