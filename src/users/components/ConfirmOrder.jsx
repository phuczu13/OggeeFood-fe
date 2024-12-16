// components/ConfirmOrder.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeConfirmForm,
  decrementCountdown,
} from '../../redux/slices/confirmOrderSlice';

const ConfirmOrder = ({ onConfirm, deliveryInfo, grandTotal, paymentMethod }) => {
  const dispatch = useDispatch();
  const { isOpen, countdown } = useSelector((state) => state.confirmOrder);
  const [currentTime, setCurrentTime] = useState('');

  const totalTime = 15; // Tổng thời gian đếm ngược (ví dụ: 10s)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(timer); // Dọn dẹp interval khi component unmount
  }, []);
  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setInterval(() => {
        dispatch(decrementCountdown());
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      dispatch(closeConfirmForm());
    }
  }, [isOpen, countdown, dispatch]);

  if (!isOpen) return null;

  // Tính phần trăm vòng tròn đã hoàn thành
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((totalTime - countdown) / totalTime) * circumference;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center relative">
        <h2 className="text-lg font-bold">Xác nhận đặt đơn</h2>
        <p className="text-sm mt-2">Hãy kiểm tra thông tin lần nữa!</p>
        
        {/* Vòng tròn đếm ngược */}
        <div className="relative flex items-center justify-center w-32 h-32 mx-auto mt-4">
          <svg width="100" height="100" className="absolute">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="#f87171"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <span className="text-2xl font-bold absolute text-red-500">
            {countdown}s
          </span>
        </div>

        <div className="mt-6">
          <div className="mb-4 text-gray-700 text-sm">
            <p>{deliveryInfo.address}</p>
            <p className="mt-1">{deliveryInfo.name} | {deliveryInfo.phone}</p>
            <p className="mt-2">Hôm nay {currentTime}</p>
            <p className="font-semibold">{grandTotal.toLocaleString()} VND | {paymentMethod}</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => dispatch(closeConfirmForm())}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-1/2 mr-2"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded w-1/2 ml-2"
            >
              Đặt đơn ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
