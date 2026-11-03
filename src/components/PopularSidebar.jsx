import React from 'react'
import { data } from '../data/blogdata';
import { ChevronRight } from 'lucide-react';

const PopularSidebar = () => {
    const popularData = data.filter((item) => item.isTrending);
    return (
        <>
            <div className='flex flex-col gap-8 w-full'>
                {
                    popularData.map((item) => (
                        <div key={item.id} className='border-b border-dashed border-gray-300 pb-8 pl-6'>
                            <img src={item.image} alt={item.title} className='w-32 h-20 object-cover rounded-lg'/>
                            <h1 className='text-xl font-medium mt-3 mb-4'>{item.title} </h1>
                            <button className='group flex items-center justify-center gap-2 cursor-pointer border border-blue-600 text-blue-600 px-8 py-4  transition-colors'>READ MORE <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default PopularSidebar