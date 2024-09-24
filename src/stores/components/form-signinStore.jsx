import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import IconLoginUser from '../assets/svg/icon_loginuser.svg';
import IconLoginUserOrange from '../assets/svg/icon_loginuser_Orange.svg';


function FormSignInStore() {
    // State để lưu email, mật khẩu và thông báo lỗi
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [icon, setIcon] = useState(IconLoginUser);


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

    return(
        <div>
            <form className="">
                <h1 className="font-bold flex justify-center mb-8">Đăng nhập dành cho cửa hàng</h1>
                
                {/* Input Email */}
                <div>
                    <input
                        className="py-3 px-5 w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none focus:border"
                        type="email"
                        placeholder="Tài khoản Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                    />
                </div>
                
                {/* Input Mật khẩu */}
                <div>   
                    <input
                        className="py-3 px-5 w-full border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none focus:border"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Cập nhật state mật khẩu
                    />
                </div>

                {/* Hiển thị thông báo lỗi */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="mt-10 flex justify-center mb-3 ">
                    <Link
                        to="/home-store"
                        className=" hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                        onClick={handleLoginClick}
                    >
                        Đăng Nhập
                    </Link>
                </div>
                <div className='flex justify-end text-[14px]'>
                    <div>Bạn chưa có tài khoản cửa hàng? <Link to='/signup-store' className="text-[#ff7e00]">Đăng ký</Link></div>
                </div>
            </form>
            <div className="border-b border my-5"></div>
            <div className=" flex justify-center  items-center mb-3 ">
                <Link
                    to="/sign-in"
                    onMouseEnter={() => setIcon(IconLoginUserOrange)}
                    onMouseLeave={() => setIcon(IconLoginUser)}
                    className=" hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border-2 bg-[#ff7e00] w-full border border-[#ff7c00] text-center text-white py-3 px-10 mt-3 inline-block"
                >
                    <div className="flex justify-center gap-5">
                        <img src={icon} className="w-[25px] h-[25px]" alt="loginStore" />
                        Đăng nhập dành cho khách hàng
                    </div>
                </Link>
            </div>
        </div>
    )}

export default FormSignInStore; 