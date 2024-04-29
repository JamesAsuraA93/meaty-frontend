import Navbar from '@/components/common/NavBar'
import Image from 'next/image'
import CarouselCard from '@/components/common/CarouselCard';
import { Flame , ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row pt-10 justify-center">
          <Link href="/products">
            <div className='bg-[#EDEAE7] rounded-lg ml-5 hover:cursor-pointer'>
              <Image alt='shop' src={"/Shop now Banner (clickable).png"} width={500} height={800}/>
            </div>
          </Link>
          <div className='pl-5'>
              <Image alt='promotion' src={"/Rectangle 4.png"} width={375} height={575}/>
          </div>
          
      </div>
      <div className='flex justify-between pt-10 items-center text-center'>
          <div className='flex items-center justify-center pl-40'>
              <Flame />
              <h1 className='text-3xl text-center pl-1 pb-3'>Feature goods</h1>
          </div>
          <div className='flex pr-40'>
              <p className=''>View all</p>
              <ChevronRight />
          </div>
      </div>
      
      <CarouselCard />
    </>
  )
}
