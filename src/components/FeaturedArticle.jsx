import React, { useState } from 'react'
import { Timer, Calendar } from "lucide-react";
import { data } from '../data/blogdata';
import { Link } from 'react-router-dom';

const FeaturedArticle = () => {
    const featuredData = data.filter((item) => item.isFeatured);
    const [activeIndex, setActiveIndex] = useState(0);
    const datas = featuredData[activeIndex];
    if (featuredData.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-800">
                    No featured articles available
                </h2>
                <p className="text-gray-500 mt-2">
                    Check back later for featured stories.
                </p>
            </div>
        );
    }
    return (
        <>
            <Link to={`/blog/${datas.slug}`}>

                <div className='image'>
                    <img src={datas.image} alt="artificial intelligence" className='w-full h-[200px] lg:h-[475px] rounded-xl object-fill' />
                </div>
                <div className='details mt-5'>
                    <div className='flex items-center lg:gap-5  mb-3'>
                        <h4 className='text-green-700 text-[15px] font-medium'>{datas.category}</h4>
                        <div className='flex items-center sm:gap-1 lg:gap-2'>
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

            </Link>
            <div className="flex lg:hidden justify-center gap-2 mt-6 py-20">
                {featuredData.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${activeIndex === index
                            ? 'bg-gray-800 w-5'
                            : 'bg-gray-300'
                            }`}
                        aria-label={`Show article ${index + 1}`}
                    />
                ))}
            </div>
        </>
    )
}

export default FeaturedArticle