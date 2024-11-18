import VietNam from '../../assets/png/imageAvatar.png';
import LogoWeb from '../../assets/svg/icon_logoweb.svg';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function HeaderHP() {
    const [userData, setUserData] = useState(null); 

    const userId = localStorage.getItem('userId');
    // Gọi API lấy thông tin người dùng
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get(`https://be-order-food.vercel.app/api/user/inforUser/${userId}`); // API lấy thông tin user bằng userId
          console.log(response)
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user info', error);
        }
      };
  
      if (userId) {
        fetchUserInfo();
      }
    }, [userId]);

    return (
        <div className="px-4 sm:px-[150px] mb-6 sm:mb-10 py-4 sm:py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoWeb} alt="Logo Web" className="w-24 sm:w-auto" /> 
                <div className="flex gap-2 sm:gap-4 items-center">
                    <span className="text-[#ff7e00] text-sm sm:text-base font-bold">Chào khách hàng Oggee</span> 
                    <img className="w-10 sm:w-[50px] h-10 sm:h-[50px] border rounded-full" src='https://i.pinimg.com/736x/cf/34/23/cf3423911ad1d5852e34c9312b87c277.jpg' alt="Việt Nam" /> 
                </div>
            </div>
        </div>
    );
}

export default HeaderHP;
    