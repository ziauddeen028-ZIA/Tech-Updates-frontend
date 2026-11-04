import React from 'react'

const AdminDashboard = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6 md:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-white p-6 rounded-xl border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">AdminDashboard</h1>
                    <div className="bg-blue-50 p-4 rounded-lg text-center min-w-28">
                        <p>Blog:4</p>
                        <p>category:6</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='left bg-white border border-gray-200 rounded-xl p-6 shadow-sm'>
                        <h1 className="text-xl font-semibold text-gray-800">Blog</h1><button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">ADD BLOG</button>
                        <p>1</p><p>title</p><p><button className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md">Edit</button><button className="text-red-600 border border-red-200 px-3 py-1.5 rounded-md">Delete</button></p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h1 className="text-xl font-semibold text-gray-800">category</h1><button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">ADD category   </button>
                        <p>1</p><p>title</p><p><button className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md">Edit</button><button className="text-red-600 border border-red-200 px-3 py-1.5 rounded-md">Delete</button></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard