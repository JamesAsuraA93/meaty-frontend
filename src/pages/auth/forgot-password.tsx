// import Navbar from "@/components/common/Navbar";
import Navbar from "@/components/layout/Navbar";
import Provider from "@/components/layout/Provider";
import { Typography } from "@/components/typography";
import React from "react";

export default function ForgotPassword() {
  return (
    <>
      <Provider>
        <Navbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
          <Typography typoType="h1">Forget Password</Typography>
        </div>
      </Provider>
    </>
  );
}
