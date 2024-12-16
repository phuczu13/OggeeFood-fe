import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Use axios for API requests

function ListOrder() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Chờ xác nhận');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [reorderConfirmation, setReorderConfirmation] = useState(null);
  const [rebuyConfirmation, setRebuyConfirmation] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const ratingRef = useRef(null);
  const confirmationRef = useRef(null);
  const detailRef = useRef(null);
  const reorderConfirmationRef = useRef(null);
  const rebuyConfirmationRef = useRef(null);
  const [ratedOrders, setRatedOrders] = useState({});

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Chờ lấy hàng1') {
      return ['Cửa hàng xác nhận', 'Đang tìm tài xế', 'Đã tìm thấy tài xế', 'Chờ lấy hàng'].includes(order.status);
    }
    return order.status === activeTab;
  });
  const userId = localStorage.getItem('userId');
  const handleCancelRefund = async (orderId) => {
    try {
      const res = await axios.post(`https://be-order-food.vercel.app/api/payment/refund-money/${orderId}`);
      setLoading(true);
      if (res.status === 200) {
        toast.success("Hủy đơn hàng thành công!");
        setLoading(false);
      } else {
        toast.error("Có lỗi xảy ra!");
        setError(true);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      setError(true);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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

  const handleStarClick = (productId, star) => {
    setRating((prev) => ({ ...prev, [productId]: star })); // Cập nhật đánh giá cho sản phẩm
  };

  const handleCommentChange = (e, productId) => {
    setComment((prev) => ({ ...prev, [productId]: e.target.value })); // Lưu bình luận cho sản phẩm
  };

  const handleImageChange = (e, productId) => {
    const files = Array.from(e.target.files);
    setImages((prev) => ({ ...prev, [productId]: files })); // Lưu hình ảnh cho sản phẩm
  };

  const handleRatingSubmit = async () => {
    setLoading(true)
    const promises = selectedOrder.cart.map(async (product) => {
      const productRating = rating[product.productId];
      const productComment = comment[product.productId];
      const productImages = images[product.productId] || [];

      console.log('Product ID:', product.productId); // In ID sản phẩm
      console.log('Rating:', productRating); // In giá trị rating
      console.log('Comment:', productComment); // In giá trị comment
      console.log('Images:', productImages); // In giá trị images

      if (!productRating) {
        toast.warning(`Bạn cần đánh giá ít nhất 1 sao cho sản phẩm ${product.name}!`);
        return;
      }

      const formData = new FormData();
      formData.append('orderId', selectedOrder._id);
      formData.append('productId', product.productId); // Lưu ID sản phẩm
      formData.append('customerId', userId);
      formData.append('rating', productRating);
      formData.append('comment', productComment);
      productImages.forEach(image => formData.append('images', image));

      try {
        const response = await axios.post('https://be-order-food.vercel.app/api/rating/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 201) {
          setLoading(false)
          await axios.put(`https://be-order-food.vercel.app/api/order/${selectedOrder._id}/rate`, {
            hasRated: true
          });
          toast.success(`Đánh giá thành công cho sản phẩm ${product.name}!`);
        }
      } catch (error) {
        setLoading(false)
        toast.error(`Có lỗi xảy ra khi gửi đánh giá cho sản phẩm ${product.name}.`);
        console.error(error);
      }
    });

    await Promise.all(promises);
    setShowRatingModal(false);
    setRating({});
    setComment({});
    setImages({});
  };

  if (isLoading) return <p className='w-full text-[18px] font-semibold text-[#ff7e00] h-screen flex justify-center items-center'>Bạn đợi chút nhé :3</p>;
  if (isError) return 'Error....'

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
                    onClick={openModal}
                  >
                    Hủy đơn
                  </button>
                  {/* Modal xác nhận */}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold">Bạn muốn hủy đơn này không?</h3>
                        <p className="mt-2 text-sm">Nếu hủy, bạn sẽ được hoàn tiền.</p>
                        <div className="mt-4 flex justify-end space-x-2">
                          {/* Nút Cancel */}
                          <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                          >
                            Hủy
                          </button>
                          {/* Nút Xác nhận */}
                          <button
                            onClick={() => {
                              handleCancelRefund(order._id);
                              closeModal(); // Đóng modal sau khi hủy
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
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
                    onClick={() => handleRating(order)}
                    disabled={order.hasRated} // Disable nút nếu đã đánh giá
                  >
                    {order.hasRated ? 'Đã đánh giá' : 'Đánh giá'}
                  </button>
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

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowDetail(false)}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => navigate('/detail-order', { state: { orderId: selectedOrder._id } })} 
                
              >
                Xem lộ trình đơn hàng
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
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full" ref={ratingRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Đánh giá đơn hàng</h2>

            {selectedOrder.cart.map((product, index) => (
              <div key={product.productId} className="mb-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer text-2xl ${rating[product.productId] >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                      onClick={() => handleStarClick(product.productId, star)} // Gọi hàm với ID sản phẩm
                    >
                      ★
                    </span>
                  ))}
                </div>

                <textarea
                  className="w-full border rounded p-2 mb-2 h-16 resize-none"
                  placeholder="Đánh giá về sản phẩm này"
                  value={comment[product.productId] || ''} // Lưu trữ bình luận cho sản phẩm
                  onChange={(e) => handleCommentChange(e, product.productId)} // Gọi hàm với ID sản phẩm
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, product.productId)} // Gọi hàm với ID sản phẩm
                  className="mb-2 border rounded p-2"
                />
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
                onClick={() => setShowRatingModal(false)}
              >
                Đóng
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
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
