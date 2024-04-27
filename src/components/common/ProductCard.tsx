import { CirclePlusIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Badge } from "../ui/badge"

export default function ProductCard() {
  return (
    
    <div className="w-[250px] p-1 border rounded-[20px]  hover:border-green-500">
       <div className="flex relative">
            <Image alt='Product' src={"/file 2.png"} width={150} height={150} className='absolute -top-14' />
            <div className='pt-5'>
                <div className='flex justify-center ml-40'>
                    <StarIcon className="text-green-900 fill-green-900" width={20} height={20}/>
                    <p className='text-sm pl-1'>5/5</p>
                </div>
            <Badge variant={"red"} className='text-white mt-2 ml-40 '>ON SALE</Badge>
            </div>

        </div>
        <h1 className='ml-3 pt-5'>Blueberry Seagal</h1>
        <div className='flex justify-between'>
            <Button variant={"outline"} className='mt-3 ml-3 bg-white text-black hover:text-white hover:bg-green-500 '>Add <CirclePlusIcon width={15} height={15} className='pl-1'/></Button>
            <div className='text-end pr-4'>
                <ul className='line-through text-[#383634] '>2.00</ul>
                <ul className='text-red-500'>$ 1.50</ul>
                <ul className='text-[#CCCBCA]'>/1g</ul>
            </div>
        </div>
      </div>
  
  )
}
