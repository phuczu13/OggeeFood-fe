import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toastify

const initialOrders = [
  {
    id: 'CH2202Y1306',
    name: 'Phạm Thanh Phúc',
    price: 20000,
    quantity: 2,
    status: 'pending',
  },
  {
    id: 'CH1234O1111',
    name: 'Nguyễn Văn B',
    price: 40000,
    quantity: 5,
    status: 'pending',
  },
  {
    id: 'CH1234O2222',
    name: 'Nguyễn Thị B',
    price: 30000,
    quantity: 1,
    status: 'received',
  },
  {
    id: 'CH1234O3333',
    name: 'Nguyễn Thị N',
    price: 15000,
    quantity: 1,
    status: 'received',
  },
  {
    id: 'CH1234O4444',
    name: 'Nguyễn Thanh M',
    price: 15000,
    quantity: 3,
    status: 'completed',
  },
  {
    id: 'CH1234O5555',
    name: 'Nguyễn Thanh L',
    price: 30000,
    quantity: 2,
    status: 'completed',
  },
];

function ListOrder() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [reorderConfirmation, setReorderConfirmation] = useState(null); // Trạng thái cho xác nhận "Đặt lại"
  
  const confirmationRef = useRef(null);  // Ref cho modal hủy đơn
  const detailRef = useRef(null);  // Ref cho modal chi tiết
  const reorderConfirmationRef = useRef(null);  // Ref cho modal đặt lại đơn
  
  const filteredOrders = orders.filter(order => order.status === activeTab);

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleConfirmCancel = (order) => {
    setSelectedOrder(order);
    setConfirmationAction('cancel');
  };

  const handleCancelOrder = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: 'canceled' } : order
      )
    );
    setSelectedOrder(null);
    setConfirmationAction(null);

    // Gọi toastify để hiển thị thông báo
    toast.success("Hủy đặt đơn hàng thành công!");
  };

  // Xử lý đặt lại đơn hàng
  const handleReorder = (order) => {
    setSelectedOrder(order);
    setReorderConfirmation(true);
  };

  const confirmReorder = () => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder.id ? { ...order, status: 'pending' } : order
      )
    );
    setReorderConfirmation(false);
    setSelectedOrder(null);

    // Gọi toastify để hiển thị thông báo
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

      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`pb-2 ${activeTab === 'pending' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Chờ xác nhận
        </button>
        <button
          className={`pb-2 ${activeTab === 'received' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Đã nhận
        </button>
        <button
          className={`pb-2 ${activeTab === 'completed' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Hoàn thành
        </button>
        <button
          className={`pb-2 ${activeTab === 'canceled' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('canceled')}
        >
          Đã hủy
        </button>
      </div>

      {/* Danh sách đơn hàng */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <p className="font-semibold">Mã đơn hàng: {order.id}</p>
            <p>Tên người nhận: {order.name}</p>
            <p>Giá: {order.price.toLocaleString()} VND</p>
            <p>Số lượng: {order.quantity}</p>
            <p>Tổng giá: {(order.price * order.quantity).toLocaleString()} VND</p>

            <div className="flex space-x-2 mt-2">
              {activeTab === 'pending' && (
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

              {activeTab === 'canceled' && (
                <>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleReorder(order)}
                  >
                    Đặt lại
                  </button>
                </>
              )}

              {activeTab !== 'pending' && activeTab !== 'canceled' && (
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

      {/* Modal chi tiết */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={detailRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Thông tin đơn hàng</h2>
            <p>Mã vận đơn: {selectedOrder.id}</p>
            <p>Địa chỉ: [Chưa có địa chỉ]</p>
            <p>Thời gian dự kiến: [Chưa có thời gian]</p>
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên món</th>
                  <th>SL</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Bún bò</td>
                  <td>{selectedOrder.quantity}</td>
                  <td>{selectedOrder.price.toLocaleString()} VND</td>
                  <td>{(selectedOrder.price * selectedOrder.quantity).toLocaleString()} VND</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">Tổng tiền: {(selectedOrder.price * selectedOrder.quantity).toLocaleString()} VND</p>
            <p>Phí vận chuyển: 30,000 VND</p>
            <p>Tổng tiền thanh toán: {(selectedOrder.price * selectedOrder.quantity + 30000).toLocaleString()} VND</p>

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

      {/* Modal xác nhận hủy đơn */}
      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6" ref={confirmationRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Xác nhận hủy đơn hàng</h2>
            <p className="text-center">
              Bạn có chắc chắn muốn hủy đơn hàng <span className="font-bold">{selectedOrder.id}</span>?
            </p>
            <div className="flex justify-around mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleCancelOrder}
              >
                Đồng ý
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setConfirmationAction(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận đặt lại đơn */}
      {reorderConfirmation && selectedOrder && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg p-6" ref={reorderConfirmationRef}>
          <h2 className="text-lg font-semibold mb-4 text-center">Xác nhận đặt lại đơn hàng</h2>
          <p className="text-center">
            Bạn có chắc chắn muốn đặt lại đơn hàng <span className="font-bold">{selectedOrder.id}</span>?
          </p>
          <div className="flex justify-around mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={confirmReorder}
            >
              Đồng ý
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              onClick={() => setReorderConfirmation(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default ListOrder;
