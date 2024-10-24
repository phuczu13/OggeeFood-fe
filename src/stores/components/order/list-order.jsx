import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialOrders = [
  {
    id: 'CH11223344',
    name: 'Nguyễn Văn A',
    price: 20000,
    quantity: 2,
    status: 'pending',
  },
  {
    id: 'CH11223345',
    name: 'Nguyễn Văn B',
    price: 40000,
    quantity: 5,
    status: 'pending',
  },
  {
    id: 'CH22334455',
    name: 'Nguyễn Thị B',
    price: 30000,
    quantity: 1,
    status: 'received',
  },
  {
    id: 'CH22334456',
    name: 'Nguyễn Thị N',
    price: 15000,
    quantity: 1,
    status: 'received',
  },
  {
    id: 'CH33445566',
    name: 'Nguyễn Thanh M',
    price: 15000,
    quantity: 3,
    status: 'completed',
  },
  {
    id: 'CH33445567',
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
  const [showDetail, setShowDetail] = useState(false); // new state for detail

  const confirmationRef = useRef(null);
  const detailRef = useRef(null);

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const notifySuccess = (message) => toast.success(message);

  const handleConfirmAction = (action) => {
    if (action === 'accept') {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: 'received' } : order
        )
      );
      notifySuccess('Nhận đơn hàng thành công');
    } else if (action === 'complete') {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: 'completed' } : order
        )
      );
      notifySuccess('Hoàn thành đơn hàng thành công');
    } else if (action === 'cancel') {
      setOrders(prevOrders =>
        prevOrders.filter(order => order.id !== selectedOrder.id)
      );
      notifySuccess('Hủy đơn hàng thành công');
    }
    setSelectedOrder(null);
    setConfirmationAction(null);
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setConfirmationAction('cancel');
  };

  const handleClickOutside = (event, ref) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectedOrder(null);
      setConfirmationAction(null);
      setShowDetail(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutside(event, confirmationRef);
      handleClickOutside(event, detailRef);
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <ToastContainer /> {/* Toast Container */}
      <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn hàng</h1>

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
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 mb-4 shadow-sm">
            <p className="font-semibold">Mã đơn hàng: {order.id}</p>
            <p>Tên người nhận: {order.name}</p>
            <p>Giá: {order.price.toLocaleString()} VND</p>
            <p>Số lượng: {order.quantity}</p>
            <p>Tổng giá: {(order.price * order.quantity).toLocaleString()} VND</p>

            <div className="flex space-x-3 mt-2">
              {activeTab === 'pending' && (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('accept');
                    }}
                  >
                    Nhận đơn
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Hủy
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                </>
              )}

              {activeTab === 'received' && (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('complete');
                    }}
                  >
                    Hoàn thành
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                </>
              )}

              {activeTab === 'completed' && (
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

      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={confirmationRef}>
            <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận {confirmationAction === 'accept' ? 'nhận' : confirmationAction === 'complete' ? 'hoàn thành' : 'hủy'} đơn hàng</h2>
            <p className='text-center'>Bạn có chắc chắn muốn {confirmationAction === 'accept' ? 'nhận đơn' : confirmationAction === 'complete' ? 'hoàn thành' : 'hủy'} đơn này không?</p>
            <div className="flex justify-center gap-4 mt-5">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setConfirmationAction(null)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleConfirmAction(confirmationAction)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListOrder;
