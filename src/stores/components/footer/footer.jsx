import React from 'react'
import { Link } from 'react-router-dom'
import LogoWeb from "../../../users/assets/svg/icon_logoweb.svg"
import LogoStore from '../../assets/svg/icon_logoStore.svg'


function Footer() {
  return (
    <div>
        <div className='w-full bg-[#f8e7cc] text-[#BD7346]'>
            <div className='flex gap-5 items-center justify-center pt-20'>   
                <img src={LogoWeb} alt="" />
                <span>|</span>
                <img className='w-[200px] h-[50px]' src={LogoStore} alt="" />
            </div>

            <div className='flex gap-5 justify-center my-10 font-semibold'>
                <Link
                    to='/home-page'
                >
                    PRODUCTS
                </Link>
                <Link
                    to='/blog'
                >
                    BLOG
                </Link>
                <Link
                    to='/home-store'
                >
                    STORE
                </Link>
                <Link
                    to=''
                >
                    CONTACTS
                </Link>
            </div>

            <div className='max-w-[1200px] mt-10 h-[1px] bg-[#ff7e00] flex justify-center mx-auto'>

            </div>
            <div className='py-10 justify-center flex font-medium'>
                © 2024 - Bản quyền thuộc về Nhóm 5 thành viên Oggee
            </div>
        </div>
    </div>
  )
}

export default Footer