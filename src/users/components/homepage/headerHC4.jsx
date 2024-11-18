import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoWeb from '../../assets/svg/icon_logoweb.svg';
import { Toaster, toast } from 'react-hot-toast';
import IconNext from '../../assets/svg/icon_next.svg'
import IconLogout2 from '../../assets/svg/icon_Logout2.svg'
import axios from 'axios';


function HeaderHC4() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [userData, setUserData] = useState(null); 

    const userId = localStorage.getItem('userId');
    // Gọi API lấy thông tin người dùng

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Cập nhật giá trị tìm kiếm khi người dùng gõ
    };
    
    const handleSearch = async (event) => {
        if (event.key === 'Enter' && searchQuery.trim() !== "") {
            console.log("Searching for:", searchQuery);
            try {
                navigate(`/search-results?query=${searchQuery}`);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
    }; 
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`https://be-order-food.vercel.app/api/user/inforUser/${userId}`); // API lấy thông tin user bằng userId
          console.log(response)
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user info', error);
        }
      };
  
      if (userId) {
        fetchUserInfo();
      }
    }, [userId]);
    const handleLogout = () => {
        setIsModalOpen(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.setItem('loggedOut', 'true');
        navigate('/sign-in');

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
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className='flex items-center gap-[6px] '>
                        <Link to='/home-page'>
                            <img src={LogoWeb} className="w-[120px] sm:w-[200px] mb-2 sm:mb-0" alt="Logo Web" />
                        </Link>
                        <div className="sm:mt-0 ml-3">
                            <input
                                type="text"
                                placeholder="Tìm kiếm món yêu thích"
                                className="border-2 p-2 w-full sm:w-[250px] sm:ml-4 rounded-full border-[#d0d0d0] px-5 focus:outline-none focus:border-[#ff7e00]"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearch} // Xử lý khi nhấn Enter
                            />
                        </div>
                    </div>

                    {/* Thanh input và Menu ở chế độ mobile */}
                    <div className="flex gap-4 items-center sm:hidden">
                        <button onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 focus:outline-none">
                            ☰
                        </button>
                        <img
                            onClick={toggleProfileMenu}
                            className='w-10 rounded-full cursor-pointer profile-btn'
                            src={userData?.avatar || "default-profile.jpg"}
                            alt="Profile"
                        />
                    </div>

                    {/* Menu lớn và Profile ở chế độ desktop */}
                    <div className="hidden sm:flex gap-12 items-center">
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/home-page'>
                                Món ăn
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/eatery'>
                                Quán ăn
                            </Link>
                            <Link className='hover:text-[#ef4c2b] font-semibold' to='/cart'>
                                Giỏ hàng
                            </Link>
                        </div>
                        <div className='relative'>
                            <img
                                onClick={toggleProfileMenu}
                                className='w-10 rounded-full cursor-pointer hover:ring profile-btn'
                                src={userData?.avatar || "default-profile.jpg"}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>

                {/* Menu khi thu nhỏ màn hình */}
                {isMenuOpen && (
                    <div className="sm:hidden mt-4 flex justify-center">
                        <ul className="flex gap-4">
                            <li>
                                <Link 
                                    to="/home-page" 
                                    className="hover:text-[#ef4c2b] font-semibold"
                                    onClick={() => {
                                        setIsMenuOpen(false); 
                                    }}
                                >
                                    Món ăn
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/eatery" 
                                    className="hover:text-[#ef4c2b] font-semibold"
                                    onClick={() => {
                                        setIsMenuOpen(false); 
                                    }}
                                >
                                    Quán ăn
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/cart" 
                                    className="text-[#ef4c2b] font-semibold border-b-[#ef4b2c] border-b-2"
                                    onClick={() => {
                                        setIsMenuOpen(false); 
                                    }}
                                >
                                    Giỏ hàng
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}

            </div>

            {isProfileMenuOpen && (
                <div className="fixed top-17 right-4 bg-opacity-50 flex justify-end items-start z-50">
                    <div className="bg-[#ffffff] rounded-md w-[200px] p-4 h-fit" style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                        <h2 className="text-xl font-semibold mb-4 text-center">{userData.name}</h2>
                        <div className='bg-gray-400 h-[1px] w-full mb-4'></div>
                        <ul className="flex flex-col font-semibold">
                            <li>
                                <Link to="/user-account" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Tài khoản <span><img src={IconNext} alt="" /></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/order" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    <div className='flex items-center justify-between'>
                                        Đơn hàng <span><img src={IconNext} alt="" /></span>
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

export default HeaderHC4;
