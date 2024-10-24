import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function FormSignUpStore() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // For showing loading status
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError('Vui lòng nhập đầy đủ email và mật khẩu');
            return;
        } else if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        setError('');
        setLoading(true); // Start loading

        try {
            // API call to register the store
            const response = await fetch('https://be-order-food.vercel.app/api/store/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            const storeId = data.storeId;
            
            if (response.ok && data.success) {
                // After successful registration, navigate to OTP verification page
                navigate('/verify-store-res', { state: { email,storeId } });
            } else {
                // Display error from the API
                setError(data.message || 'Đăng ký thất bại');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <form className="px-4 sm:px-10 mb-10 py-[15px]" onSubmit={handleLoginClick}>
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
                    required
                />
            </div>
            
            <div>   
                <input
                    className="py-3 px-4 w-full border mb-4 hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div>   
                <input
                    className="py-3 px-4 w-full border hover:border-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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
                    type="submit"
                    className={`hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full sm:w-[400px] border border-[#ff7c00] rounded-full text-center text-white py-3 px-10 mt-3 inline-block ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                </button>
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
