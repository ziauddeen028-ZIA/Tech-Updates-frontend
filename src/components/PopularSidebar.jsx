import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PopularSidebar = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const popularData = blogs.filter(
        (item) => item.isPopular && item.status === "published"
    );

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/blog');
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
    
    return (
        <>
            <div className='bg-gray-50 lg:bg-white flex flex-col gap-8 w-full border-l border-dashed border-gray-300'>
                {
                    popularData.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">
                            No popular articles available yet.
                        </p>
                    ) : (popularData.map((item) => (
                        <Link to={`/blog/${item.slug}`} key={item.id} className='border-b border-dashed border-gray-300 pb-8 pl-6 mx-4'>
                            <img src={item.image} alt={item.title} className='w-32 h-20 object-fill rounded-lg mt-3' />
                            <h1 className='text-2xl lg:text-xl text-gray-800 font-normal mt-3 mb-4'>{item.title} </h1>
                            <button className='group flex items-center lg:justify-center gap-2 cursor-pointer border-none lg:border lg:border-blue-600 text-blue-700 lg:px-8  py-4  transition-colors text-[15px]'>READ MORE <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" /></button>
                        </Link>
                    )))
                }
            </div>
        </>
    )
}

export default PopularSidebar