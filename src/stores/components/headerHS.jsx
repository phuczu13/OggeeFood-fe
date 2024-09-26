import { useState, useEffect, useRef } from 'react';
import VietNam from '../../users/assets/png/imageAvatar.png';
import LogoStore from '../assets/svg/icon_logoStore.svg';
import SettingHS from '../assets/svg/icon_setting.svg';
import { Link, useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';



function HeaderHS() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    const menuRef = useRef(null);
    const confirmRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        setShowLogoutConfirm(true);
        setIsMenuOpen(false); // Tắt menu khi chọn "Đăng xuất"
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        navigate('/signin-store');
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    // Ẩn menu khi nhấn ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (confirmRef.current && !confirmRef.current.contains(event.target)) {
                setShowLogoutConfirm(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
    `;

    const DropdownMenu = styled.div`
    animation: ${fadeIn} 0.3s ease-out;
    `;

    return (
        <div className="px-4 sm:px-[150px] mb-10 py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoStore} className="w-[120px] sm:w-[200px]" alt="Logo Web" />
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 sm:gap-4 items-center mr-2 sm:mr-5">
                        <span className="text-sm sm:text-base text-[#ff7e00] font-bold">Phúc Mập Quán</span>
                        <img className="w-[35px] h-[35px] sm:w-[45px] sm:h-[45px] border rounded-full" src={VietNam} alt="Việt Nam" />
                    </div>
                    <div className="relative">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <img className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]" src={SettingHS} alt="setting" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <DropdownMenu ref={menuRef} className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                <Link
                                to='/infor-newstore' className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#ff7e00] hover:text-white rounded-t-lg transition-colors duration-300">
                                    Tài khoản của bạn
                                </Link>
                                <button className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#ff7e00] hover:text-white transition-colors duration-300">
                                    Doanh thu của bạn
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-700 rounded-b-lg transition-colors duration-300"
                                >
                                    Đăng xuất
                                </button>
                            </DropdownMenu>
                        )}

                        {/* Logout Confirmation Modal */}
                        {showLogoutConfirm && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                <div ref={confirmRef} className="bg-white rounded-lg shadow-lg p-6 w-[300px]">
                                    <h2 className="text-lg font-semibold mb-4">Xác nhận Đăng xuất</h2>
                                    <p className="text-gray-600 mb-4">Bạn có chắc chắn muốn đăng xuất không?</p>
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={cancelLogout}
                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-300"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={confirmLogout}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderHS;
