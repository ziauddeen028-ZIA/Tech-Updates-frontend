import React from 'react'
import { data } from '../data/blogdata';
import { Timer, Calendar } from "lucide-react";

const TrendingSection = () => {
    const datas = data.filter((item) => item.isTrending);
    return (
        <>
            <div className='grid grid-cols-4 w-full items-center justify-center px-10'>
                {
                    datas.map((item) => (
                        <div key={item.id} className='w-[240px] h-[250px]' >

                            <div className='image bg-gray-50 h-[180px] flex justify-center items-center'>
                                <img src={item.image} alt="artificial intelligence" className='w-full h-[200px] lg:h-fit  object-contain' />
                            </div>
                            <div className='details mt-5'>
                                <div className='flex items-center lg:gap-5  mb-3'>
                                    <h4 className='text-green-700 text-[12px] font-medium'>{item.category}</h4>
                                    <div className='flex items-center sm:gap-1 lg:gap-2 flex-nowrap'>
                                        <p > <Timer className='w-4 h-4 text-gray-500' /></p>
                                        <p className='text-gray-500 text-[12px]'>{item.readTime} Mins Read</p>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-xl mb-3'>{item.title}</h1>
                                    <div className='flex items-center gap-5'>
                                        <p className='text-[15px] text-gray-700'>By <span className='text-blue-600 font-medium hover:underline decoration-dotted underline-offset-2'>{item.author}</span></p>
                                        <p>|</p>
                                        <div className='flex items-center gap-2'>
                                            <Calendar className='w-4 h-4' />
                                            <p className='text-[15px] text-gray-600'>{item.publishedAt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default TrendingSection