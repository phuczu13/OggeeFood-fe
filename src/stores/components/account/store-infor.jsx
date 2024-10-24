import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function StoreInfo() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Bún đậu mắm nước',
    address: '74/18 Phan Văn Hớn',
    phone: '0799758402',
    email: 'phucpham21109@gmail.com',
    openingTime: '',
    closingTime: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo({
      ...storeInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Store Information:', storeInfo);
    toast.success('Lưu thành công', {
      duration: 2000, // Display duration for 2 seconds
    });
  };

  return (
    <div className="max-w-[800px] mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#ff7e00] mb-6 text-center">Thông tin cửa hàng</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-6">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Tên cửa hàng
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            type="text" 
            name="name" 
            value={storeInfo.name} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Địa chỉ
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="address" 
            type="text" 
            name="address" 
            value={storeInfo.address} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Số điện thoại cửa hàng
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="phone" 
            type="text" 
            name="phone" 
            value={storeInfo.phone} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email cửa hàng
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="email" 
            name="email" 
            value={storeInfo.email} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="openingTime">
            Thời gian mở cửa
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="openingTime" 
            type="time" 
            name="openingTime" 
            value={storeInfo.openingTime} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="closingTime">
            Thời gian đóng cửa
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="closingTime" 
            type="time" 
            name="closingTime" 
            value={storeInfo.closingTime} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="flex items-center justify-center">
          <button 
            className="bg-[#ff7e00] hover:bg-[#ef4b2c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
          >
            Lưu
          </button>
        </div>
      </form>

      <Toaster position="top-right" />
    </div>
  );
}

export default StoreInfo;
