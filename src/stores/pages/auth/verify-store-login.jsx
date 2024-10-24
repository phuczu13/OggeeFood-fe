
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
;import LogoStore from '../../assets/svg/icon_logoStore.svg';
import { ToastContainer, toast } from 'react-toastify';  // Thêm thư viện Toastify
import 'react-toastify/dist/ReactToastify.css';  // Thêm style Toastify

function VerifyStoreLogin() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const email = location.state?.email; // Get email from location state
  const storeId = location.state?.storeId;
  

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
        const response = await fetch('https://be-order-food.vercel.app/api/store/verify-login-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: otpCode }),
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('storeId', storeId)
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
      // setIsLoading(true); 
      // toast.success("Xác minh thành công");

      // setTimeout(() => {
      //   setIsLoading(false); // 
      //   navigate('/infor-newstore');
      // }, 3000); 
    } else {
      toast.error("Mã OTP không hợp lệ");
    }
  };
  

  return (
    <div className='flex justify-center mt-[120px]'>
      <div className='flex text-center shadow-lg'>
        <div className='p-20 w-fit '>
          <div className='flex justify-center'>
            <img className='max-w-[190px] max-h-[46px]' src={LogoStore} alt="logoFood" />
          </div>
          <h1 className='font-bold text-[26px] mt-10'>Yêu cầu xác thực</h1>
          <p className='font-medium mt-3'>Vui lòng nhập mã mà chúng tôi đã</p>
          <h2 className='font-medium'>gửi tới <span className='text-[#ff7e00] font-semibold'>{email}</span></h2>
          <div className='mt-10'>
            <div className='flex gap-2' onPaste={handlePaste}>
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </div>
          <div className='mt-20'>
            <button
              onClick={handleSubmit}
              className='bg-[#ff7e00] px-10 py-3 text-white rounded-full font-medium hover:bg-[#ef4b2c]'
              disabled={isLoading} // 
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
      <ToastContainer position='top-right' />

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

export default VerifyStoreLogin;
