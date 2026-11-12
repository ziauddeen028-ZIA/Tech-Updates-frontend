import React, { useState, useEffect } from 'react'
import { Timer, Calendar, ChevronRight } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const PopularSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const datas = blogs.filter(
        (item) => item.isTrending && item.status === "published"
    );
    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/`);
            setBlogs(res.data);
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return <h1 className='text-center text-3xl m-5'>Loading...</h1>
    }

    return (
        <>
            <div className='bg-gray-50'>
                <div className='flex flex-col items-center py-14'>
                    <h1 className='lg:text-4xl  text-2xl lg:font-normal my-5'>Trends & Insights</h1>
                    <span className='w-14 h-[2px] bg-red-500'></span>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16 px-4 sm:px-7 lg:px-12 pb-16 max-w-7xl mx-auto">
                        {datas.length === 0 ? (
                            <div className="text-center py-16">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    No popular articles available
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    Check back later for popular stories.
                                </p>
                            </div>
                        ) :
                            (datas.map((item) => (
                                <Link to={`/blog/${item.slug}`} key={item._id} className="w-full min-w-0 group" >

                                    <div className="image bg-gray-50 h-[200px] overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className='details mt-5'>
                                        <div className='flex items-center lg:gap-5  mb-3'>
                                            <h4 className='text-green-700 text-[12px] font-medium'>{item.category?.name}</h4>
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
                                                    <p className='text-[15px] text-gray-600'><p>{new Date(item.publishedAt).toLocaleDateString("en-IN")}</p></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </Link>
                            )))
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={() => navigate('/blogs')} className='group text-center flex items-center justify-center gap-2 cursor-pointer border lg:border lg:border-blue-600 text-blue-700 lg:px-8 px-4 my-4  py-4  transition-colors text-[15px] '>VIEW ALL BLOGS <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></button>
            </div>
        </>
    )
}

export default PopularSection