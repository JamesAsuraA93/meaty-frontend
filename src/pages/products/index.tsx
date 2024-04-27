import Navbar from "@/components/common/NavBar";
import Filter from "@/components/common/Filter";
import Product from "@/components/common/product";

export default function Products() {
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
