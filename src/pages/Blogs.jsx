import React, { useState } from 'react'
import { data } from '../data/blogdata';
import { Timer, Calendar,ChevronLeft,ChevronRight } from "lucide-react";


const Blogs = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;
    const lastIndex = currentPage * articlesPerPage;
    const firstIndex = lastIndex - articlesPerPage;
    const datas = data.filter((item) => item.status === "published" && (selectedCategory === "" || item.category === selectedCategory));
    const totalPages = Math.ceil(datas.length / articlesPerPage);
    const currentArticles = datas.slice(firstIndex, lastIndex);
    return (
        <>
            <div className='bg-gray-50'>
                <div className='sec-navbar flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-8 px-4 sm:px-7 lg:px-12 py-2 bg-white border-b'>
                    <div className='flex items-center justify-between w-full lg:w-auto gap-3 py-3 lg:border-0'>
                        <label >Categories: </label> <select value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
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

                </div>
                <div className="text-3xl lg:text-4xl font-normal py-10 px-4 sm:px-7 lg:px-12">
                    {selectedCategory || "All Blog Articles"}
                </div>
                <div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-5 px-4 sm:px-7 lg:px-12 pb-20">
                        {
                            currentArticles.map((item) => (
                                <div key={item.id} className='w-full max-w-[350px]' >

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
                    <div className="flex justify-center items-center gap-3 pb-10">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className='bg-white p-2 cursor-pointer'
                        >
                            <ChevronLeft size={22} strokeWidth={1.5} />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? "font-bold text-blue-600 border border-blue-600 bg-white p-2 cursor-pointer " : "bg-white p-2 cursor-pointer"}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className='bg-white p-2 cursor-pointer'
                        >
                           <ChevronRight size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blogs;