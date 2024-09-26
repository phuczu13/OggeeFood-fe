import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

function FormSignUp() {
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
        }
    };

    return (
        <form className="px-4 sm:px-0">
            <h1 className="font-bold flex justify-center mb-8 text-[24px] sm:text-[32px]">Đăng Ký</h1>
            
            <div className="flex justify-center">
                <input
                    className="py-3 px-5 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type="email"
                    placeholder="Nhập tài khoản Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="flex justify-center">   
                <input
                    className="py-3 px-5 w-full sm:w-[400px] mb-4 border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex justify-center">   
                <input
                    className="py-3 px-5 w-full sm:w-[400px] border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
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
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

            <div className="mt-10 flex justify-center mb-3">
                <Link
                    to="/home-page" // Điều hướng đến trang home
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    onClick={handleLoginClick}
                >
                    Đăng Ký
                </Link>
            </div>
            <div className="flex justify-end text-[14px]">
                <div>Bạn đã có tài khoản? <Link to="/sign-in" className="text-[#ff7e00]">Đăng nhập</Link></div>
            </div>
        </form>
    );
}

export default FormSignUp;
