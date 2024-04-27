import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import ProductCard from './ProductCard'




export default function Product() {
const [position, setPosition] = React.useState("Lowest Price")
  return (
    <div className='max-w-[70%] ml-auto mr-5 mt-10'>
      <h1 className='text-3xl'>All Products</h1>
      <div className='flex justify-between items-center pb-10'>
        <h2>Showed 12 goods</h2>
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
                <DropdownMenuRadioItem value="Lowest">Lowest Price</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Highest">Highest Price</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>
        <div className='grid grid-cols-3 gap-10 pb-10'>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
            <div><ProductCard/></div>
        </div>
        <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

      
    </div>
  )
}
