import Navbar from "@/components/common/Navbar";
import { Typography } from "@/components/typography";
import React from "react";

export default function Order() {
  return (
    <>
      <Navbar />
      <div className="flex h-full w-full items-center justify-center">
        <Typography typoType="h1">Order Page</Typography>
      </div>
    </>
  );
}
