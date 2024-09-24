import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom


function FormSignUpStore() {
    // State để lưu email, mật khẩu, nhập lại mật khẩu và thông báo lỗi
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State cho Nhập lại mật khẩu
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State để điều khiển hiển thị mật khẩu

    // Xử lý khi nhấn nút Đăng ký
    const handleLoginClick = (e) => {
        if (!email || !password || !confirmPassword) {
            e.preventDefault(); // Ngăn điều hướng nếu chưa nhập đủ thông tin
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
        } else if (password !== confirmPassword) {
            e.preventDefault(); // Ngăn điều hướng nếu mật khẩu không khớp
            setError('Mật khẩu không khớp');
        } else {
            setError(''); // Xóa lỗi nếu đã nhập đầy đủ và mật khẩu khớp
            // Chuyển hướng sang trang "Home" sẽ được thực hiện bởi <Link>
        }
    };

    return (
        <form className="">
            <h1 className="font-bold flex justify-center mb-8">Đăng ký dành cho cửa hàng</h1>
            
            <div>
                <input
                    className="py-3 px-5 w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none focus:border"
                    type="email"
                    placeholder="Nhập tài khoản Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>   
                <input
                    className="py-3 px-5 w-full mb-4 border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none focus:border"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>   
                <input
                    className="py-3 px-5 w-full border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none focus:border"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {/* Checkbox để hiển thị mật khẩu */}
            <div className="mb-4 mt-2">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)} // Toggle state showPassword
                    />
                    <span className="ml-2">Hiển thị mật khẩu</span>
                </label>
            </div>

            {/* Hiển thị thông báo lỗi */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="mt-10 flex justify-center mb-3 ">
                <Link
                    to="/home-page" // Điều hướng đến trang home
                    className=" hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    onClick={handleLoginClick}
                >
                    Đăng Ký
                </Link>
            </div>
            <div className='flex justify-end text-[14px]'>
                <div>Bạn đã có tài khoản cửa hàng? <Link to='/signin-store' className="text-[#ff7e00]">Đăng nhập</Link></div>
            </div>
        </form>
    );
}

export default FormSignUpStore;