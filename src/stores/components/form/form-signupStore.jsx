import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormSignUpStore() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginClick = (e) => {
        if (!email || !password || !confirmPassword) {
            e.preventDefault();
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
        } else if (password !== confirmPassword) {
            e.preventDefault();
            setError('Mật khẩu không khớp');
        } else {
            setError('');
        }
    };

    return (
        <form className="px-4 sm:px-10 mb-10 py-[15px]">
            <h1 className="font-bold flex justify-center mb-8 text-center text-base sm:text-lg">
                Đăng ký dành cho cửa hàng
            </h1>
            
            <div>
                <input
                    className="py-3 px-4 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type="email"
                    placeholder="Nhập tài khoản Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div>   
                <input
                    className="py-3 px-4 w-full border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>   
                <input
                    className="py-3 px-4 w-full border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="mb-4 mt-2">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="ml-2">Hiển thị mật khẩu</span>
                </label>
            </div>

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

            <div className="mt-10 flex justify-center mb-3">
                <Link
                    to="/verify-store"
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    onClick={handleLoginClick}
                >
                    Đăng Ký
                </Link>
            </div>

            <div className="flex justify-end text-[12px] sm:text-[14px]">
                <div>Bạn đã có tài khoản cửa hàng? 
                    <Link to='/signin-store' className="text-[#ff7e00]"> Đăng nhập</Link>
                </div>
            </div>
        </form>
    );
}

export default FormSignUpStore;
