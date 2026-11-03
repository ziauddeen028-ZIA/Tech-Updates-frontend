import React from 'react'
import { FaXTwitter, FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa6";
import logo from '../assets/footer-img.png';

const Footer = () => {
    return (
        <>
            <footer>
                <div className='bg-gray-50 top flex justify-center flex-col items-center gap-5 border-dashed border-gray-400 border-t-1 my-2 py-4'>
                    <p>Follow us on</p>
                    <div className='social flex gap-3 text-3xl'>
                        <FaXTwitter />
                        <FaFacebook />
                        <FaYoutube />
                        <FaLinkedin />
                        <FaInstagram />
                    </div>
                    <p>Tearms of Service | Privacy Policy </p>
                </div>
                <div className='bottom bg-[#0B0B1A] py-7 text-gray-300 flex flex-col justify-center items-center'>
                    <div>
                        <img src={logo} alt="logo-img" className='h-[80px] w-[220px] pl-10' />
                        <p>
                            © 2026 Tech Updates. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer