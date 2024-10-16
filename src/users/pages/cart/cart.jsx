import React, { useState } from 'react';
import HeaderHC3 from "../../components/homepage/headerHC3";


function Cart() {
  // State cho giỏ hàng
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Node', price: 200000, quantity: 2 },
  ]);

  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <div>
        <HeaderHC3 />
      </div>
      <div className="max-w-[1200px] mx-auto p-4">
        {/* Giỏ hàng */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-20">
          <div className="text-xl font-bold mb-4">Giỏ hàng</div>
          {cartItems.map((item) => (
            <div key={item.id} className="border-b py-4 flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="mr-4" />
                <div>
                  <div className="font-semibold">Tên món: {item.name}</div>
                  <div className="text-gray-500">Mặc định</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-lg font-semibold">{item.price.toLocaleString()} VND</div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleQuantityChange(item.id, 'decrease')}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 'increase')}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thanh Tổng món & Tổng tiền */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-between items-center max-w-[1200px] mx-auto">
          <button
            onClick={() => alert('Deleted')}
            className="bg-transparent border border-orange-500 text-orange-500 py-2 px-4 rounded"
          >
            Xóa
          </button>
          <div className="text-lg">
            <span className="font-semibold">Tổng số món: </span>
            <span className="text-orange-500">{totalItems}</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold">Tổng tiền: </span>
            <span className="text-orange-500">{totalPrice.toLocaleString()} VND</span>
          </div>
          <button
            onClick={() => alert('Đặt ngay')}
            className="bg-orange-500 text-white py-2 px-4 rounded flex items-center"
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
