import React, { useState, useEffect } from 'react'
import { Timer, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const TrendingSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const datas = blogs.filter(
        (item) => item.isLatest && item.status === "published"
    );

    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/`);
            setBlogs(res.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <h1 className='text-center text-3xl m-5'>Loading...</h1>
    }
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 w-full px-10 pb-20 items-stretch'>
                {
                    datas.length === 0 ? (
                        <div className="col-span-full text-center py-16">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                No trending articles available
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Check back later for the latest updates.
                            </p>
                        </div>
                    ) : (datas.map((item) => (
                        <Link to={`/blog/${item.slug}`} key={item._id} className='w-full min-w-0 h-full flex flex-col'>

                            <div className="image bg-gray-50 h-[200px] overflow-hidden w-full shrink-0">
                                <img src={item.image} alt="artificial intelligence" className="w-full h-full object-cover" />
                            </div>
                            <div className='details mt-5 flex flex-col flex-1'>
                                <div className='flex items-start justify-between gap-3 mb-3 min-h-[24px]'>
                                    <h4 className='text-green-700 text-[12px] font-medium'>{item.category?.name}</h4>
                                    <div className='flex items-center gap-2 shrink-0'>
                                        <p > <Timer className='w-4 h-4 text-gray-500' /></p>
                                        <p className='text-gray-500 text-[12px] whitespace-nowrap'>{item.readTime} Mins Read</p>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='text-xl leading-7 line-clamp-2 mb-3'>{item.title}</h1>
                                    <div className='flex items-center gap-5'>
                                        <p className='text-[15px] text-gray-700'>By <span className='text-blue-600 font-medium hover:underline decoration-dotted underline-offset-2'>{item.author}</span></p>
                                        <p>|</p>
                                        <div className='flex items-center flex-wrap gap-x-4 gap-y-2 mt-auto pt-2'>
                                            <Calendar className='w-4 h-4' />
                                           <p className='text-[15px] text-gray-600 whitespace-nowrap'>{new Date(item.publishedAt).toLocaleDateString("en-IN")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Link>
                    )))
                }
            </div>
        </>
    )
}

export default TrendingSection