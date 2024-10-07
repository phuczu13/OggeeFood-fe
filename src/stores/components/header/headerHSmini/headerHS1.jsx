import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoStore from '../../../assets/svg/icon_logoStore.svg';
import IconLogout from '../../../assets/svg/icon_Logout.svg';
import { Toaster, toast } from 'react-hot-toast';

function HeaderHS1() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    
    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.setItem('loggedOut', 'true'); // Đặt cờ trạng thái đăng xuất
        navigate('/signin-store');
    };
     
    

    const cancelLogout = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            cancelLogout();
        }
    };

    return (
        <>
            <div className="px-4 sm:px-[150px] py-[15px] border-b bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <Link to='/home-store'>
                        <img src={LogoStore} className="w-[120px] sm:w-[200px] mb-2 sm:mb-0" alt="Logo Web" />  
                    </Link>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center">
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
                            <Link to='/home-store' className='text-[#ef4c2b] font-semibold border-b-2 border-[#ef4c2b] rounded-sm'>
                                Món ăn
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/topping-store'>
                                Topping
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/order-store'>
                                Đơn hàng
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/revenue-store'>
                                Doanh số
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/infor-store'>
                                Thông tin cửa hàng
                            </Link>
                        </div>
                        <div className='mt-2 sm:mt-0'>
                            <button 
                                onClick={handleLogout} 
                                className='flex items-center gap-2 text-white bg-[#ff7e00] hover:bg-[#ef4c2b] py-3 font-medium px-4 rounded-md'>
                                Đăng xuất
                                <img className='w-[16px] h-[16px]' src={IconLogout} alt="Logout Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleOverlayClick}
                >
                    <div className="bg-white px-8 py-6 rounded-lg shadow-lg max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-center">Bạn có chắc chắn muốn đăng xuất?</h2>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={cancelLogout} 
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md font-semibold">
                                Hủy bỏ
                            </button>
                            <button 
                                onClick={confirmLogout} 
                                className="px-4 py-2 bg-[#ef4c2b] text-white hover:bg-[#d63a1d] rounded-md font-semibold">
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Toaster position='top-right' />
        </>
    );
}

export default HeaderHS1;
