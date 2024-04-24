import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Provider(props: Props) {
  // use the service for get me the session

  const { data: session, status } = useSession({
    required: false,
  });

  console.log(session, status);

  return <>{props.children}</>;
}
