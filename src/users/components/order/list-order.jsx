import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Use axios for API requests

function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Chờ xác nhận');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [reorderConfirmation, setReorderConfirmation] = useState(null); 
  const [rebuyConfirmation, setRebuyConfirmation] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const ratingRef = useRef(null);
  const confirmationRef = useRef(null);  
  const detailRef = useRef(null);  
  const reorderConfirmationRef = useRef(null);  
  const rebuyConfirmationRef = useRef(null);
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Chờ lấy hàng1') {
      return ['Cửa hàng xác nhận', 'Đang tìm tài xế', 'Đã tìm thấy tài xế','Chờ lấy hàng'].includes(order.status);
    }
    return order.status === activeTab;
  });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/order/get-order/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order info', error);
      }
    };

    if (userId) {
      fetchOrderInfo();
    }
  }, [userId]);
 

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleConfirmCancel = async (order) => {
    setSelectedOrder(order);
    setConfirmationAction('cancel');
    try {
      const response = await axios.put(`https://be-order-food.vercel.app/api/order/orders/${order._id}/cancel`);
      console.log(response.data.message); 
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order/${userId}`);
      setOrders(updatedOrdersResponse.data);
    } catch (error) {
        console.error(error.response ? error.response.data.error : 'An error occurred while canceling the order.');
    }
  };

  const handleCancelOrder = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder._id ? { ...order, status: 'Đã hủy' } : order
      )
    );
    setSelectedOrder(null);
    setConfirmationAction(null);

    toast.success("Hủy đặt đơn hàng thành công!");
  };

  const handleReorder = (order) => {
    setSelectedOrder(order);
    setReorderConfirmation(true);
  };

  const handleRebuy = (order) => {
    setSelectedOrder(order);
    setReorderConfirmation(false);
    setConfirmationAction(null); 
    setRebuyConfirmation(true); 
  };
  
  const confirmRebuy = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder._id ? { ...order, status: 'Chờ xác nhận' } : order
      )
    );
    setRebuyConfirmation(false);
    setSelectedOrder(null);
  
    toast.success("Mua lại đơn hàng thành công!");
  };
  

  const confirmReorder = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder._id ? { ...order, status: 'Chờ xác nhận' } : order
      )
    );
    setReorderConfirmation(false);
    setSelectedOrder(null);

    toast.success("Đặt lại đơn hàng thành công!");
  };

  const handleClickOutside = (event) => {
    if (confirmationRef.current && !confirmationRef.current.contains(event.target)) {
      setSelectedOrder(null);
      setConfirmationAction(null);
    }
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      setShowDetail(false);
    }
    if (reorderConfirmationRef.current && !reorderConfirmationRef.current.contains(event.target)) {
      setReorderConfirmation(false);
    }
    if (rebuyConfirmationRef.current && !rebuyConfirmationRef.current.contains(event.target)) { 
      setRebuyConfirmation(false); 
    }
    if (ratingRef.current && !ratingRef.current.contains(event.target)) { // Add this condition
      setShowRatingModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm form rating
  const handleRating = (order) => {
  setSelectedOrder(order);
  setRating(0);
  setComment('');
  setImages([]);
  setShowRatingModal(true);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages(imagePreviews);
  };
  
  const handleRatingSubmit = () => {
    if (rating < 1) {
      toast.warning("Bạn cần đánh giá ít nhất 1 sao!");
      return;
    }
  
    if (images.length > 3) {
      toast.warning("Chỉ được chọn tối đa 3 ảnh.");
      return;
    }
  
    toast.success("Đánh giá thành công!");
    setShowRatingModal(false);
    setRating(0);
    setComment('');
    setImages([]);
  };
  

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn mua</h1>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div className="flex space-x-4 border-b font-semibold mb-4">
        <button
          className={`pb-2 hover:text-[#ef4b2c] hover:border-b-[#ef4b2c] hover:border-b-2 ${activeTab === 'Chờ xác nhận' ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''}`}
          onClick={() => setActiveTab('Chờ xác nhận')}
        >
          Chờ xác nhận
        </button>
        <button
          className={`pb-2 hover:text-[#ef4b2c] hover:border-b-[#ef4b2c] hover:border-b-2 ${activeTab === 'Chờ lấy hàng1' ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''}`}
          onClick={() => setActiveTab('Chờ lấy hàng1')}
        >
          Chờ lấy hàng
        </button>
        <button
          className={`pb-2 hover:text-[#ef4b2c] hover:border-b-[#ef4b2c] hover:border-b-2 ${activeTab === 'Đang giao' ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''}`}
          onClick={() => setActiveTab('Đang giao')}
        >
          Chờ giao hàng
        </button>
        <button
          className={`pb-2 hover:text-[#ef4b2c] hover:border-b-[#ef4b2c] hover:border-b-2 ${activeTab === 'Hoàn thành' ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''}`}
          onClick={() => setActiveTab('Hoàn thành')}
        >
          Hoàn thành
        </button>
        <button
          className={`pb-2 hover:text-[#ef4b2c] hover:border-b-[#ef4b2c] hover:border-b-2 ${activeTab === 'Đã hủy' ? 'border-b-2 border-red-500 text-[#ef4b2c]' : ''}`}
          onClick={() => setActiveTab('Đã hủy')}
        >
          Đã hủy
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <p className="font-semibold">Mã đơn hàng: {order._id}</p>
            <p>Tên người nhận: {order.deliveryInfo.name}</p>
            <p>Địa chỉ: {order.deliveryInfo.address}</p>
            <p>Giá: {(order.totalPrice + order.totalShip).toLocaleString()} VND</p>

            <div className="flex space-x-2 mt-2">
              {activeTab === 'Chờ xác nhận' && (
                <>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleConfirmCancel(order)}
                  >
                    Hủy đơn
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                </>
              )}

              {activeTab === 'Hoàn thành' && (
                <>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handleRating (order)}
                  >
                    Đánh giá
                  </button>
                  {/* <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleRebuy(order)}
                  >
                    Mua lại
                  </button> */}
                </>
              )}

              {activeTab === 'Đã hủy' && (
                <>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                  {/* <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleReorder(order)}
                  >
                    Đặt lại
                  </button> */}
                </>
              )}
              {activeTab === 'Đang giao' && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleShowDetail(order)}
                >
                  Xem chi tiết
                </button>
              )}
              {activeTab === 'Chờ lấy hàng1' && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleShowDetail(order)}
                >
                  Xem chi tiết
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Không có đơn hàng nào.</p>
      )}

      {showDetail && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={detailRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Thông tin đơn hàng</h2>
            <p>Mã vận đơn: {selectedOrder._id}</p>
            <p>Địa chỉ: {selectedOrder.deliveryInfo.address}</p>
            <p>Thời gian dự kiến: 15 phút</p>
            <p>Trạng thái đơn hàng: {selectedOrder.status}</p>
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên món</th>
                  <th>Hình ảnh</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.cart.map((item, index) => (
                  <tr key={item.productId}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td><img className='w-12 h-10 object-cover' src={item.image} alt="" /></td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()} VND</td>
                    <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4">Tổng tiền: {selectedOrder.totalPrice.toLocaleString()} VND</p>
            <p>Phí vận chuyển: {selectedOrder.totalShip.toLocaleString()} VND</p>
            <p>Tổng tiền thanh toán: {(selectedOrder.totalPrice + selectedOrder.totalShip).toLocaleString()} VND</p>

            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowDetail(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}


      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6" ref={confirmationRef}>
            <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận hủy đặt đơn hàng</h2>
            <p className="text-center">
              Bạn có chắc chắn muốn hủy đặt đơn hàng <span className="font-bold">{selectedOrder._id}</span>?
            </p>
            <div className="flex justify-center gap-4 mt-5">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setConfirmationAction(null)}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleCancelOrder}
              >
                Hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}

      {rebuyConfirmation && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6" ref={rebuyConfirmationRef}>
            <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận mua lại đơn hàng</h2>
            <p className="text-center">
              Bạn có chắc chắn muốn mua lại đơn hàng <span className="font-bold">{selectedOrder._id}</span>?
            </p>
            <div className="flex justify-center gap-4 mt-5">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setRebuyConfirmation(false)}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={confirmRebuy}
              >
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      )}


      {reorderConfirmation && selectedOrder && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-6" ref={reorderConfirmationRef}>
          <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận đặt lại đơn hàng</h2>
          <p className="text-center">
            Bạn có chắc chắn muốn đặt lại đơn hàng <span className="font-bold">{selectedOrder._id}</span>?
          </p>
          <div className="flex justify-center gap-4 mt-5">
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={() => setReorderConfirmation(null)}
            >
              Đóng
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={confirmReorder}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    )}
    
    {showRatingModal && selectedOrder && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={ratingRef}>
          <h2 className="text-lg font-semibold mb-4 text-center">Đánh giá đơn hàng</h2>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="w-full border rounded p-2 mb-4"
            placeholder="Đánh giá về đơn hàng của bạn"
            value={comment}
            onChange={handleCommentChange}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mb-4"
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={() => setShowRatingModal(false)}
            >
              Đóng
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={handleRatingSubmit}
            >
              Đánh giá
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default ListOrder;
