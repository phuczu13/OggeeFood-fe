import React, { useState, useEffect } from 'react';
import HeaderHC3 from "../../components/homepage/headerHC3";
import Footer from "../../components/homepage/footer";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import IconMinus from '../../assets/svg/icon_minus.svg';
import IconPlus from '../../assets/svg/icon_plusOrange.svg';
import axios from 'axios'; // Use axios for API requests
import { Link,useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectStore,setSelecteStore] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`https://be-order-food.vercel.app/api/cart/get-cart?userId=${userId}`);
      console.log(response.data); // Kiểm tra dữ liệu trả về
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
        setLoading(false)
    } else {
        setCartItems([]);
        setLoading(false)
    }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast.error('Lỗi khi tải giỏ hàng');
      setLoading(false)
    }
  };
  
  const handleSelectStore = (storeId) =>{
    
  }
  const deleteProduct = async (storeId, productId) => {
    try {
      console.log( userId, storeId, productId)
      const response = await axios.delete(`https://be-order-food.vercel.app/api/cart/remove-item`, {
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
  
  const updateQuantity = async (userId, storeId, productId, newQuantity) => {
    try {
        if (newQuantity === 0) {
            // If quantity is zero, call API to remove the item
            const response = await axios.delete(`https://be-order-food.vercel.app/api/cart/remove-item`, {
                data: { userId, storeId, productId }
            });

            if (response.status === 200) {
                fetchCartData(); // Refresh the cart data after deletion
                toast.success('Sản phẩm đã bị xóa khỏi giỏ hàng!');
            }
        } else {
            // If quantity > 0, update the item quantity
            const response = await axios.put(`https://be-order-food.vercel.app/api/cart/update-quantity`, {
                userId,
                storeId,
                productId,
                quantity: newQuantity,
            });

            if (response.status === 200) {
                fetchCartData(); // Refresh the cart data after update
                toast.success('Cập nhật số lượng thành công!');
            }
        }
    } catch (error) {
        console.error('Error updating quantity or deleting item:', error);
        toast.error('Lỗi khi cập nhật số lượng hoặc xóa sản phẩm');
    }
};

// Function to handle when user clicks to increase or decrease quantity
const handleQuantityChange = (storeId, productId, action) => {
  const newCartItems = (Array.isArray(cartItems) ? cartItems : []).map((store) => {
        if (store.storeId === storeId) {
            return {
                ...store,
                items: store.items.map((item) => {
                    if (item.productId._id === productId) {
                        const newQuantity = action === 'increase' 
                            ? item.quantity + 1 
                            : Math.max(0, item.quantity - 1); // Allow quantity to decrease to 0

                        updateQuantity(userId, storeId, productId, newQuantity); // Call update or delete
                        console.log(userId, productId, newQuantity)
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                }).filter(item => item.quantity > 0), // Filter out items with quantity 0
            };
        }
        return store;
    });

    setCartItems(newCartItems); // Update the UI immediately
};

  const handleSelectAllItems = () => {
    const newSelection = new Set();
    if (selectedItems.size === totalItems) {
        // Deselect all if already selected
        setSelectedItems(new Set());
    } else {
        // Select all if not already selected
        cartItems.forEach(store => {
          (store.items || []).forEach(item => {
              newSelection.add(`${store.storeId}-${item._id}`);
          });
      });      
        setSelectedItems(newSelection);
    }
};
const handleSelectItem = (storeId, productId) => {
  console.log(storeId,selectStore)
  const itemKey = `${storeId}-${productId}`;
  const newSelectedItems = new Set(selectedItems);
  if(selectStore != null){
    if(selectStore != storeId){
      return
    }
  }
  setSelecteStore(storeId)

  if (newSelectedItems.has(itemKey)) {
    newSelectedItems.delete(itemKey);
    if(newSelectedItems.size===0){
      setSelecteStore(null)
    }
  } else {
    newSelectedItems.add(itemKey);
  }

  setSelectedItems(newSelectedItems);
};

const calculateSelectedTotalItems = () => {
  return Array.from(selectedItems).reduce((acc, itemKey) => {
      const [storeId, productId] = itemKey.split('-');
      const store = cartItems.find(store => store.storeId === storeId);
      const item = store?.items?.find(item => item._id === productId);
      return acc + (item ? item.quantity : 0);
  }, 0);
};

const calculateSelectedTotalPrice = () => {
  return Array.from(selectedItems).reduce((acc, itemKey) => {
      const [storeId, productId] = itemKey.split('-');
      const store = cartItems.find(store => store.storeId === storeId);
      const item = store?.items?.find(item => item._id === productId);
      return acc + (item ? item.price * item.quantity : 0);
  }, 0);
};


// Call these functions when rendering to get the latest totals
const selectedTotalItems = calculateSelectedTotalItems();
const selectedTotalPrice = calculateSelectedTotalPrice();


const totalItems = (Array.isArray(cartItems) ? cartItems : []).reduce(
  (total, store) =>
    total +
    (store.items?.reduce(
      (storeTotal, item) => (item.selected ? storeTotal + item.quantity : storeTotal),
      0
    ) || 0),
  0
);

const totalPrice = (Array.isArray(cartItems) ? cartItems : []).reduce(
  (total, store) =>
    total +
    (store.items?.reduce(
      (storeTotal, item) =>
        item.selected ? storeTotal + item.price * item.quantity : storeTotal,
      0
    ) || 0),
  0
);
if(loading) return <p className='flex justify-center items-center h-screen text-orange-500 font-bold text-lg'>Chờ chút nhé :3</p>
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
            <Link
              to='/product'
              className="bg-[#ff7e00] text-white py-2 px-4 rounded hover:bg-[#ef4b2c] hover:outline-none"
            >
              Lựa món ngay
            </Link>
          </div>
        ) : (
          <div>
  <div className="text-xl font-bold mb-4 text-[#ff7e00]">Sản phẩm</div>

  {Array.isArray(cartItems) && cartItems.length > 0 ? (
    cartItems.map((store) => (
      // Kiểm tra store.items có phải là mảng và không rỗng
      Array.isArray(store.items) && store.items.length > 0 ? (
        <div key={store.storeId} className="mt-5 border shadow-sm bg-white p-4">
          {/* Hiển thị thông tin cửa hàng */}
          <h2 className="text-lg font-semibold">{store.storeName}</h2>
          <p className="text-gray-500 mb-2">{store.storeAddress}</p>

          {store.items.map((item) => (
            <div key={item._id} className="border-b py-4 pr-4 flex items-center justify-between">
              <div className="flex items-center p-4">
                <input
                  type="checkbox"
                  className="mr-5 h-4 w-4"
                  checked={selectedItems.has(`${store.storeId}-${item._id}`)} // Kiểm tra món đã được chọn hay chưa
                  onChange={() => handleSelectItem(store.storeId, item._id)} // Thay đổi trạng thái chọn
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
                  <button 
                    className='border-2 flex justify-center text-center items-center rounded-full h-6 w-6 border-[#ff7e00]' 
                    onClick={() => handleQuantityChange(store.storeId, item.productId._id, 'decrease')}>
                    <img src={IconMinus} alt="minus" />
                  </button>
                  <span className="border-2 border-[#ff7e00] rounded-lg px-2 text-[#ff7e00]">
                    {item.quantity}
                  </span>
                  <button 
                    className="border-2 rounded-full h-6 w-6 border-[#ff7e00] flex items-center justify-center" 
                    onClick={() => handleQuantityChange(store.storeId, item.productId._id, 'increase')}>
                    <img src={IconPlus} alt="plus" />
                  </button>
                </div>
                <div className="text-lg font-semibold text-[#ff7e00]">
                  {(item.price * item.quantity).toLocaleString()} VND
                </div>
                <button
                  className="font-semibold text-red-500 ml-4"
                  onClick={() => deleteProduct(store.storeId, item.productId._id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null // Nếu không có sản phẩm, không render phần cửa hàng
    ))
  ) : (
    <p>Không có sản phẩm nào trong giỏ hàng</p>
  )}
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
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded"
          onClick={() => {
              const selectedItemsData = Array.from(selectedItems).map(itemKey => {
                  const [storeId, productId] = itemKey.split('-');
                  const store = cartItems.find(store => store.storeId === storeId);
                  const item = store.items.find(item => item._id === productId);
                  return {
                      ...item,
                      storeId,
                      storeName: store.storeName
                  };
              });
              localStorage.setItem('selectedItems', JSON.stringify(selectedItemsData)); // Lưu vào localStorage
              navigate('/payment'); // Điều hướng đến trang thanh toán
          }}
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
