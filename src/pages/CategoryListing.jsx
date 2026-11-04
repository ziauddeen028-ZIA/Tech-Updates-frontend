import React, { useState,useEffect } from 'react'
import { Timer, Calendar } from "lucide-react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CategoryListing = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const selectedCategory = categoryName === "all" ? "" : categoryName;
    const datas = selectedCategory === "" ? blogs : blogs.filter((item) => item.category?.name === selectedCategory);
    const [loading, setLoading] = useState(true);

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
            <div className='bg-gray-50'>
                <div className='sec-navbar flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-8 px-4 sm:px-7 lg:px-12 py-2 bg-white border-b'>
                    <div className='flex items-center justify-between w-full lg:w-auto gap-3 py-3 lg:border-0'>
                        <label >Categories: </label> <select value={selectedCategory}
                            onChange={(e) => navigate(`/category/${encodeURIComponent(e.target.value || "all")}`)}
                            className="w-[240px] border border-gray-300 bg-white px-4 py-3 text-base rounded-sm outline-none focus:border-blue-500 cursor-pointer">
                            <option value="">ALL</option>
                            <option value="Cybersecurity">Cyber Security</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Software Development">Software Development</option>
                            <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                            <option value="Web and Mobile App Development">Web and Mobile App Development</option>
                            <option value="Technology & Innovation">Technology & Innovation</option>
                            <option value="Industry Insights">Industry Insights</option>
                        </select>
                    </div>

                    <div className='flex items-center justify-between w-full lg:w-auto gap-3 py-3  lg:border-0'>
                        <label >Products: </label> <select className='w-[240px] border border-gray-300 bg-white px-4 py-3 text-base rounded-sm outline-none focus:border-blue-500 cursor-pointer'>
                            <option value="">All</option>
                            <option value="">Zoho Analytics</option>
                            <option value="">Zoho DataPrep</option>
                            <option value="">Zoho IOT</option>
                        </select>
                    </div>
                </div>
                <div className="text-3xl lg:text-4xl font-normal py-10 px-4 sm:px-7 lg:px-12">
                    {selectedCategory}
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 px-4 sm:px-7 lg:px-12 pb-20">
                        {
                            datas.length === 0 ? (
                                <div className="col-span-full text-center py-20">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        No articles found
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                        There are no articles available in this category yet.
                                    </p>
                                </div>
                            ) : (datas.map((item) => (
                                <Link to={`/blog/${item.slug}`} key={item._id} className='w-[350px] h-[250px]' >

                                    <div className="image bg-gray-50 h-[200px] overflow-hidden">
                                        <img src={item.image} alt="artificial intelligence"  className="w-full h-full object-cover" />
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
        </>
    )
}

export default CategoryListing