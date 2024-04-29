/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Navbar from "@/components/common/NavBar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/common/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdBy: string | null;
  updatedBy: string | null;
  deletedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  filePath: string;
  fileId: number | null;
  ProductDetail: {
    id: number;
    productId: number;
    timeDelivery: string;
    producedIn: string;
    brand: string;
    thcMin: number;
    thcMax: number;
    cbdMin: number;
    cbdMax: number;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [position, setPosition] = useState("Lowest Price");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const productsPerPage = 12;

  useEffect(() => {
    axios
      .get("http://localhost:8002/product")
      .then((response) => {
        setAllProducts(response.data);
        setProducts(response.data);
        // Extract brands from ProductDetail, handling potential absence of ProductDetail or brand
        const brands = new Set(
          response.data.flatMap(
            (product: { ProductDetail: any[] }) =>
              product.ProductDetail.map(
                (detail: { brand: any }) => detail.brand,
              ).filter(Boolean), // Ensure only non-empty, non-null brands
          ),
        );
        setUniqueBrands(Array.from(brands));
        console.log("Brands fetched:", Array.from(brands)); // Debugging to check what brands are extracted
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => {
      const priceCondition =
        product.price >= (Number(minPrice) || 0) &&
        product.price <= (Number(maxPrice) || Infinity);
      const brandCondition =
        selectedBrands.length === 0 ||
        product.ProductDetail.some((detail) =>
          selectedBrands.includes(detail.brand),
        );
      return priceCondition && brandCondition;
    });
    setProducts(filtered);
  }, [minPrice, maxPrice, selectedBrands, allProducts]);

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) =>
      position === "Lowest Price" ? a.price - b.price : b.price - a.price,
    );
  }, [products, position]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleBrandChange = (
    brand: string,
    event: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    const isChecked = event.target.checked;
    setSelectedBrands((prev) => {
      const newSelectedBrands = new Set(prev);
      if (isChecked) {
        newSelectedBrands.add(brand);
      } else {
        newSelectedBrands.delete(brand);
      }
      return Array.from(newSelectedBrands);
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="mt-10 max-w-[25%] pl-10">
          <div className="border-b border-gray-500 ">
            {/* Price Filter Section */}
            <h1 className="text-3xl text-[#383634]">Filter</h1>
            <p className="pt-5">Price</p>
            <div className="flex items-center pb-4 pt-3 text-center">
              <p className="pr-3">From</p>
              <div className="relative">
                <Input
                  placeholder="$ 0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <p className="px-3">To</p>
              <div className="relative">
                <Input
                  placeholder="$ 20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            {/* Dynamic Brand Filter Section */}
            <div className="border-b border-gray-500 pb-4 pt-5">
              <h1 className="text-3xl text-[#383634] pb-4">Brand</h1>
              {uniqueBrands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2 pb-2">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => handleBrandChange(brand, e)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-auto mr-5 mt-10 max-w-[70%]">
          <h1 className="text-3xl">All Products</h1>
          <div className="flex items-center justify-between pb-10">
            <h2>Showed {currentProducts.length} goods</h2>
            <div className="flex items-center">
              <p className="pr-5">Sort by</p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="w-28" variant="outline">
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort by price</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="Lowest Price">
                      Lowest Price
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Highest Price">
                      Highest Price
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 pb-10">
            {currentProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {Array.from(
                { length: Math.ceil(sortedProducts.length / productsPerPage) },
                (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink
                      href="#"
                      onClick={() => paginate(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    paginate(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(sortedProducts.length / productsPerPage),
                      ),
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
}
