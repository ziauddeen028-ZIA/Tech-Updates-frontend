import React from 'react'
import { categorise } from '../data/blogdata'
import { useNavigate } from 'react-router-dom'

const CategorySection = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-50 my-14 pb-10'>
            <div className='flex flex-col items-center py-14'>
                <h1 className='text-4xl font-semibold my-5'>Explore Categories</h1>
                <span className='w-14 h-[2px] bg-red-500'></span>
            </div>
            <div className='flex flex-col lg:flex-row lg:flex lg:flex-wrap justify-center gap-3 px-4 sm:px-8 lg:px-16'>
                {categorise.map((item) => (
                    <div key={item}
                        className='bg-white border border-gray-200 rounded-md px-6 py-4 text-lg hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer'
                        onClick={() => navigate(`/category/${encodeURIComponent(item)}`)}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySection