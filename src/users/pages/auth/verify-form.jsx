import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to get passed state
import axios from 'axios';
import LogoFood from '../../assets/svg/icon_logoweb.svg';
import { ToastContainer, toast } from 'react-toastify';  // Thêm thư viện Toastify
import 'react-toastify/dist/ReactToastify.css';  // Thêm style Toastify


function VerifyForm() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To access the passed email
  const email = location.state?.email; // Get email from passed state

  const handleChange = (element, index) => {
    const value = element.value;
    if (!isNaN(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  // Hàm cho phép paste mã OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').split('').filter(char => !isNaN(char)).slice(0, 6);
    if (pasteData.length > 0) {
      const newOtp = [...otp];
      pasteData.forEach((char, i) => {
        if (i < newOtp.length) {
          newOtp[i] = char;
        }
      });
      setOtp(newOtp);

      // Sau khi paste, nhảy đến ô cuối cùng
      const lastFilledIndex = pasteData.length - 1; // Lấy chỉ số của ô cuối cùng sau khi paste
      const lastInput = document.querySelectorAll('input[name="otp"]')[lastFilledIndex];
      if (lastInput) {
        lastInput.focus(); // Đưa focus vào ô cuối cùng
      }
    }
  };

  // Hàm xử lý sự kiện xóa (Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      // Nếu ô hiện tại có giá trị, xóa giá trị của nó
      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Nếu ô hiện tại trống và không phải là ô đầu tiên, focus về ô trước đó
        const prevInput = e.target.previousSibling;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsLoading(true);
      try {
        const response = await axios.post('https://be-order-food.vercel.app/api/user/verify-otp', { email, otp: otpCode });

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
            <div className='flex gap-2' onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  className='bg-slate-50 focus:outline-none focus:border-[#ff7e00] text-[#ff7e00] focus:border-2 rounded-md w-12 h-12 text-[32px] text-center'
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
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
      <ToastContainer position='top-right' />

      {/* CSS cho loading spinner */}
      <style>
        {`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #ff7e00;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default VerifyForm;
