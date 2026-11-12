import React, { useState, useEffect } from 'react'
import { Clock } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BlogDetails = () => {
    const { slug } = useParams();
    const [featuredData, setFeaturedData] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/slug/${slug}`);
            setFeaturedData(res.data);
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData();
    }, [slug]);


    if (loading) {
        return <h1 className='text-center text-3xl m-5'>Loading...</h1>
    }
    if (!featuredData) {
        return (
            <h1 className="text-center text-2xl mt-10">
                Blog not found
            </h1>
        );
    }
    return (
        <>
            <div className='bg-gray-50'>


                <div className='flex flex-col w-[80%]  mx-auto '>
                    <div>
                        <h1 className='text-3xl lg:text-4xl font-normal leading-tight mb-8'>{featuredData.title}</h1>
                        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center items-start gap-4 my-2'>
                            <div className='flex flex-col sm:flex-row sm:items-center gap-5 '>
                                <h1 className='text-blue-600 text-xl '>{featuredData.author}</h1>
                                <span className="h-16 hidden lg:block border-l border-dashed border-gray-300"></span>
                                <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
                                    <p>
                                        Published on:
                                        <span className="text-gray-900">
                                            {new Date(featuredData.publishedAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </p>

                                    <p>
                                        Last Updated on:
                                        <span className="text-gray-900">
                                            {new Date(featuredData.updatedAt || featuredData.publishedAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-start lg:items-center gap-2 text-gray-600 text-sm'>
                                <Clock size={15} /> <h1>{featuredData.readTime} Mins Read</h1>
                            </div>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <img src={featuredData.image} alt="" className='w-full h-[300px] lg:h-[450px] object-cover rounded-lg ' />
                    </div>
                    <div className="article-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-4xl font-semibold mb-6">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-semibold mt-10 mb-4">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-gray-700 leading-8 mb-5">{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc pl-8 mb-5 space-y-2">{children}</ul>
                                ),
                            }}
                        >
                            {featuredData.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetails