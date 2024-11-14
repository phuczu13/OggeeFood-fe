import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoWeb from '../../driver/assets/OggeeDriver.png'
import User from '../../driver/assets/User.png';
import { Toaster, toast } from 'react-hot-toast';

function HeaderUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const driverId = localStorage.getItem('driverId'); // Lấy driverId từ localStorage

        if (driverId) {
            // Gọi API để lấy thông tin tài xế
            fetch(`https://be-order-food.vercel.app/api/driver/get-driver/${driverId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching driver info');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'OK' && data.data) {
                        setDriverInfo(data.data); // Lưu thông tin tài xế vào state
                    } else {
                        console.error('Driver data not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching driver info:', error);
                    toast.error('Error fetching driver info');
                });
        }
    }, []);
    return (
        <>
            <div className="px-4 sm:px-[150px] py-[15px] border-b bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className='flex justify-between'>
                        <Link to='/order-driver'>
                            <img src={LogoWeb} className="w-[120px] sm:w-[200px] mb-2 sm:mb-0" alt="Logo Web" />  
                        </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center relative">
                        <div className='mt-2 sm:mt-0'>
                            <button
                                className='flex items-center gap-2 text-white bg-[#ff7e00] hover:bg-[#ef4c2b] py-3 font-medium px-4 rounded-md'
                                onClick={toggleDropdown}
                            >
                                <img className='w-[22px] h-[28px]' src={User} alt="User Icon" />
                            </button>
                        </div>

                        {isOpen && (
                            <div className="absolute top-14 right-auto w-48 bg-white shadow-lg space-y-2 rounded-lg p-4 text-black">
                                <p>{driverInfo.name}</p>
                                <hr className="my-2" />
                                <a href="profile-driver" className="block cursor-pointer hover:text-gray-700">Profile</a>
                                <a href="order-driver" className="block cursor-pointer hover:text-gray-700">Đơn hàng</a>
                                <a href="#" className="block cursor-pointer hover:text-gray-700">Doanh thu</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderUser;
