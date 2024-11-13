import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import IconLoginUser from '../../assets/svg/icon_loginuser.svg';
import IconLoginUserOrange from '../../assets/svg/icon_loginuser_Orange.svg';

function FormSignInStore() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [icon, setIcon] = useState(IconLoginUser);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginClick = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const storedToken = localStorage.getItem('authToken');
        const storeId = localStorage.getItem('storeId');
        if (storedToken) {
            navigate('/home-store',{ state: { storeId } }); // Nếu có token, điều hướng trực tiếp đến trang cửa hàng
            return; // Ngăn không thực hiện các bước tiếp theo
        }

        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        }
    
        setError('');
        console.log("Data sent:", { email, password });
    
        // Call login API
        try {
            const response = await fetch('https://be-order-food.vercel.app/api/store/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log("Response from API:", data); // Log phản hồi để kiểm tra
    
            if (response.ok && data.success) {
                // Điều hướng đến trang OTP với email và storeId
                const storeId = data.storeId;
                navigate('/verify-store', { state: { email, storeId } });
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error("Lỗi xảy ra:", error); // Log chi tiết lỗi
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };
    
    

    return (
        <div className="px-4 sm:px-10 mb-10 py-[15px]">
            <form onSubmit={handleLoginClick}>
                <h1 className="font-bold flex justify-center mb-8 text-center text-base sm:text-lg">
                    Đăng nhập dành cho cửa hàng
                </h1>
                
                {/* Input Email */}
                <div>
                    <input
                        className="py-3 px-4 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="email"
                        placeholder="Tài khoản Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                {/* Input Mật khẩu */}
                <div>   
                    <input
                        className="py-3 px-4 w-full border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Hiển thị thông báo lỗi */}
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

                <div className="mt-10 flex justify-center mb-3">
                    <button
                        type="submit" // Change to button for form submission
                        className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    >
                        Đăng Nhập
                    </button>
                </div>

                <div className="flex justify-end text-[12px] sm:text-[14px]">
                    <div>Bạn chưa có tài khoản cửa hàng? 
                        <Link to='/signup-store' className="text-[#ff7e00]"> Đăng ký</Link>
                    </div>
                </div>
            </form>

            <div className="border-b my-5"></div>

            <div className="flex justify-center items-center mb-3">
                <Link
                    to="/sign-in"
                    onMouseEnter={() => setIcon(IconLoginUserOrange)}
                    onMouseLeave={() => setIcon(IconLoginUser)}
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] text-center text-white py-3 px-10 mt-3 inline-block"
                >
                    <div className="flex justify-center gap-5">
                        <img src={icon} className="w-[20px] sm:w-[25px] h-[20px] sm:h-[25px]" alt="loginStore" />
                        Đăng nhập dành cho khách hàng
                    </div>
                </Link>
            </div>
            <div className="flex justify-center items-center mb-3">
                <Link
                    to="/signin-driver"
                    onMouseEnter={() => setIcon(IconLoginUserOrange)}
                    onMouseLeave={() => setIcon(IconLoginUser)}
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] text-center text-white py-3 px-10 mt-3 inline-block"
                >
                    <div className="flex justify-center gap-5">
                        <img src={icon} className="w-[20px] sm:w-[25px] h-[20px] sm:h-[25px]" alt="loginStore" />
                        Đăng nhập dành cho tài xế
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default FormSignInStore;
