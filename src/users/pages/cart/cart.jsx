import React, { useState } from 'react';
import HeaderHC3 from "../../components/homepage/headerHC3";
import Footer from "../../components/homepage/footer";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import IconMinus from '../../assets/svg/icon_minus.svg'
import IconPlus from '../../assets/svg/icon_plusOrange.svg'
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      storeId: 101,
      storeName: 'Bún Boà - Phúc Du',
      items: [
        { id: 101, name: 'Bún Boà Quế', describe: 'Thịt tái', price: 30000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 3, selected: false },
        { id: 102, name: 'Bún Boà Quế', describe: 'Thịt nạm', price: 30000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 2, selected: false },
        { id: 103, name: 'Bún Boà Quế', describe: 'Gàu, gân', price: 35000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 5, selected: false },   
      ],
      allSelected: false,
    },

    {
      storeId: 201,
      storeName: 'Bún Boà - Phúc Du',
      items: [
        { id: 22, name: 'Bún Boà Quế', describe: 'Thịt tái', price: 30000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 1, selected: false },
        { id: 23, name: 'Bún Boà Quế', describe: 'Thịt nạm', price: 30000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 1, selected: false },
        { id: 24, name: 'Bún Boà Quế', describe: 'Gàu, gân', price: 35000, image: 'https://i.pinimg.com/736x/65/66/47/656647345744b84f16fa44e21f754953.jpg', quantity: 1, selected: false },   
      ],
      allSelected: false,
    },

  ]);

  const [isModalOpen, setIsModalOpen  ] = useState(false); 

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

  const handleSelectAllItemsO1S = (storeId, isSelected) => {
    setCartItems((prevCartItems) => 
      prevCartItems.map((store) => {
        if (store.storeId === storeId) {
          return {
            ...store,
            items: store.items.map((item) => ({
              ...item,
              selected: isSelected,
            })),
          };
        }
        return store;
      })
    );
  };
  
  const handleSelectAllItems = () => {
    setCartItems((prevItems) =>
      prevItems.map((store) => ({
        ...store,
        allSelected: !store.allSelected,
        items: store.items.map((item) => ({ ...item, selected: !store.allSelected })),
      }))
    );
  };

  const handleDeleteSelected = () => {
    const hasSelectedItems = cartItems.some((store) =>
      store.items.some((item) => item.selected)
    );

    if (!hasSelectedItems) {
      toast.error('Bạn hãy chọn món để xóa');
      return;
    }

    setIsModalOpen(true);  
  };

  const confirmDelete = () => {
    setCartItems((prevItems) =>
      prevItems.map((store) => ({
        ...store,
        items: store.items.filter((item) => !item.selected),
      }))
    );
    setIsModalOpen(false); 
    toast.success('Đã xóa thành công');
  };

  // Tính tổng số lượng của các món đã chọn
  const totalItems = cartItems.reduce(
    (total, store) =>
      total +
      store.items.reduce((storeTotal, item) => item.selected ? storeTotal + item.quantity : storeTotal, 0),
    0
  );

  // Tính tổng tiền của các món đã chọn
  const totalPrice = cartItems.reduce(
    (total, store) =>
      total +
      store.items.reduce((storeTotal, item) => item.selected ? storeTotal + (item.price * item.quantity) : storeTotal, 0),
    0
  );


  const isCartEmpty = cartItems.every((store) => store.items.length === 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <div>
        <HeaderHC3 />
      </div>
      <div className="flex-1 w-full max-w-[1200px] mx-auto mt-10">
        <ToastContainer />
        
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
          <div className="">
            <div className="text-xl font-bold mb-4 text-[#ff7e00]">Sản phẩm</div>

            {cartItems.map((store) => (
              <div key={store.storeId} className="mt-5 border shadow-sm bg-white">
                <div className='flex gap-2 justify-between items-center text-center w-full border-b p-4'>
                  <div className='flex flex-row items-center'>
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4"
                      checked={store.items.every(item => item.selected)}
                      onChange={(e) => handleSelectAllItemsO1S(store.storeId, e.target.checked)}
                    />
                    <div className='bg-[#ff7e00] px-2 text-white'>
                      Nổi bật
                    </div>
                    <div className="font-semibold text-lg ml-3">{store.storeName}</div>
                  </div>
                  <div className='flex mr-10 font-semibold justify-center'>
                    <div className='w-[110px]'>Số Lượng</div>
                    <div className='w-[175px]'>Số Tiền</div>
                    <div className='w-[75px]'>Thao Tác</div>
                  </div>
                </div>
                {store.items.map((item) => (
                  <div key={item.id} className="border-b py-4 pr-4 flex items-center justify-between">
                    <div className="flex items-center p-4">
                      <input
                        type="checkbox"
                        className="mr-5 h-4 w-4"
                        checked={item.selected}
                        onChange={() => handleSelectItem(store.storeId, item.id)}
                      />
                      <div className='flex gap-5 items-center'>
                        <div>
                          <img className='w-20 h-20 object-cover' src={item.image} alt="imageProduct" />
                        </div>
                        <div>
                          <div className="font-semibold">Tên món: {item.name}</div>
                          <div className="text-gray-500">Mô tả: {item.describe}</div>
                        </div>  
                      </div>
                    </div>
                    <div className="flex items-center mr-10">
                      <div className="flex items-center px-2 text-center w-[110px] justify-between">
                        <button className='border-2 flex justify-center text-center items-center rounded-full h-6 w-6 border-[#ff7e00]' onClick={() => handleQuantityChange(store.storeId, item.id, 'decrease')}>
                          <img src={IconMinus} alt="" />
                        </button>
                        <span className='border-2 border-[#ff7e00] rounded-lg px-2 text-[#ff7e00]'>{item.quantity}</span>
                        <button className='border-2 flex justify-center items-center rounded-full h-6 w-6 border-[#ff7e00]' onClick={() => handleQuantityChange(store.storeId, item.id, 'increase')}>
                          <img src={IconPlus} alt="" />
                        </button>
                      </div>
                      <div className="text-lg text-center w-[175px] font-semibold text-[#ff7e00]">{item.price.toLocaleString()} VND</div>
                      <button className='font-semibold w-[75px]'>Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {!isCartEmpty && (
        <div className="sticky bottom-0 w-full bg-white border shadow-lg p-4 flex justify-between items-center max-w-[1200px] mx-auto">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4"
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
          <Link
            to='/payment'
            className="bg-orange-500 text-white py-2 px-4 rounded flex items-center"
          >
            Đặt ngay
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Cart;
