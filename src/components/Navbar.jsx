import { useState } from 'react';
import logo from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
const Navbar = () => {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setIsSearchOpen(false);
            setSearchTerm("")
        }
    };

    return (
        <>
            <div className="relative sticky top-0 z-50">
                <nav className='bg-white flex justify-between items-center px-4 sm:px-7 lg:px-12 h-16 lg:h-[76px] border-b border-gray-200'>
                    <div className='flex items-center' onClick={() => navigate('/')}>
                        <img src={logo} alt="logo-img" className='w-32 sm:w-40 lg:w-[200px] cursor-pointer' />
                        <h1 className='text-black font-bold text-2xl'>Blog</h1>
                    </div>
                    <div className='flex justify-between gap-6'>
                        <Search className="cursor-pointer"
                            onClick={() => setIsSearchOpen(true)} />
                        <div className='bg-gray-300 w-px h-6 hidden sm:block sm:flex'></div>
                        <a href='https://www.zoho.com/all-products.html' className='cursor-pointer hover:text-blue-500 hidden sm:block sm:flex'>Zoho Products</a>
                    </div>
                </nav>


                {isSearchOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg px-6 lg:px-12 py-8 z-30 flex items-center gap-5">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                            className="flex-1 border-b border-gray-300 py-4 text-xl outline-none"
                        />
                        <X onClick={() => setIsSearchOpen(false)}
                            className="cursor-pointer shrink-0 w-6 h-6" />
                    </div>
                )}
            </div>

        </>
    );
}

export default Navbar;