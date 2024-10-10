import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import IconLoginStore from '../../assets/svg/icon_loginstore.svg';
import IconLoginStoreWhite from '../../assets/svg/icon_loginstorewhite.svg';

function FormSignIn() {
    // State để lưu email, mật khẩu và thông báo lỗi
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [icon, setIcon] = useState(IconLoginStoreWhite);

    // Xử lý khi nhấn nút Đăng nhập
    const handleLoginClick = (e) => {
        if (!email || !password) {
            e.preventDefault(); // Ngăn điều hướng nếu chưa nhập đủ thông tin
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
        } else {
            setError(''); // Xóa lỗi nếu đã nhập đầy đủ
            // Chuyển hướng sang trang "Home" sẽ được thực hiện bởi <Link>
        }
    };

    return (
        <div>
            <form className="px-4 sm:px-0">
                <h1 className="font-bold flex justify-center mb-8 text-[20px] sm:text-[24px]">Đăng Nhập</h1>
                
                {/* Input Email */}
                <div className="flex justify-center">
                    <input
                        className="py-3 px-5 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="email"
                        placeholder="Tài khoản Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                    />
                </div>
                
                {/* Input Mật khẩu */}
                <div className="flex justify-center">   
                    <input
                        className="py-3 px-5 w-full sm:w-[400px] border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Cập nhật state mật khẩu
                    />
                </div>

                {/* Hiển thị thông báo lỗi */}
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

                <div className="mt-10 flex justify-center mb-3 ">
                    <Link
                        to="/verify-form"
                        className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                        onClick={handleLoginClick}
                    >
                        Đăng Nhập
                    </Link>
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
        </div>
    );
}

export default FormSignIn;
