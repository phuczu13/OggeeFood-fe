import React from 'react'
import { Link } from 'react-router-dom'
import LogoWeb from '../../assets/svg/icon_logoweb.svg'
import LogoStore from '../../assets/svg/icon_logoStore.svg'


function Footer() {
    return (
        <div className="w-full bg-[#f8e7cc] text-[#BD7346]">
            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-10">
                <img src={LogoWeb} alt="Logo Web" className="w-[150px] sm:w-auto" />
                <span className="hidden sm:block">|</span>
                <img
                    className="w-[150px] sm:w-[200px] h-auto"
                    src={LogoStore}
                    alt="Logo Store"
                />
            </div>

            <div className="flex flex-wrap gap-5 justify-center my-10 font-semibold text-center">
                <Link
                    to="/product"
                    className="hover:text-[#ff7e00] transition-colors duration-200"
                >
                    PRODUCTS
                </Link>
                <Link
                    to="/blog"
                    className="hover:text-[#ff7e00] transition-colors duration-200"
                >
                    BLOG
                </Link>
                <Link
                    to="/eatery"
                    className="hover:text-[#ff7e00] transition-colors duration-200"
                >
                    EATERY
                </Link>
                <a
                    href="https://www.facebook.com/phuczu13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff7e00] transition-colors duration-200"
                >
                    CONTACTS
                </a>
            </div>

            <div className="w-full max-w-[1200px] h-[1px] bg-[#ff7e00] mx-auto"></div>

            <div className="py-10 flex justify-center text-center font-medium text-sm sm:text-base">
                © 2024 - Bản quyền thuộc về Nhóm 5 thành viên Oggee
            </div>
        </div>
    )
}

export default Footer