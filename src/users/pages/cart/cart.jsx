import React, { useState, useEffect } from 'react';
import HeaderHC3 from "../../components/homepage/headerHC3";
import Footer from "../../components/homepage/footer";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import IconMinus from '../../assets/svg/icon_minus.svg';
import IconPlus from '../../assets/svg/icon_plusOrange.svg';
import axios from 'axios'; // Use axios for API requests
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [productToDelete, setProductToDelete] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/cart/get-cart?userId=${userId}`);
      if (response.data) {
        setCartItems([{
          storeId: response.data.storeId,
          storeName: response.data.storeName,
          storeAddress: response.data.storeAddress,
          items: response.data.items // This is an array of items
        }]);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast.error('Lỗi khi tải giỏ hàng');
    }
  };
  const deleteProduct = async (storeId, productId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/api/cart/remove-item`, {
        data: { userId, storeId, productId }
      });
      if (response.status === 200) {
        toast.success('Xóa sản phẩm thành công!');
        fetchCartData(); // Tải lại giỏ hàng sau khi xóa thành công
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Lỗi khi xóa sản phẩm');
    }
  };
  
  const updateQuantity = async (userId, productId, newQuantity) => {
    try {
        if (newQuantity === 0) {
            // Nếu số lượng là 0, gọi API để xóa sản phẩm khỏi giỏ hàng
            const response = await axios.delete(`http://localhost:3002/api/cart/remove-item`, {
                data: { userId, productId }
            });

            if (response.status === 200) {
                fetchCartData(); // Làm mới dữ liệu giỏ hàng sau khi xóa
                toast.success('Sản phẩm đã bị xóa khỏi giỏ hàng!');
            }
        } else {
            // Nếu số lượng > 0, cập nhật số lượng sản phẩm
            const response = await axios.put(`http://localhost:3002/api/cart/update-quantity`, {
                userId,
                productId,
                quantity: newQuantity,
            });

            if (response.status === 200) {
                fetchCartData(); // Làm mới dữ liệu giỏ hàng
                toast.success('Cập nhật số lượng thành công!');
            }
        }
    } catch (error) {
        console.error('Error updating quantity or deleting item:', error);
        toast.error('Lỗi khi cập nhật số lượng hoặc xóa sản phẩm');
    }
};

