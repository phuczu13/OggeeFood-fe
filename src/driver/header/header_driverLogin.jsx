import React, { useState,useEffect } from 'react';
import LogoDriver from '../../driver/assets/logo_driver.svg'

function HeaderDriverLogin() {
    const [isOpen, setIsOpen] = useState(false);
    const [driverInfo, setDriverInfo] = useState(null);
    
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
                        <div>
                            <img src={LogoDriver} className="w-[120px] sm:w-[200px] h-12" alt="Logo Driver" />  
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center relative">
                        <div className='mt-2 sm:mt-0 flex items-center gap-2'>
                            <div className='text-[#ff7e00] font-semibold text-xl'>Chào tài xế Ogge</div>
                            <img className='w-[50px] border rounded-full h-[50px]' src={driverInfo.avatar || 'https://i.pinimg.com/736x/4c/0c/c5/4c0cc5ffc23b1a6329d4e3f5d803c006.jpg'} alt="User Icon" />
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
export default HeaderDriverLogin;
