import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

function StoreInfo() {
  const location = useLocation();
  const storeId = location.state?.storeId;

  // Initialize state
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    openingTime: '',
    closingTime: ''
  });

  // Function to convert time from 12-hour format to 24-hour format
  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  };

  useEffect(() => {
    const fetchStoreInfo = async () => {
      console.log("Fetching store info for ID:", storeId); // Log storeId
      if (!storeId) {
        toast.error("Store ID is missing"); // Notify if storeId is missing
        return;
      }

      try {
        const response = await fetch(`http://localhost:3002/api/store/getInforStore/${storeId}`);
        if (!response.ok) {
          throw new Error('Could not fetch store information');
        }
        const data = await response.json();
        console.log("Fetched store data:", data); // Log the fetched data

        // Check if data has the expected fields
        if (data && data.status === 'OK' && data.data) {
          const storeData = data.data; // Assuming the data is inside a 'data' property
          setStoreInfo({
            name: storeData.storeName || '',
            address: storeData.storeAddress || '',
            phone: storeData.phoneNumber || '',
            email: storeData.email || '',
            // Convert times to 24-hour format if necessary
            openingTime: convertTo24HourFormat(storeData.openingTime) || '',
            closingTime: convertTo24HourFormat(storeData.closingTime) || ''
          });
        } else {
          throw new Error('Invalid data format');
        }

        // Log the updated storeInfo state
        console.log("Updated storeInfo state:", storeInfo);
      } catch (error) {
        console.error("Error fetching store information:", error);
        toast.error(error.message);
      }
    };

    fetchStoreInfo();
  }, [storeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prevStoreInfo) => ({
      ...prevStoreInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert times to 24-hour format before sending to server
      const storeDataToUpdate = {
        ...storeInfo,
        openingTime: storeInfo.openingTime, // Assuming the time is already in 24-hour format
        closingTime: storeInfo.closingTime  // Assuming the time is already in 24-hour format
      };

      const response = await fetch(`http://localhost:3002/api/store/updatestore/${storeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(storeDataToUpdate)
      });

      if (!response.ok) {
        throw new Error('Could not update store information');
      }

      toast.success('Lưu thành công', {
        duration: 2000, // Display duration for 2 seconds
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-bold text-[#ff7e00] mb-6">Thông tin cửa hàng</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
