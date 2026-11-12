import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errormsg, setErrorMsg] = useState('');


    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErrorMsg('')
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password
            })

            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                navigate('/admin/dashboard')
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Login Failed...")
        }
        finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <h1 className='text-center text-3xl m-5'>Loading...</h1>
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Admin Login
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Login to manage your blogs
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleLogin}>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    {errormsg && (
                        <p className="text-red-500 text-sm">
                            {errormsg}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Tech Updates Admin Panel
                </p>

            </div>
        </div>
    )
}

export default AdminLogin