import React, { useState } from 'react';
import HeaderHC3 from "../../components/homepage/headerHC3";
import Footer from "../../components/homepage/footer";
import { ToastContainer, toast } from 'react-toastify';  // Thêm thư viện Toastify
import 'react-toastify/dist/ReactToastify.css';  // Thêm style Toastify

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      storeId: 1,
      storeName: 'Bún Boà - Phúc Du',
      items: [
        { id: 1, name: 'Bún Boà Huế', price: 30000, quantity: 2, selected: false },
        { id: 2, name: 'Bún Boà Gân', price: 40000, quantity: 1, selected: false },
      ],
      allSelected: false,
    },
    {
      storeId: 2,
      storeName: 'Bánh Mì - Cô Tiên',
      items: [
        { id: 3, name: 'Bánh Mì Chả', price: 15000, quantity: 4, selected: false },
        { id: 4, name: 'Bánh Mì Thịt Nguội', price: 20000, quantity: 2, selected: false },
      ],
      allSelected: false,
    },
    {
      storeId: 3,
      storeName: 'Cháo Lòng - Ba Son',
      items: [
        { id: 5, name: 'Cháo Lòng Phèo', price: 25000, quantity: 2, selected: false },
        { id: 6, name: 'Tiết Canh Lòng Heo', price: 25000, quantity: 2, selected: false },
      ],
      allSelected: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý modal

  // Hàm thay đổi số lượng
  const handleQuantityChange = (storeId, itemId, action) => {
    setCartItems((prevItems) =>
      prevItems.map((store) =>
        store.storeId === storeId
          ? {
              ...store,
              items: store.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity:
                        action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                    }
                  : item
              ),
            }
          : store
      )
    );
  };

  // Hàm chọn/bỏ chọn một món
  const handleSelectItem = (storeId, itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((store) =>
        store.storeId === storeId
          ? {
              ...store,
              items: store.items.map((item) =>
                item.id === itemId
                  ? { ...item, selected: !item.selected }
                  : item
              ),
            }
          : store
      )
    );
  };

  // Hàm chọn/bỏ chọn tất cả món
  const handleSelectAllItems = () => {
    setCartItems((prevItems) =>
      prevItems.map((store) => ({
        ...store,
        allSelected: !store.allSelected,
        items: store.items.map((item) => ({ ...item, selected: !store.allSelected })),
      }))
    );
  };

  // Hàm xóa các món đã chọn
  const handleDeleteSelected = () => {
    const hasSelectedItems = cartItems.some((store) =>
      store.items.some((item) => item.selected)
    );

    if (!hasSelectedItems) {
      toast.error('Bạn hãy chọn món để xóa');
      return;
    }

    setIsModalOpen(true);  // Mở modal xác nhận xóa
  };

  // Hàm xác nhận xóa trong modal
  const confirmDelete = () => {
    setCartItems((prevItems) =>
      prevItems.map((store) => ({
        ...store,
        items: store.items.filter((item) => !item.selected),
      }))
    );
    setIsModalOpen(false);  // Đóng modal sau khi xóa
    toast.success('Đã xóa thành công');
  };

  // Tính tổng số món và tổng tiền cho các món được chọn
  const totalItems = cartItems.reduce(
    (total, store) =>
      total +
      store.items.reduce((storeTotal, item) => (item.selected ? storeTotal + item.quantity : storeTotal), 0),
    0
  );
  const totalPrice = cartItems.reduce(
    (total, store) =>
      total +
      store.items.reduce((storeTotal, item) => (item.selected ? storeTotal + item.price * item.quantity : 0), 0),
    0
  );

  // Điều kiện khi giỏ hàng trống
  const isCartEmpty = cartItems.every((store) => store.items.length === 0);

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <HeaderHC3 />
      </div>
      <div className="flex-1 w-full max-w-[1200px] mx-auto mt-10">
        <ToastContainer />
        
        {/* Modal xác nhận xóa */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa các món đã chọn?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 bg-gray-200 py-2 px-4 rounded"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Giỏ hàng */}
        {isCartEmpty ? (
          <div className="text-center mt-10">
            <p className="text-2xl font-semibold mb-4">Giỏ hàng của bạn còn trống</p>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-[#ff7e00] text-white py-2 px-4 rounded hover:bg-[#ef4b2c] hover:outline-none"
            >
              Lựa món ngay
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="text-xl font-bold mb-4">Giỏ hàng</div>

            {cartItems.map((store) => (
              <div key={store.storeId} className="mt-5 p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="font-semibold text-lg mb-2">{store.storeName}</div>
                {store.items.map((item) => (
                  <div key={item.id} className="border-b py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={item.selected}
                        onChange={() => handleSelectItem(store.storeId, item.id)}
                      />
                      <div>
                        <div className="font-semibold">Tên món: {item.name}</div>
                        <div className="text-gray-500">Mặc định</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold">{item.price.toLocaleString()} VND</div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleQuantityChange(store.storeId, item.id, 'decrease')}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(store.storeId, item.id, 'increase')}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Thanh Tổng món & Tổng tiền */}
      {!isCartEmpty && (
        <div className="sticky bottom-0 w-full bg-white border-t shadow-lg p-4 flex justify-between items-center max-w-[1200px] mx-auto">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className="mr-2"
              onChange={handleSelectAllItems}
            />
            <span>Chọn tất cả các món</span>
          </div>
          <button
            onClick={handleDeleteSelected}
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
      )}

      <Footer />
    </div>
  );
}

export default Cart;
