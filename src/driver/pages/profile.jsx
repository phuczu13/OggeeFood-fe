import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoWeb from '../../driver/assets/OggeeDriver.png'
import User from '../../driver/assets/User.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProfileDriver() {
  const [isOpen, setIsOpen] = useState(false);
  const [driverInfo, setDriverInfo] = useState(null);
  useEffect(() => {
    const driverId = localStorage.getItem('driverId'); // Lấy driverId từ localStorage

    if (driverId) {
        // Gọi API để lấy thông tin tài xế
        fetch(`https://be-order-food.vercel.app/api/driver/get-driver/${driverId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching driver info');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'OK' && data.data) {
                    setDriverInfo(data.data); // Lưu thông tin tài xế vào state
                } else {
                    console.error('Driver data not found');
                }
            })
            .catch(error => {
                console.error('Error fetching driver info:', error);
                toast.error('Error fetching driver info');
            });
    }
}, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="px-4 sm:px-[150px] py-[15px] border-b bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex justify-between">
            <Link to="/order-driver">
              <img src={LogoWeb} className="w-[120px] sm:w-[200px] mb-2 sm:mb-0" alt="Logo Web" />
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center relative">
            <button
              className="flex items-center gap-2 text-white bg-[#ff7e00] hover:bg-[#ef4c2b] py-3 font-medium px-4 rounded-md"
              onClick={toggleDropdown}
            >
              <img className="w-[22px] h-[28px]" src={User} alt="User Icon" />
            </button>

            {isOpen && (
              <div className="absolute top-14 right-auto w-48 bg-white shadow-lg space-y-2 rounded-lg p-4 text-black">
                <p>{driverInfo.name}</p>
                <hr className="my-2" />
                <Link to="/profile-driver" className="block cursor-pointer hover:text-gray-700">Profile</Link>
                <Link to="/order-driver" className="block cursor-pointer hover:text-gray-700">Đơn hàng</Link>
                <Link to="/revenue-driver" className="block cursor-pointer hover:text-gray-700">Doanh thu</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-[50px] flex justify-center">
        <div className="rounded-[20px] shadow-2xl w-[668px] h-[701px] p-8 border border-gray-300">
          <div className="flex flex-col items-center">
            <div className="rounded-full border-[2px] w-[100px] h-[100px] flex items-center justify-center mb-4"></div>
            {/* <div className="text-center font-semibold text-lg mb-8">{driverInfo.email}</div> */}
            <h1>Yêu cầu thiết kế lại dùm</h1>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDriver;
