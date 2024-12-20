import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderHC3 from '../../components/homepage/headerHC3';
import Footer from '../../components/homepage/footer';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { openConfirmForm } from '../../../redux/slices/confirmOrderSlice';
import ConfirmOrder from '../../../users/components/ConfirmOrder';

function Payment() {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  console.log(deliveryInfo+"thongtin")
  const [cartInfo, setCartInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Payment');
  const [orderItems, setOrderItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [signature, setSignature] = useState(null)
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getSignature = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://be-order-food.vercel.app/api/payment/wallet/${userId}`);
        setSignature(response.data.signature); // Nếu có signature, lưu vào state
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setSignature(null); // Nếu lỗi 404, đặt signature là null
        } else {
          setError(err.message || 'Failed to fetch signature'); // Xử lý lỗi khác
        }
      } finally {
        setLoading(false);
      }
    };

    getSignature();
  }, [userId]);
  console.log("chu ky:" + signature)
  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/user/inforUser/${userId}`);
        setUserData(response.data);
        setDeliveryInfo({
          name: response.data.name,
          phone: response.data.phoneNumber,
          address: response.data.address
        });
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  // Fetch order items from local storage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedItems')) || [];
    setCartInfo(items.map(item => ({
      productId: item.productId._id,
      name: item.name,
      image: item.imageUrl,
      description: item.description,
      quantity: item.quantity,
      price: item.price
    })));
  }, []);

  // Fetch order items from local storage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedItems')) || [];
    console.log("Local"+items)
    setOrderInfo(items.map(item => ({
      name: item.name,
      image: item.imageUrl,
      description: item.description,
      quantity: item.quantity,
      price: item.price
    })));
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const totalPrice = cartInfo.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalShip = 20000;

      const cartItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
      const storeId = cartItems[0]?.storeId;

      const orderData = {
        customerId: userId,
        cart: cartInfo,
        deliveryInfo,
        totalPrice,
        totalShip,
        storeId,
        paymentMethod: paymentMethod
      };
      console.log(orderData)
      const response = await axios.post('https://be-order-food.vercel.app/api/order/create', orderData);
      if (response.status === 201) {
        toast.success("Đặt hàng thành công")
        localStorage.removeItem('selectedItems');
        const orderId = response.data.data._id;
        if (paymentMethod === 'Pointer') {
          const data = {
            amount: grandTotal,
            currency: 'VND',
            message: `Thanh toán đơn hàng ${orderId}`,
            userID: userId,
            orderID: orderId,
            returnUrl: `https://oggee-food-fe.vercel.app/payment-status/${orderId}`,
            orders: orderInfo,
          };
          try {
            const response = await axios.post('https://be-order-food.vercel.app/api/payment/create-payment', data);
            window.location.href = response.data.url; // Chuyển hướng đến trang thanh toán
          } catch (error) {
            console.error('Error creating payment:', error);
          }
        } else if (paymentMethod === 'Ví Pointer') {
          // Kiểm tra signature trước khi thực hiện thanh toán
          if (!signature) {
            toast.error("Bạn chưa liên kết ví");
            return;
          }
          const data = {
            signature: signature,
            amount: grandTotal,
            currency: 'VND',
            message: `Thanh toán đơn hàng ${orderId}`,
            userID: userId,
            orderID: orderId,
            providerID: storeId,
            returnUrl: `https://oggee-food-fe.vercel.app/payment-status/${orderId}`,
            orders: orderInfo,
          };
          try {
            const response = await axios.post('https://be-order-food.vercel.app/api/payment/pay-with-connect-wallet', data);
            console.log('Payment Response:', response); // Xem toàn bộ phản hồi từ API
            if (response.status === 200) {
              setLoading(false)
              console.log('Navigating to payment status page...');
              navigate(`/payment-status/${orderId}`);
              toast.success("Thanh toán thành công")
            } else {
              toast.error("Có lỗi xảy ra")
            }
          } catch (error) {
            console.error('Error creating payment:', error);
          }
        }
        else {
          setLoading(false)
          navigate('/home-page');
        }
      }
    } catch (error) {
      console.error('Error creating order', error);
      toast.error('Đặt hàng thất bại');
    }
  };

  useEffect(() => {
    // Fetch order items from local storage
    const items = JSON.parse(localStorage.getItem('selectedItems')) || [];
    console.log(items)
    setOrderItems(items);
  }, []);

  const handleBack = () => {
    localStorage.removeItem('selectedItems');
    navigate('/cart');
  };

  // Group items by storeId and calculate totals
  const stores = orderItems.reduce((acc, item) => {
    if (!acc[item.storeId]) {
      acc[item.storeId] = { storeName: item.storeName, items: [], storeTotal: 0 };
    }
    acc[item.storeId].items.push(item);
    acc[item.storeId].storeTotal += item.price * item.quantity;
    return acc;
  }, {});

  // Shipping cost per store
  const shippingCost = 20000;

  // Calculate the grand total across all stores
  const grandTotal = Object.values(stores).reduce(
    (total, store) => total + store.storeTotal + shippingCost,
    0
  );

  const dispatch = useDispatch();
  if (loading) return <p className='w-full text-[18px] font-semibold text-[#ff7e00] h-screen flex justify-center items-center'>Bạn đợi chút nhé :3</p>;
  if (error) return <p>Error: {error}</p>;
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
              <label className="block font-semibold">Tên người nhận</label>
              <input
                type="text"
                placeholder="Tên người nhận"
                value={deliveryInfo.name}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
            <div className="mt-2">
              <label className="block font-semibold">Số điện thoại nhận hàng</label>
              <input
                type="text"
                placeholder="Số điện thoại"
                value={deliveryInfo.phone}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
            <div className="mt-2">
              <label className="block font-semibold">Chi tiết địa chỉ</label>
              <input
                type="text"
                placeholder="Địa chỉ"
                value={deliveryInfo.address}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00]"
              />
            </div>
          </div>

          {Object.entries(stores).map(([storeId, { storeName, items, storeTotal }]) => (
            <div key={storeId} className="mb-4">
              <div className="font-semibold">{storeName}</div>
              <div className="mt-2">
                {items.map((item) => (
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
                  <div>{items.reduce((total, item) => total + item.quantity, 0)}</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>Tổng tiền món</div>
                  <div>{storeTotal.toLocaleString()} VND</div>
                </div>
                <div className="flex justify-between mt-2">
                  <div>Chi phí vận chuyển</div>
                  <div>{shippingCost.toLocaleString()} VND</div>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <div>Tổng thanh toán cửa hàng</div>
                  <div>{(storeTotal + shippingCost).toLocaleString()} VND</div>
                </div>
              </div>
            </div>
          ))}

          <div className="mb-4">
            <div className="font-semibold">Chi tiết thanh toán tổng</div>

            {/* Tổng tiền hàng */}
            <div className="mt-2 flex justify-between">
              <div>Tổng tiền hàng</div>
              <div>{Object.values(stores).reduce((total, store) => total + store.storeTotal, 0).toLocaleString()} VND</div>
            </div>

            {/* Tổng tiền phí vận chuyển */}
            <div className="mt-2 flex justify-between">
              <div>Tổng tiền phí vận chuyển</div>
              <div>{(Object.keys(stores).length * shippingCost).toLocaleString()} VND</div>
            </div>

            {/* Tổng thanh toán */}
            <div className="mt-2 font-bold flex justify-between">
              <div>Tổng thanh toán</div>
              <div>{grandTotal.toLocaleString()} VND</div>
            </div>
          </div>


          <div className="mb-4">
            <label className="block font-semibold">Phương thức thanh toán</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded mt-1 hover:border-[#ff7e00] focus:outline-none focus:border-[#ff7e00] cursor-pointer"
            >
              <option value="COD">Tiền mặt</option>
              <option value="Pointer">Pointer</option>
              <option value="Ví Pointer" disabled={!signature}>Ví Pointer</option>
            </select>
          </div>

          <button
            // onClick={handleSubmit}
            onClick={() => dispatch(openConfirmForm())}
            className="bg-orange-500 text-white py-2 px-4 rounded w-full"
          >
            Thanh toán ngay
          </button>
          <ConfirmOrder deliveryInfo={deliveryInfo} paymentMethod={paymentMethod} grandTotal={grandTotal} onConfirm={handleSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;
