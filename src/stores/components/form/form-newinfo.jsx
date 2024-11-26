import React, { useState, useEffect, useRef } from "react";
import IconDropDownBlack from '../../assets/svg/icon_dropdownBlack.svg';
import { Link, useNavigate,useLocation } from "react-router-dom";



function FormNewInfo() {
    const [storeName, setStoreName] = useState('');
    const [ownerName, setOwnerName] = useState(''); // You don't use this variable in the form
    const [imageUrl, setImageUrl] = useState(''); // This will map to avatar
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(''); // This will map to storeAddress
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation();
    const storeId = location.state?.storeId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the API call
    const storeData = {
      storeId, // Include the storeId
      storeName,
      avatar: imageUrl, // Change to match API
      phoneNumber: phone, // Change to match API
      storeAddress: address, // Change to match API
      openingTime,
      closingTime,
    };

    try {
      const response = await fetch(`https://be-order-food.vercel.app/api/store/update-store-info/${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });

      if (response.ok) {
        setSuccess('Cập nhật thông tin thành công!');
        setError('');
        navigate('/home-store',{state :{storeId} });
      } else {
        const errorData = await response.json();
        setError(`Cập nhật thất bại: ${errorData.message}`);
        setSuccess('');
      }
    } catch (err) {
      setError(`Có lỗi xảy ra: ${err.message}`);
      setSuccess('');
    }
  };

    return(
        <div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 sm:p-14 rounded-md shadow-lg w-full max-w-[600px]"
                >
                <h2 className="text-2xl font-bold mb-14 text-center">Nhập thông tin cho cửa hàng mới</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Tên cửa hàng</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              placeholder="Nhập tên cửa hàng"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh đại diện</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              placeholder="Nhập URL hình ảnh (Tùy chọn)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              placeholder="Nhập số điện thoại"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ cửa hàng</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              placeholder="Nhập địa chỉ cửa hàng"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giờ mở cửa</label>
            <input
              type="time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giờ đóng cửa</label>
            <input
              type="time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Error or Success message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        {/* Nút Lưu */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-10 py-2.5 bg-[#ff7c00] text-white rounded-full hover:bg-[#ff3c3c] focus:outline-none"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormNewInfo;
