/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import ProductCard from './ProductCard';

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
}


export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [position, setPosition] = useState("Lowest Price");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    axios.get('http://localhost:8002/product')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];
    sorted.sort((a, b) => position === "Lowest Price" ? a.price - b.price : b.price - a.price);
    return sorted;
  }, [products, position]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <div className='max-w-[70%] ml-auto mr-5 mt-10'>
      <h1 className='text-3xl'>All Products</h1>
      <div className='flex justify-between items-center pb-10'>
        <h2>Showed {currentProducts.length} goods</h2>
        <div className='flex items-center'>
          <p className='pr-5'>Sort by</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className='w-28' variant="outline">Sort</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort by price</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="Lowest Price">Lowest Price</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Highest Price">Highest Price</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-10 pb-10'>
        {currentProducts.map(product => (
          <div key={product.id}><ProductCard product={product}/></div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink href="#" onClick={() => paginate(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => paginate(Math.max(1, currentPage - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(sortedProducts.length / productsPerPage)))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
