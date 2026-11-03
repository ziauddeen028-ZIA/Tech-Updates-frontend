import React from 'react'
import FeaturedArticle from '../components/FeaturedArticle'
import PopularSidebar from '../components/PopularSidebar'
import TrendingSection from '../components/TrendingSection'

const Home = () => {
    return (
        <>
            <div className='w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start px-4 sm:px-7 lg:px-12 pt-10 pb-7 gap-3'>
                <h2 className='text-3xl lg:text-sm font-normal capitalize lg:uppercase'>Featured posts</h2>
                <span className='w-14 h-[1px] lg:w-[1px] lg:h-4 bg-red-500 lg:order-first'></span>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-10 gap-8 px-4 sm:px-7 lg:px-12 '>

                <div className='lg:col-span-7'>
                    <FeaturedArticle />
                </div>
                <div className='lg:col-span-3'>
                    <PopularSidebar />
                </div>
            </div>
            <div>
                <TrendingSection />
            </div>
        </>
    )
}

export default Home