import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function Filter() {
  return (
    <>
      <div className='max-w-[25%] pl-10 mt-10'>
        <div className='border-b border-gray-500 '>
            <h1 className='text-3xl text-[#383634]'>Filter</h1>
            <p className='pt-5'>Price</p>
            <div className='flex pt-3 pb-4 text-center items-center'>
                <p className='pr-3'>From</p>
                <div className="relative">
                  <Input placeholder='$ 0'/>
                  
                </div>
                <p className='px-3'>To</p>
                <div className="relative">
                  <Input placeholder='$ 20'/>
                  
                </div>
            </div>
        </div>
        <div className='border-b border-gray-500 pt-5 pb-4'>
            <h1 className='text-3xl text-[#383634]'>Brand</h1>
            <div className="flex w-full max-w-sm items-center space-x-2 pb-3 relative">
                    <Input className='mt-5' type="name" placeholder="Name of brand" />
                    <Search className="absolute right-3 top-10 transform -translate-y-1/2" size={20}/>
             </div>
             <div className="flex items-center space-x-2 pb-2 pt-2">
                <Checkbox id="terms" />
                <label
                 htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Pure Sunfarms
                </label>
            </div>
            <div className="flex items-center space-x-2 pb-2">
                <Checkbox id="terms1" />
                <label
                 htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Back Forty
                </label>
            </div>
            <div className="flex items-center space-x-2 pb-2">
                <Checkbox id="terms2" />
                <label
                 htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    TWEED
                </label>
            </div>
            <div className="flex items-center space-x-2 pb-2">
                <Checkbox id="terms3" />
                <label
                 htmlFor="terms3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    COAST MOUNTAIN
                </label>
            </div>
        </div>
      </div>
    </>
  );
}
