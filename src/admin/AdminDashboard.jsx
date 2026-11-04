import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showBlogForm, setShowBlogForm] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
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
    });


    const fetchBlog = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/`);
            setBlogs(res.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    };

    const fetchCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/category/`);
            setCategories(res.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    };
    const handleAddBlog = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/blog/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await fetchBlog();
            setShowBlogForm(false)
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
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchBlog();
    }, []);

    useEffect(() => {
        fetchCategory();
    }, []);

    if (loading) {
        return <h2>Loading articles...</h2>;
    }



    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6 md:p-10">

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white p-6 rounded-xl border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>

                    <div className="bg-blue-50 p-4 rounded-lg text-center min-w-28">
                        <p>Blogs: {blogs.length}</p>
                        <p>Categories: {categories.length}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-gray-800">Blogs</h1>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                onClick={() => setShowBlogForm(true)}>
                                ADD BLOG
                            </button>
                        </div>

                        {blogs.map((item, index) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b py-4"
                            >
                                <div className="flex gap-4">
                                    <p>{index + 1}</p>
                                    <p>{item.title}</p>
                                    <p>{item.category?.name}</p>
                                    <p>{item.status}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md">
                                        Edit
                                    </button>

                                    <button className="text-red-600 border border-red-200 px-3 py-1.5 rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-gray-800">
                                Categories
                            </h1>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                ADD CATEGORY
                            </button>
                        </div>

                        {categories.map((item, index) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between border-b border-gray-100 py-4"
                            >
                                <p>
                                    {index + 1}. {item.name}
                                </p>

                                <div className="flex gap-2">
                                    <button className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md">
                                        Edit
                                    </button>

                                    <button className="text-red-600 border border-red-200 px-3 py-1.5 rounded-md">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showBlogForm && (
                    <div className="bg-white border rounded-xl p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Add New Blog
                        </h2>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddBlog}>

                            <input
                                type="text"
                                placeholder="Blog Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="text"
                                placeholder="Slug"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="text"
                                placeholder="Short Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="border rounded-lg p-3 md:col-span-2"
                            />

                            <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="border rounded-lg p-3"
                            >
                                <option value="">Select Category</option>
                                {categories.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Author"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="date"
                                value={formData.publishedAt}
                                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <input
                                type="number"
                                placeholder="Read Time (minutes)"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                className="border rounded-lg p-3"
                            />

                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="border rounded-lg p-3"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>

                            <textarea
                                placeholder="Blog Content (Markdown supported)"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="border rounded-lg p-3 md:col-span-2"
                                rows="8"
                            />

                            <div className="md:col-span-2 flex flex-wrap gap-6">

                                {["isFeatured", "isTrending", "isPopular", "isLatest"].map((field) => (
                                    <label key={field} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={formData[field]}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                [field]: e.target.checked
                                            })}
                                        />
                                        {field.replace("is", "")}
                                    </label>
                                ))}

                            </div>

                            <div className="md:col-span-2 flex gap-3">

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                                >
                                    Save Blog
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowBlogForm(false)}
                                    className="border px-6 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;