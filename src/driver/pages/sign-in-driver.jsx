import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import axios from 'axios'; // Import Axios
import IconLoginStore from '../../users/assets/svg/icon_loginstore.svg';
import IconLoginStoreWhite from '../../users/assets/svg/icon_loginstorewhite.svg';
import HeaderUser from "../header/header_user";

function LoginDriver() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [error, setError] = useState('');
    const [icon, setIcon] = useState(IconLoginStoreWhite);
    const navigate = useNavigate(); // Khởi tạo useNavigate

    const handleLoginClick = async (e) => {
        e.preventDefault(); // Ngăn điều hướng mặc định

        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }

        setError(''); // Xóa lỗi nếu đã nhập đầy đủ

        try {
            // Gửi yêu cầu đăng nhập
            const response = await axios.post('https://be-order-food.vercel.app/api/user/login', { email, password });
            if (response.data.success) {
                // Nếu thành công, điều hướng tới trang xác thực OTP
                navigate('/verify-login-form', { state: { email } });
            } else {
                setError(response.data.message); // Hiển thị thông báo lỗi
            }
        } catch (error) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            console.error('Error during login:', error);
        }
    };
    const handlePointerClick = (e) => {
        e.preventDefault(); 
        const token = localStorage.getItem('driver-token'); // Lấy token từ localStorage
        
        if (token) {
            // Nếu token tồn tại, chuyển hướng đến trang home-page
            window.location.href = '/order-driver';
        } else {
            // Nếu không có token, chuyển hướng đến trang xác thực
            // window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=673397680b536ec12230126c`;
            window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=673512cf8b450a678f26e7e2`;

        }
    };
    return (
        <div className='bg-[#f1f1f1] w-full h-screen pb-10'>
            <div>
                <HeaderUser />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-20 pb-1 pt-10 bg-white">
                    <div>
                        <h1 className="font-bold flex justify-center mb-2 text-[20px] sm:text-[24px]">Đăng Nhập</h1>
                        <p className="justify-center flex mb-8">Welcome Back!</p>
                        <div className="flex justify-center items-center mb-3 ">
                            <button
                                type="submit" // Thay đổi từ Link sang button để gửi yêu cầu
                                className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                                onClick={handlePointerClick}
                                >
                                Đăng Nhập Bằng Pointer
                            </button>
                        </div>
                        <div className="flex justify-center items-center mb-3 ">
                            <Link
                                to="/signin-store"
                                onMouseEnter={() => setIcon(IconLoginStore)}
                                onMouseLeave={() => setIcon(IconLoginStoreWhite)}
                                className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] text-center text-white py-3 px-10 mt-3 inline-block"
                            >
                                <div className="flex justify-center gap-5">
                                    <img src={icon} className="w-[25px] h-[25px]" alt="loginStore" />
                                    Đăng nhập dành cho cửa hàng
                                </div>
                            </Link>
                        </div>
                        <div className="flex justify-center items-center mb-3 ">
                            <Link
                                to="/sign-in"
                                onMouseEnter={() => setIcon(IconLoginStore)}
                                onMouseLeave={() => setIcon(IconLoginStoreWhite)}
                                className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] text-center text-white py-3 px-10 mt-3 inline-block"
                            >
                                <div className="flex justify-center gap-5">
                                    <img src={icon} className="w-[25px] h-[25px]" alt="loginStore" />
                                    Đăng nhập dành cho khách hàng
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Toaster position='top-right' /> */}
        </div>
    );
}

export default LoginDriver;
