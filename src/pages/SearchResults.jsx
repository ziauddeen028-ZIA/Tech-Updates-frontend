import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Timer, Calendar } from "lucide-react";
import { useSearchParams, useNavigate,Link } from 'react-router-dom';

const SearchResults = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get("q") || "";
    const filteredData = blogs.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        return <h2>Loading articles...</h2>;
    }
    return (
        <>
            <div>
                <div className="text-3xl lg:text-xl font-normal py-10 px-4 sm:px-7 lg:px-12">
                    Search Result : {filteredData.length} results for "{searchTerm}"
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 px-4 sm:px-7 lg:px-12 pb-20">

                        {
                            filteredData.length === 0 ? (
                                <p>No articles found for "{searchTerm}"</p>
                            ) : (
                                filteredData.map((item) => (
                                    <Link to={`/blog/${item.slug}`} key={item._id} className="w-full min-w-0">

                                        <div className="image bg-gray-50 h-[200px] overflow-hidden rounded-sm">
                                            <img src={item.image} alt="artificial intelligence" className='w-full h-[200px] lg:h-fit  object-contain' />
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
                                ))
                            )
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResults