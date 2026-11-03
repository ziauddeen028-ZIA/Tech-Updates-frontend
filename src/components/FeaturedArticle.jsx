import React from 'react'
import { Timer, Calendar } from "lucide-react";
import { data } from '../data/blogdata';

const FeaturedArticle = () => {
    const datas = data.find((item) => item.id === 1);
    return (
        <>
            <div><span className='text-red-500'>|</span> FEATURED POSTS</div>
            <div className='image'>
                <img src={datas.image} alt="artificial intelligence" className='w-full h-[475px] rounded-2xl object-cover' />
            </div>
            <div className='details mt-5'>
                <div className='flex items-center gap-5 mb-3'>
                    <h4 className='text-green-700 text-[15px] font-medium'>{datas.category}</h4>
                    <div className='flex items-center gap-2'>
                        <p > <Timer className='w-4 h-4 text-gray-500' /></p>
                        <p className='text-gray-500 text-[15px]'>{datas.readTime} Mins Read</p>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl sm:text-3xl lg:text-[40px] mb-3'>{datas.title}</h1>
                    <div className='flex items-center gap-5'>
                        <p className='text-[15px] text-gray-700'>By <span className='text-blue-600 font-medium hover:underline decoration-dotted underline-offset-2'>{datas.author}</span></p>
                        <p>|</p>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4' />
                            <p className='text-[15px] text-gray-600'>{datas.publishedAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedArticle