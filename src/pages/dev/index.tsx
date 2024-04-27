import React from "react";
import Navbar from "@/components/common/NavBar";
import Product from "@/components/common/product";
import Filter from "@/components/common/Filter";


export default function DevHome() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Filter />
        <Product />
      </div>
    </>
  );
}
