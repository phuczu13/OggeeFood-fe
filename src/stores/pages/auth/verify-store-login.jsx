import React, { useState } from 'react';
import LogoStore from '../../assets/svg/icon_logoStore.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function VerifyStoreLogin() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const email = location.state?.email; // Get email from location state
  const storeId = location.state?.storeId;
  

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
        const response = await fetch('http://localhost:3002/api/store/verify-login-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: otpCode }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success("Xác minh thành công");
  
          // Chuyển hướng đến trang home-store kèm theo storeId
          navigate('/home-store', { state: { storeId } });
        } else {
          toast.error(data.message || "Mã OTP không hợp lệ");
        }
      } catch (error) {
        toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
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
            <img src={LogoStore} className='w-[222px]' alt="logoStore" />
          </div>
          <h1 className='font-bold text-[26px] mt-10'>Yêu cầu xác thực</h1>
          <p className='font-medium mt-3'>Vui lòng nhập mã mà chúng tôi đã</p>
          <h2 className='font-medium'>gửi tới <span className='text-[#ff7e00] font-semibold'>{email}</span></h2>
          <div className='mt-10'>
            <div className='flex gap-2'>
              {otp.map((data, index) => (
                <input
                  key={index}
                  className='bg-slate-50 focus:outline-none focus:border-[#ff7e00] text-[#ff7e00] focus:border-2 rounded-md w-12 h-12 text-[32px] text-center'
                  type="text"
                  name="otp"
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
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? (
                <div className='flex justify-center items-center'>
                  <div className="loader"></div>
                  <span className="ml-2">Bạn chờ chút nhé</span>
                </div>
              ) : (
                <span>Tiếp tục</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster position='top-right' />
    </div>
  );
}

export default VerifyStoreLogin;
