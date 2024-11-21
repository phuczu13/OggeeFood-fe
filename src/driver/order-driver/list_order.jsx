import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Use axios for API requests


const initialOrders = [
  {
    id: 'CH2202Y1306',
    name: 'Phạm Thanh Phúc',
    price: 20000,
    quantity: 2,
    status: 'pending',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'CH1234O1111',
    name: 'Nguyễn Văn B',
    price: 40000,
    quantity: 5,
    status: 'pending',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'CH1234O2222',
    name: 'Nguyễn Thị B',
    price: 30000,
    quantity: 1,
    status: 'received',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'CH1234O3333',
    name: 'Nguyễn Thị N',
    price: 15000,
    quantity: 1,
    status: 'received',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'CH1234O4444',
    name: 'Nguyễn Thanh M',
    price: 15000,
    quantity: 3,
    status: 'completed',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
  {
    id: 'CH1234O5555',
    name: 'Nguyễn Thanh L',
    price: 30000,
    quantity: 2,
    status: 'completed',
    image: 'https://tse2.mm.bing.net/th?id=OIP.tcx5hOxoL3t4Im8EZ6Hv5wHaEK&pid=Api&P=0&h=180',
  },
];

function ListOrderDriver() {
  const driverId = localStorage.getItem('driverId');
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('Đang tìm tài xế');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const confirmationRef = useRef(null);


        // Fetch orders assigned to the driver
        useEffect(() => {
          const fetchOrders = async () => {
              try {
                  const response = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-driver/${driverId}`);
                  setOrders(response.data);
              } catch (error) {
                  console.error("Error fetching orders:", error);
              }
          };
          if(driverId){
            fetchOrders();
          }
      }, [driverId]);
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Đã nhận') {
      return ['Chờ lấy hàng', 'Đã tìm thấy tài xế'].includes(order.status);
    } else if (activeTab === 'completed'){
      return ['Hoàn thành', 'Đã hủy'].includes(order.status);
    }
    return order.status === activeTab;
  });

  const handleConfirmAction = async(action) =>{
    if (action === 'accept') {
        await axios.post('https://be-order-food.vercel.app/api/order/orders/driver-action', {
          orderId : selectedOrder._id,
          driverId,
          action: 'confirm'
      });
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-driver/${driverId}`);
      setOrders(updatedOrdersResponse.data);
      toast.success('Nhận đơn hàng thành công');
    } 
    else if (action === 'takeaway') {
      if(selectedOrder.status === 'Chờ lấy hàng'){
        await axios.put(`https://be-order-food.vercel.app/api/order/orders/${selectedOrder._id}/take`);
        const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-driver/${driverId}`);
        setOrders(updatedOrdersResponse.data);
        toast.success('Lấy đơn hàng thành công');
      }else{
        toast.error('Cửa hàng chưa hoàn thành đơn');
      }

    } else if (action === 'completed') {
      await axios.put(`https://be-order-food.vercel.app/api/order/orders/${selectedOrder._id}/ship`);
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-driver/${driverId}`);
      setOrders(updatedOrdersResponse.data);
      toast.success('Giao đơn hàng thành công');
      
    } else if (action === 'cancel') {
        await axios.post('https://be-order-food.vercel.app/api/order/orders/driver-action', {
          orderId : selectedOrder._id,
          driverId,
          action: 'reject'
      });
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-driver/${driverId}`);
      setOrders(updatedOrdersResponse.data);
      toast.success('Hủy đơn hàng thành công');
    }
    setSelectedOrder(null);
    setConfirmationAction(null);
  }

  const handleClickOutside = (event) => {
    if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
      setSelectedOrder(null);
      setConfirmationAction(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn hàng</h1>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`pb-2 ${activeTab === 'Đang tìm tài xế' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('Đang tìm tài xế')}
        >
          Chờ xác nhận
        </button>
        <button
          className={`pb-2 ${activeTab === 'Đã nhận' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('Đã nhận')}
        >
          Đã nhận
        </button>
        <button
          className={`pb-2 ${activeTab === 'Đang giao' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('Đang giao')}
        >
          Đang giao
        </button>
        <button
          className={`pb-2 ${activeTab === 'completed' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Hoàn thành
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-sm">
              <p className="font-semibold">Mã đơn hàng: {order._id}</p>
              <p>Tên người nhận: {order.deliveryInfo.name}</p>
              <p>Địa chỉ: {order.deliveryInfo.address}</p>
            <div className="flex flex-col items-end space-y-2">
              <p className="font-semibold">Tổng giá: {(order.totalPrice + order.totalShip).toLocaleString()} VND</p>
              {activeTab === 'Đang tìm tài xế' && (
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-[#EF4C2B] text-white rounded flex items-center space-x-2 hover:bg-white hover:text-[#EF4C2B] hover:border-[#EF4C2B] hover:border-[3px]"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('accept');
                    }}
                  >
                    <span>Nhận đơn</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 border-white border-[3px] rounded-[5px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    className="px-4 py-2 bg-white text-[#EF4C2B] rounded flex items-center border-[3px] border-[#EF4C2B] space-x-2 hover:bg-[#EF4C2B] hover:text-white"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('cancel');
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 border-[#EF4C2B] border-[3px] rounded-[5px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Hủy</span>
                  </button>
                </div>
              )}
              {activeTab === 'Đã nhận' && (
                <button
                    className="px-4 py-2 bg-[#EF4C2B] text-white rounded flex items-center space-x-2 hover:text-white hover:border-[#EF4C2B] hover:border-[3px]"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('takeaway');
                    }}
                  >
                    <span>Đã lấy hàng</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 border-white border-[3px] rounded-[5px]  "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
              )}
              {activeTab === 'Đang giao' && (
                <button
                    className="px-4 py-2 bg-[#EF4C2B] text-white rounded flex items-center space-x-2 hover:text-white hover:border-[#EF4C2B] hover:border-[3px]"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('completed');
                    }}
                  >
                    <span>Hoàn thành</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 border-white border-[3px] rounded-[5px]  "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Không có đơn hàng nào.</p>
      )}
      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div ref={confirmationRef} className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl text-center">
              {confirmationAction === 'cancel' ? 'Xác nhận hủy đơn hàng' : confirmationAction === 'accept' ? 'Xác nhận nhận đơn hàng' : confirmationAction === 'takeaway' ? 'Xác nhận đã lấy đơn hàng' : 'Xác nhận hoàn thành đơn hàng'}
            </h2>
            <p className="text-center">
              Bạn có chắc chắn muốn {confirmationAction === 'cancel' ? 'hủy' : confirmationAction === 'accept' ? 'nhận' : confirmationAction === 'takeaway' ? 'lấy' : 'hoàn thành'} đơn hàng <span className="font-bold">{selectedOrder.id}</span>?
            </p>
            <div className="flex justify-center gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                  onClick={() => {
                    setSelectedOrder(null); 
                    setConfirmationAction(null); 
                  }}
                >
                  Đóng
                </button>
                <button
                  className={`px-4 py-2 ${confirmationAction === 'cancel' ? 'bg-red-500' : confirmationAction === 'accept' ? 'bg-green-500' : confirmationAction === 'takeaway' ? 'bg-yellow-500' : 'bg-blue-500'} text-white rounded hover:bg-${confirmationAction === 'cancel' ? 'red-600' : confirmationAction === 'accept' ? 'green-600' : 'blue-600'}`}
                  onClick={() => handleConfirmAction(confirmationAction)}
                >
                  Đồng ý
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListOrderDriver;
