import logo from '../assets/logo1.png';
import { Search } from "lucide-react";
const Navbar = () => {

    return (
        <>
            <nav className=' bg-white flex justify-between items-center px-4 sm:px-7 lg:px-12 h-16 lg:h-[76px] border-b sticky top-0 z-20 '>
                <div className='flex items-center'>
                    <img src={logo} alt="logo-img" className='w-32 sm:w-40 lg:w-[200px] cursor-pointer' />
                    <h1 className='text-black font-bold text-2xl'>Blog</h1>
                </div>
                <div className='flex justify-between gap-6'>
                    <Search />
                    <div className='bg-gray-300 w-px h-6 hidden sm:block sm:flex'></div>
                    <a href='https://www.zoho.com/all-products.html' className='cursor-pointer hover:text-blue-500 hidden sm:block sm:flex'>Zoho Products</a>
                </div>

            </nav>

        </>
    );
}

export default Navbar;