import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function FormSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ thông tin');
        } else if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
        } else {
            setError('');

            try {
                const response = await axios.post('http://localhost:3002/api/user/register', {
                    name,
                    email,
                    password,
                    role: 'user', // Adjust role if necessary
                });

                if (response.data.success) {
                    // Navigate to OTP verification page
                    navigate('/verify-form', { state: { email } });
                }
            } catch (error) {
                setError('Đã có lỗi xảy ra, vui lòng thử lại.');
                console.error('Error during registration:', error);
            }
        }
    };

    return (
        <form className="px-4 sm:px-0" onSubmit={handleRegisterClick}>
            <h1 className="font-bold flex justify-center mb-8 text-[22px] sm:text-[24px]">Đăng Ký</h1>

            <div className="flex justify-center">
                <input
                    className="py-3 px-5 w-full sm:w-[400px] border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type="text"
                    placeholder="Nhập tên người dùng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

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
                <button
                    className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block"
                    type="submit"
                >
                    Đăng Ký
                </button>
            </div>
            <div className="flex justify-end text-[14px]">
                <div>Bạn đã có tài khoản? <Link to="/sign-in" className="text-[#ff7e00]">Đăng nhập</Link></div>
            </div>
        </form>
    );
}

export default FormSignUp;
