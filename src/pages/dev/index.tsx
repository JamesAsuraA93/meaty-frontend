import Filter from "@/components/common/Filter";
// import Navbar from "@/components/common/NavBar";
import Product from "@/components/common/product";
import Navbar from "@/components/layout/Navbar";

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