const handleQuantityChange = (storeId, productId, action) => {
    const newCartItems = cartItems.map((store) => {
        if (store.storeId === storeId) {
            return {
                ...store,
                items: store.items.map((item) => {
                    if (item.productId._id === productId) {
                        const newQuantity = action === 'increase' 
                            ? item.quantity + 1 
                            : Math.max(0, item.quantity - 1); // Cho phép giảm số lượng về 0

                        updateQuantity(userId, productId, newQuantity); // Gọi hàm update hoặc xóa

                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                }).filter(item => item.quantity > 0), // Loại bỏ các sản phẩm có quantity = 0 khỏi state
            };
        }
        return store;
    });

    setCartItems(newCartItems); // Cập nhật state
};


  const handleSelectAllItems = () => {
    const newSelection = new Set();
    if (selectedItems.size === totalItems) {
        // Deselect all if already selected
        setSelectedItems(new Set());
    } else {
        // Select all if not already selected
        cartItems.forEach(store => {
            store.items.forEach(item => {
                newSelection.add(`${store.storeId}-${item._id}`);
            });
        });
        setSelectedItems(newSelection);
    }
};
const handleSelectItem = (storeId, productId) => {
  const itemKey = `${storeId}-${productId}`;
  const newSelectedItems = new Set(selectedItems);

  if (newSelectedItems.has(itemKey)) {
    newSelectedItems.delete(itemKey);
  } else {
    newSelectedItems.add(itemKey);
  }

  setSelectedItems(newSelectedItems);
};

  const calculateSelectedTotalItems = () => {
    return Array.from(selectedItems).reduce((acc, itemKey) => {
        const [storeId, productId] = itemKey.split('-');
        const store = cartItems.find(store => store.storeId === storeId);
        const item = store.items.find(item => item._id === productId);
        return acc + (item ? item.quantity : 0);
    }, 0);
};

const calculateSelectedTotalPrice = () => {
    return Array.from(selectedItems).reduce((acc, itemKey) => {
        const [storeId, productId] = itemKey.split('-');
        const store = cartItems.find(store => store.storeId === storeId);
        const item = store.items.find(item => item._id === productId);
        return acc + (item ? item.price * item.quantity : 0);
    }, 0);
};

// Call these functions when rendering to get the latest totals
const selectedTotalItems = calculateSelectedTotalItems();
const selectedTotalPrice = calculateSelectedTotalPrice();


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

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <div>
        <HeaderHC3 />
      </div>
      <div className="flex-1 w-full max-w-[1200px] mx-auto mt-10 sm:mt-6 px-4 sm:px-0 pb-10">
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
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
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
          <div>
            <div className="text-xl font-bold mb-4 text-[#ff7e00]">Sản phẩm</div>

            {cartItems.map((store) => (
              <div key={store.storeId} className="mt-5 border shadow-sm bg-white p-4">
                <h2 className="text-lg font-semibold">{store.storeName}</h2>
                <p className="text-gray-500 mb-2">{store.storeAddress}</p>
                {store.items.map((item) => (
                  <div key={item._id} className="border-b py-4 pr-4 flex items-center justify-between">
                    <div className="flex items-center p-4">
                      <input
                        type="checkbox"
                        className="mr-5 h-4 w-4"
                        checked={selectedItems.has(`${store.storeId}-${item._id}`)} // Check if item is selected
                        onChange={() => handleSelectItem(store.storeId, item._id)} // Toggle selection                                            
                      />
                      <div className="flex gap-5 items-center">
                        <img className="w-20 h-20 object-cover" src={item.imageUrl} alt="product" />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:mr-10">
                      <div className="flex items-center justify-between w-full sm:w-[110px] px-2">
                        <button className='border-2 flex justify-center text-center items-center rounded-full h-6 w-6 border-[#ff7e00]' onClick={() => handleQuantityChange(store.storeId, item.id, 'decrease')}>
                          <img src={IconMinus} alt="" />
                        </button>
                        <span className="border-2 border-[#ff7e00] rounded-lg px-2 text-[#ff7e00]">
                          {item.quantity}
                        </span>
                        <button
                          className="border-2 rounded-full h-6 w-6 border-[#ff7e00] flex items-center justify-center"
                          onClick={() => handleQuantityChange(store.storeId, item.productId._id, 'increase')}
                        >
                          <img src={IconPlus} alt="plus" />
                        </button>
                      </div>
                      <div className="text-lg font-semibold text-[#ff7e00]">
                        {(item.price * item.quantity).toLocaleString()} VND
                      </div>
                      <button
                        className="font-semibold text-red-500 ml-4"
                        onClick={() => deleteProduct(store.storeId, item.productId._id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky footer */}
      {cartItems.length !== 0 && (
      <div className="sticky bottom-0 w-full bg-white border shadow-lg p-4 flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            //checked={selectedItems.size === totalItems && totalItems > 0}
            onChange={handleSelectAllItems}
            className="mr-2 h-4 w-4"
          />
          <span>Chọn tất cả các món</span>
        </div>
        <button
          //onClick={() => setIsModalOpen(true)} 
          className="bg-transparent border border-orange-500 text-orange-500 py-2 px-4 rounded"
        >
          Xóa
        </button>
        <div className="text-lg">
          <span className="font-semibold">Tổng số món: </span>
          <span className="text-orange-500">{selectedTotalItems}</span>
        </div>
        <div className="text-lg">
          <span className="font-semibold">Tổng tiền: </span>
          <span className="text-orange-500">{selectedTotalPrice.toLocaleString()} VND</span>
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
