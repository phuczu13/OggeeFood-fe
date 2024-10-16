import React, { useState } from 'react';
import toast from 'react-hot-toast';

function Payment() {
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Payment');

  const handleSubmit = () => {
    toast.success('Đặt hàng thành công');
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-xl font-bold mb-4">Thanh toán</div>

      {/* Estimated Delivery Time */}
      <div className="mb-4">
        <div className="font-semibold">Giao đến</div>
        <div>Thời gian giao dự kiến: <span className="font-bold">25 phút</span></div>

        {/* Address Inputs */}
        <div className="mt-2">
          <label className="block font-semibold">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ của bạn"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mt-2">
          <label className="block font-semibold">Chi tiết địa chỉ</label>
          <input
            type="text"
            value={addressDetails}
            onChange={(e) => setAddressDetails(e.target.value)}
            placeholder="Giúp tài xế tìm bạn dễ dàng hơn"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mt-2">
          <label className="block font-semibold">Số điện thoại nhận hàng</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Nhập số điện thoại"
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-4">
        <div className="font-semibold">Tóm tắt đơn hàng</div>
        <div className="mt-2">
          <div className="flex justify-between items-center border-b pb-2">
            <div>2 x Tên món: Node (Nhiều trà, ít đá)</div>
            <div>200.000 VND</div>
          </div>
          <div className="flex justify-between items-center border-b pb-2 mt-2">
            <div>1 x Tên món: Node (Nhiều trà, ít đá)</div>
            <div>100.000 VND</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Tổng số món</div>
            <div>3</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Tổng số tiền</div>
            <div>300.000 VND</div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-4">
        <div className="font-semibold">Chi tiết thanh toán</div>
        <div className="mt-2">
          <div className="flex justify-between">
            <div>Tổng tiền món</div>
            <div>300.000 VND</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>Chi phí vận chuyển</div>
            <div>20.000 VND</div>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <div>Tổng thanh toán</div>
            <div>320.000 VND</div>
          </div>
        </div>
      </div>

      {/* Payment Method and Submit Button */}
      <div className="mb-4">
        <label className="block font-semibold">Phương thức thanh toán</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="Payment">Payment</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-orange-500 text-white py-2 px-4 rounded w-full"
      >
        Thanh toán ngay
      </button>
    </div>
  );
}

export default Payment;
