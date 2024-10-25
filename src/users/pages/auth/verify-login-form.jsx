import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to get passed state
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import LogoFood from '../../assets/svg/icon_logoweb.svg';

function VerifyLoginForm() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed email
  const email = location.state?.email; // Get email from passed state

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsLoading(true);
      try {
        const response = await axios.post('https://be-order-food.vercel.app/api/user/verify-login-otp', { email, otp: otpCode });

        if (response.data.success) {
          toast.success("Xác minh thành công");
          setTimeout(() => {
            setIsLoading(false);
            navigate('/home-page'); // Redirect to the home page after verification
          }, 1000);
        } else {
          toast.error(response.data.message || "Mã OTP không hợp lệ");
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại");
        setIsLoading(false);
        console.error('Error verifying OTP:', error);
      }
    } else {
      toast.error("Mã OTP không hợp lệ");
    }
  };

  return (
    <div className='flex justify-center mt-[120px]'>
      <div className='flex text-center shadow-lg'>
        <div className='p-20 w-fit '>
          <div className='flex justify-center'>
            <img src={LogoFood} alt="logoFood" />
          </div>
          <h1 className='font-bold text-[26px] mt-10'>Yêu cầu xác thực</h1>
          <p className='font-medium mt-3'>Vui lòng nhập mã mà chúng tôi đã</p>
          <h2 className='font-medium'>gửi tới <span className='text-[#ff7e00] font-semibold'>{email}.</span></h2>
          <div className='mt-10'>
            <div className='flex gap-2'>
              {otp.map((data, index) => (
                <input
                  key={index}
                  className='bg-slate-50 focus:outline-none focus:border-[#ff7e00] text-[#ff7e00] focus:border-2 rounded-md w-12 h-12 text-[32px] text-center'
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                />
              ))}
            </div>
          </div>
          <div className='mt-20'>
            <button
              onClick={handleSubmit}
              className='bg-[#ff7e00] px-10 py-3 text-white rounded-full font-medium hover:bg-[#ef4b2c]'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex justify-center items-center'>
                  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                  <p>Đang xử lý...</p>
                </div>
              ) : (
                "Tiếp tục"
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default VerifyLoginForm;
