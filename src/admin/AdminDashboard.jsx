import React, { useState, useEffect } from 'react'
import axios from 'axios'


const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        image: "",
        category: "",
        author: "",
        publishedAt: "",
        readTime: "",
        status: "draft",
        isFeatured: false,
        isTrending: false,
        isPopular: false,
        isLatest: false
    })


    const getData = async () => {
        try {
            const [blogRes, catRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/blog/`),
                axios.get(`${import.meta.env.VITE_API_URL}/category/`)
            ]);
            setBlogs(blogRes.data);
            setCategory(catRes.data);
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false);
        }
    }

    const addData = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/blog/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await getData();
            setFormData({
                title: "",
                slug: "",
                description: "",
                content: "",
                image: "",
                category: "",
                author: "",
                publishedAt: "",
                readTime: "",
                status: "draft",
                isFeatured: false,
                isTrending: false,
                isPopular: false,
                isLatest: false
            })
            setShowForm(false);
        } catch (error) {
            console.log(error.message);
        }

        console.log(formData);

    }

    const editData = (index, data) => {
        setShowForm(true);
        setFormData(data)
        setEditIndex(index)
    }

    const updateData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/blog/` + `${editIndex}`, formData);
            await getData();
            setShowForm(false);
            setEditIndex(null);

        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteData = async (deleteIndex) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/blog/` + `${deleteIndex}`)
            await getData();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (loading) {
        return <h1 className='text-center text-3xl m-5'>Loading...</h1>
    }

    return (
        <>
            <div>

                <div className="bg-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 p-5 w-full">
                    <h1 className='lg:text-4xl text-4xl font-bold'>AdminDashboard</h1>
                    <div className='flex gap-4'>
                        <h1 className='text-2xl font-bold'>Blog Count : <span className='text-center'>{blogs.length}</span></h1>
                        <h1 className='text-2xl font-bold'>Category Count : <span className='text-center'>{category.length}</span></h1>
                    </div>
                </div>
                <div className='flex lg:flex-row flex-col gap-6 p-4'>
                    <div className="blog w-full lg:w-1/2 bg-white shadow-md rounded-xl p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h1 className='text-2xl font-bold'>Blog</h1>
                            <button className='bg-green-500 p-3 rounded-xl text-white'
                                onClick={() => {
                                    setShowForm(true)
                                    setEditIndex(null)
                                    setFormData({
                                        title: "",
                                        slug: "",
                                        description: "",
                                        content: "",
                                        image: "",
                                        category: "",
                                        author: "",
                                        publishedAt: "",
                                        readTime: "",
                                        status: "draft",
                                        isFeatured: false,
                                        isTrending: false,
                                        isPopular: false,
                                        isLatest: false
                                    })
                                }}
                            >ADD</button>
                        </div>
                        <ul>
                            {blogs.map((data) => (
                                <li
                                    key={data._id}
                                    className="flex justify-between items-center gap-3 border-b p-4"
                                >
                                    <p className="text-base sm:text-lg font-medium flex-1 break-words">
                                        {data.title}
                                    </p>

                                    <div className="flex gap-2 shrink-0">
                                        <button className="bg-blue-500 p-3 rounded-xl text-white"
                                            onClick={() => editData(data._id, data)}
                                        >
                                            EDIT
                                        </button>

                                        <button className="bg-red-500 p-3 rounded-xl text-white"
                                        onClick={() => deleteData(data._id)}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>


                    </div>

                    <div className='category w-full lg:w-1/2 m-4'>
                        <div className='flex justify-around'>
                            <h1 className='text-2xl font-bold'>Categories</h1>
                            <button className='bg-green-500 p-3 rounded-xl text-white'>ADD</button>
                        </div>
                        <ul>
                            {category.map((data) => (
                                <li
                                    key={data._id}
                                    className="flex justify-between items-center gap-3 border-b p-4"
                                >
                                    <p className="text-base sm:text-lg font-medium flex-1 break-words">
                                        {data.name}
                                    </p>

                                    <div className="flex gap-2 shrink-0">
                                        <button className="bg-blue-500 p-3 rounded-xl text-white">
                                            EDIT
                                        </button>

                                        <button className="bg-red-500 p-3 rounded-xl text-white">
                                            DELETE
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>
                {showForm && (
                    <form className="bg-gray-100 p-5 rounded-xl mt-5"
                        onSubmit={editIndex == null ? addData : updateData}>

                        <h1 className="text-2xl font-bold mb-5">{editIndex === null ? "Add New Blog" : "Edit Blog"}</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Author"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="border p-3 rounded-lg sm:col-span-2"
                                required
                            />

                            <textarea
                                placeholder="Content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="border p-3 rounded-lg sm:col-span-2"
                                rows="5"
                                required
                            />

                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            >
                                <option value="">Select Category</option>
                                {category.map((data) => (
                                    <option key={data._id} value={data._id}>
                                        {data.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={formData.publishedAt}
                                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <input
                                type="number"
                                placeholder="Read Time"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            />

                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="border p-3 rounded-lg"
                                required
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>

                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            {["isFeatured", "isTrending", "isPopular", "isLatest"].map((field) => (
                                <label key={field}>
                                    <input
                                        type="checkbox"
                                        checked={formData[field]}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            [field]: e.target.checked
                                        })}
                                    />
                                    {" "}{field}
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-5">
                            <button
                                type='submit'
                                className="bg-green-600 text-white px-5 py-2 rounded-lg"
                            >
                                {editIndex == null ? "ADD" : "UPDATE"}
                            </button>

                            <button
                                onClick={() => setShowForm(false)}
                                type='button'
                                className="bg-gray-400 text-white px-5 py-2 rounded-lg"
                            >
                                CANCEL
                            </button>
                        </div>

                    </form>
                )}
            </div>
        </>
    )
}

export default AdminDashboard