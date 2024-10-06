import React, { useState, useRef, useEffect } from 'react';

const initialOrders = [
  {
    id: 'CH11223344',
    name: 'Nguyễn Văn A',
    price: 20000,
    quantity: 2,
    status: 'pending', // Tab "Chờ xác nhận"
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
    status: 'received', // Tab "Đã nhận"
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
    status: 'completed', // Tab "Hoàn thành"
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
  const [showDetailNotification, setShowDetailNotification] = useState(false);
  
  const confirmationRef = useRef(null); // Tạo ref cho modal xác nhận
  const detailRef = useRef(null); // Tạo ref cho modal chi tiết

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const handleConfirmAction = (action) => {
    if (action === 'accept') {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id ? { ...order, status: 'received' } : order
        )
      );
    } else if (action === 'complete') {
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id ? { ...order, status: 'completed' } : order
        )
      );
    } else if (action === 'cancel') {
      setOrders(prevOrders => 
        prevOrders.filter(order => order.id !== selectedOrder.id)
      );
    }
    setSelectedOrder(null);
    setConfirmationAction(null);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setConfirmationAction('cancel');
  };

  const handleShowDetailNotification = () => {
    setShowDetailNotification(true);
  };

  const handleClickOutside = (event, ref) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectedOrder(null);
      setConfirmationAction(null);
      setShowDetailNotification(false);
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
            <p>Tên món: {order.price.toLocaleString()} VND</p>
            <p>Số lượng: {order.quantity}</p>
            <p>Tổng giá: {(order.price * order.quantity).toLocaleString()} VND</p>

            <div className="flex space-x-2 mt-2">
              {activeTab === 'pending' && (
                <>
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('accept');
                    }}
                  >
                    Nhận đơn
                  </button>
                  <button 
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Hủy
                  </button>
                </>
              )}
              
              {activeTab === 'received' && (
                <>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('complete');
                    }}
                  >
                    Hoàn thành
                  </button>
                  <button 
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Hủy
                  </button>
                </>
              )}

              {activeTab === 'completed' && (
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleShowDetailNotification}
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

      {/* Modal xác nhận */}
      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6" ref={confirmationRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Xác nhận</h2>
            <p className='text-center'>Bạn có chắc chắn muốn {confirmationAction === 'accept' ? 'nhận' : confirmationAction === 'complete' ? 'hoàn thành' : 'hủy'} đơn hàng <span className='font-bold'>{selectedOrder.id}</span>?</p>
            <div className="flex space-x-3 mt-4 justify-center">
              <button 
                className="px-4 py-2 bg-[#ff7e00] text-white rounded hover:bg-[#ef4c2b]"
                onClick={() => handleConfirmAction(confirmationAction)}
              >
                Xác nhận
              </button>
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => {
                  setSelectedOrder(null);
                  setConfirmationAction(null);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailNotification && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6" ref={detailRef}>
            <h2 className="text-lg font-semibold mb-4 text-center">Thông báo</h2>
            <p className='text-center'>Tính năng đang được phát triển.</p>
            <div className='flex justify-center'>
              <button 
                className="mt-4 px-4 py-2 w-fit bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowDetailNotification(false)}
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
