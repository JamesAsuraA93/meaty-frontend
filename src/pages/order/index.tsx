// import Navbar from "@/components/common/Navbar";
import Navbar from "@/components/layout/Navbar";
import { Typography } from "@/components/typography";

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
