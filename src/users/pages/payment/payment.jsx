import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import HeaderHC3 from '../../components/homepage/headerHC3';
import Footer from '../../components/homepage/footer';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link, useNavigate } from 'react-router-dom';

function Payment() {
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Payment');
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order items from local storage
    const items = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setOrderItems(items);
  }, []);
  const handleSubmit = () => {
    // Display success message
    toast.success('Đặt hàng thành công');

    // Clear order items from local storage
    localStorage.removeItem('selectedItems');

    // Navigate to a different page or refresh the current page if needed
    // navigate('/somewhere'); // Uncomment this line if you want to redirect after payment
  };
  const handleBack = () =>{
    localStorage.removeItem('selectedItems');
    navigate('/cart');
  }
  // Calculate total price with quantity
  const totalPrice = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="">
      <ToastContainer />
      <HeaderHC3 />
      <div className='sm:px-0 px-3'>
        <div className='relative py-6 max-w-[800px] mx-auto border px-5 my-10 rounded-md shadow-md'>
          <button
            className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] top-0 left-[-50px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'
            onClick={handleBack}
          >
            <img className='w-2 mt-1.5' src={IconBack} alt="btnBack" />
          </button>
          <div className="text-2xl font-bold mb-4 text-[#ff7e00] text-center">Thanh toán</div>

          <div className="mb-4">
            <div className="font-semibold">Giao đến</div>
            <div>Thời gian giao dự kiến: <span className="font-bold">25 phút</span></div>

            <div className="mt-2">
              <label className="block font-semibold">Địa chỉ</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ của bạn"
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
            <div className="mt-2">
              <label className="block font-semibold">Chi tiết địa chỉ</label>
              <input
                type="text"
                value={addressDetails}
                onChange={(e) => setAddressDetails(e.target.value)}
                placeholder="Giúp tài xế tìm bạn dễ dàng hơn"
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
            <div className="mt-2">
              <label className="block font-semibold">Số điện thoại nhận hàng</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại"
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="font-semibold">Tóm tắt đơn hàng</div>
            <div className="mt-2">
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2 mt-2">
                  <img className="w-20 h-20 object-cover" src={item.imageUrl} alt="product" />
                  <div>
                    <div>{item.quantity} x {item.name}</div>
                    <div className="text-gray-500">{item.description}</div>                                         
                  </div>
                  <div>{(item.price * item.quantity).toLocaleString()} VND</div>
                </div>
              ))}
              <div className="flex justify-between mt-2">
                <div>Tổng số món</div>
                <div>{orderItems.reduce((total, item) => total + item.quantity, 0)}</div>
              </div>
              <div className="flex justify-between mt-2">
                <div>Tổng số tiền</div>
                <div>{totalPrice.toLocaleString()} VND</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="font-semibold">Chi tiết thanh toán</div>
            <div className="mt-2">
              <div className="flex justify-between">
                <div>Tổng tiền món</div>
                <div>{totalPrice.toLocaleString()} VND</div>
              </div>
              <div className="flex justify-between mt-2">
                <div>Chi phí vận chuyển</div>
                <div>20.000 VND</div>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <div>Tổng thanh toán</div>
                <div>{(totalPrice + 20000).toLocaleString()} VND</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Phương thức thanh toán</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00] cursor-pointer"
            >
              <option value="Payment">Chọn phương thức thanh toán</option>
              <option value="COD">COD</option>
              <option value="Pointer">Pointer</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white py-2 px-4 rounded w-full"
          >
            Thanh toán ngay
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
