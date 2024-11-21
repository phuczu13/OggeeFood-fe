import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoStore from '../../../assets/svg/icon_logoStore.svg';
import { Toaster, toast } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import IconLogout2 from '../../../assets/svg/icon_Logout2.svg';
import IconNext from '../../../assets/svg/icon_next.svg'



function HeaderHS1() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    //const storeId = localStorage.getItem('storeId');
    const [userData, setUserData] = useState(null)
    useEffect(() => {
    
        if (storeId) {
            // Gọi API để lấy thông tin cửa hàng
            fetch(`https://be-order-food.vercel.app/api/store/getInforStore/${storeId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error fetching store info');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'OK' && data.data) {
                        setUserData(data.data); // Lưu thông tin cửa hàng vào state
                    } else {
                        console.error('Store data not found');
                    }
                })
                .catch(error => {
                    console.error('Error fetching store info:', error);
                    toast.error('Error fetching store info');
                });
        }
    }, []);

    console.log("storeId is "+storeId)
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        setIsModalOpen(true);
    };

    
    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('storeId');
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

    // Xử lý khi click vào profile để mở/đóng menu
    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    // Ẩn menu Profile khi click ra ngoài
    const handleClickOutside = (e) => {
        if (!e.target.closest('.profile-menu') && !e.target.closest('.profile-btn')) {
            setIsProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isProfileMenuOpen) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    // Toggle menu mobile
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="px-4 sm:px-[150px] py-[15px] border-b bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <Link to='/home-store' state={{ storeId }}>
                        <img src={LogoStore} className="w-[120px] sm:w-[200px] mb-2 sm:mb-0" alt="Logo Web" />  
                    </Link>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center">
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
                        <Link className='text-[#ef4c2b] font-semibold border-b-2 border-[#ef4c2b] rounded-sm' to='/home-store' state={{ storeId }}>
                            Món ăn
                        </Link>
                        <Link to='/topping-store' className='hover:text-[#ef4c2b] font-semibold' state={{ storeId }}>     
                            Món phụ
                        </Link>
                        <Link className='hover:text-[#ef4c2b] font-semibold' to='/order-store' state={{ storeId }}>
                            Đơn hàng
                        </Link>
                        <Link className='hover:text-[#ef4c2b] font-semibold' to='/revenue-store' state={{ storeId }}>
                            Doanh số
                        </Link>
                        </div>
                        <div className='relative'>
                            <img
                                onClick={toggleProfileMenu}
                                className='w-10 rounded-full cursor-pointer hover:ring profile-btn'
                                src={userData?.avatar || "default-profile.jpg"}
                                // src=''
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 items-center sm:hidden">
                <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 focus:outline-none">
                    ☰
                </button>
                <img
                    onClick={toggleProfileMenu}
                    className='w-10 rounded-full cursor-pointer profile-btn'
                    src={userData?.avatar || "default-profile.jpg"}
                    // src=''
                    alt="Profile"
                />
            </div>

            {isProfileMenuOpen && (
                <div className="fixed top-17 right-4 bg-opacity-50 flex justify-end items-start z-50">
                    <div className="bg-[#ffffff] rounded-md w-[200px] p-4 h-fit" style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                        {/* <h2 className="text-xl font-semibold mb-4 text-center">{storeInfo.storeName}</h2> */}
                        <h2 className="text-xl font-semibold mb-4 text-center">{userData.storeName}</h2>
                        <div className='bg-gray-400 h-[1px] w-full mb-4'></div>
                        <ul className="flex flex-col font-semibold">
                            <li>
                                <Link to="/infor-store" state={{ storeId }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Tài khoản của tôi <span><img src={IconNext} alt="" /></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/pointer-wallet" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Ví Pointer <span><img src={IconNext} alt="" /></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doanhthu" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Doanh thu <span><img src={IconNext} alt="" /></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/transaction-history" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Lịch sử giao dịch <span><img src={IconNext} alt="" /></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 w-full py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    <div className='flex w-full items-center justify-between'>
                                        Đăng xuất <span><img src={IconLogout2} alt="" /></span>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

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
