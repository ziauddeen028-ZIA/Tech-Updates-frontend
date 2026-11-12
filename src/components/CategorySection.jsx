import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CategorySection = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/`);
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
        <div className='bg-gray-50 my-14 pb-10'>
            <div className='flex flex-col items-center py-14'>
                <h1 className='text-4xl font-semibold my-5'>Explore Categories</h1>
                <span className='w-14 h-[2px] bg-red-500'></span>
            </div>
            <div className='flex flex-col lg:flex-row lg:flex lg:flex-wrap justify-center gap-3 px-4 sm:px-8 lg:px-16'>
                {blogs.map((item) => (
                    <div key={item._id}
                        className='bg-white border border-gray-200 rounded-md px-6 py-4 text-lg hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer'
                        onClick={() => navigate(`/category/${encodeURIComponent(item.name)}`)}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategorySection