import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import axios from 'axios'; // Import Axios
import IconLoginStore from '../../assets/svg/icon_loginstore.svg';
import IconLoginStoreWhite from '../../assets/svg/icon_loginstorewhite.svg';

function FormSignIn() {
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
    const handlePointerClick = async (e) =>{
        e.preventDefault(); 
        const token = localStorage.getItem('token'); // Assume token is stored in localStorage
        if (!token) {
            window.location.href = `https://sso-pointer.vercel.app/authorize?clientId=672d85ad134d92f3b3c6397b`;
        }
    }
    return (
        <div>
            <form className="px-4 sm:px-0" onSubmit={handleLoginClick}>
                <h1 className="font-bold flex justify-center mb-8 text-[20px] sm:text-[24px]">Đăng Nhập</h1>
                
                {/* Input Email */}
                <div className="flex justify-center">
                    <input
                        className="py-3 px-5 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="email"
                        placeholder="Tài khoản Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                {/* Input Mật khẩu */}
                <div className="flex justify-center">   
                    <input
                        className="py-3 px-5 w-full sm:w-[400px] border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Hiển thị thông báo lỗi */}
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

                <div className="mt-10 flex justify-center mb-3 ">
                    <button
                        type="submit" // Thay đổi từ Link sang button để gửi yêu cầu
                        className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    >
                        Đăng Nhập
                    </button>
                </div>
                <div className="flex justify-end text-[14px]">
                    <div>Bạn chưa có tài khoản? <Link to="/sign-up" className="text-[#ff7e00]">Đăng ký</Link></div>
                </div>
            </form>
            <div className="border-b my-5"></div>
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
                <button
                    type="submit" // Thay đổi từ Link sang button để gửi yêu cầu
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    >
                        <a href="https://sso-pointer.vercel.app/authorize?clientId=672d9324632babe6da65eba1">
                            Đăng Nhập Bằng Pointer
                        </a>
                </button>
            </div>
        </div>
    );
}

export default FormSignIn;
