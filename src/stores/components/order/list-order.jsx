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
  const [showPrintInvoice, setShowPrintInvoice] = useState(false);
  const confirmationRef = useRef(null);
  const detailRef = useRef(null);
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'Đang làm món') {
      return ['Cửa hàng xác nhận', 'Đang tìm tài xế', 'Đã tìm thấy tài xế'].includes(order.status);
    } else if (activeTab === 'completed'){
      return ['Hoàn thành', 'Đã hủy', 'Chờ lấy hàng','Đang giao'].includes(order.status);
    }
    return order.status === activeTab;
  });

  const notifySuccess = (message) => toast.success(message);
  const storeId = localStorage.getItem('storeId');

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-store/${storeId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order info', error);
      }
    };

    if (storeId) {
      fetchOrderInfo();
    }
  }, [storeId]);

  const handleConfirmAction = async(action) => {
    if (action === 'accept') {
      await axios.put(`https://be-order-food.vercel.app/api/order/orders/${selectedOrder._id}/accept`);
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-store/${storeId}`);
      setOrders(updatedOrdersResponse.data);
      notifySuccess('Nhận đơn hàng thành công');
    } else if (action === 'complete') {
      if(selectedOrder.status === 'Đã tìm thấy tài xế'){
        await axios.put(`https://be-order-food.vercel.app/api/order/orders/${selectedOrder._id}/complete`);
        const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-store/${storeId}`);
        setOrders(updatedOrdersResponse.data);
        notifySuccess('Hoàn thành đơn hàng thành công');
      }else{
        toast.error('Chưa có tài xế nhận đơn');
      }
      
    } else if (action === 'cancel') {
      await axios.put(`https://be-order-food.vercel.app/api/order/orders/${selectedOrder._id}/cancel`);
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-store/${storeId}`);
      setOrders(updatedOrdersResponse.data);
      notifySuccess('Hủy đơn hàng thành công');
    }
    setSelectedOrder(null);
    setConfirmationAction(null);
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleCancelOrder = async(order) => {
    setSelectedOrder(order);
    setConfirmationAction('cancel');
    try {
      const response = await axios.put(`https://be-order-food.vercel.app/api/order/orders/${order._id}/cancel`);
      console.log(response.data.message); 
      const updatedOrdersResponse = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-store/${storeId}`);
      setOrders(updatedOrdersResponse.data);
    } catch (error) {
        console.error(error.response ? error.response.data.error : 'An error occurred while canceling the order.');
    }
  };

  const handleClickOutside = (event, ref) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectedOrder(null);
      setConfirmationAction(null);
      setShowDetail(false);
      setShowPrintInvoice(false);
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

  //in hóa đơn
  const handlePrintInvoice = (order) => {
    setSelectedOrder(order);
    setShowPrintInvoice(true);
  };

  const handleConfirmPrint = () => {
    const printContents = detailRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
  
    // Viết nội dung cho cửa sổ in
    printWindow.document.write(`
      <html>
        <head>
          <title>Hóa đơn</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .print-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .print-table th, .print-table td { border: 1px solid #ddd; padding: 8px; }
            .print-table th { background-color: #f4f4f4; text-align: left; }
            .no-print { display: none; } /* Ẩn các phần tử khi in */
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
  
    printWindow.document.close();
    printWindow.focus();
  
    // Xử lý sau khi hộp thoại in đóng
    printWindow.onafterprint = () => {
      printWindow.close();
      toast.success("In hóa đơn thành công!");
      setShowPrintInvoice(false);
    };
  
    printWindow.print();

  };
  
  
  

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-[#ff7e00]">Đơn hàng</h1>

      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`pb-2 ${activeTab === 'Chờ xác nhận' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('Chờ xác nhận')}
        >
          Chờ xác nhận
        </button>
        <button
          className={`pb-2 ${activeTab === 'Đang làm món' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('Đang làm món')}
        >
          Đang làm món
        </button>
        <button
          className={`pb-2 ${activeTab === 'find driver' ? 'border-b-2 border-red-500' : ''}`}
          onClick={() => setActiveTab('find driver')}
        >
          Đang tìm tài xế
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
            <p>Giá: {(order.totalPrice + order.totalShip).toLocaleString()} VND</p>

            <div className="flex space-x-3 mt-2">
              {activeTab === 'Chờ xác nhận' && (
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
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => {
                      setSelectedOrder(order);
                      setConfirmationAction('cancel');
                    }}
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

              {activeTab === 'Đang làm món' && (
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
                <>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleShowDetail(order)}
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    onClick={() => handlePrintInvoice(order)}
                  >
                    Xuất hóa đơn
                  </button>
                </>
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
            <p>Tài xế: {selectedOrder.driverId || "Chưa có tài xế"}</p>
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên món</th>
                  <th>Ảnh</th>
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

      {showPrintInvoice && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
         <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={detailRef}>
           <h2 className="text-lg font-semibold mb-4 text-center">Thông tin đơn hàng</h2>
           <p>Mã vận đơn: {selectedOrder._id}</p>
           <p>Tên người nhận: {selectedOrder.deliveryInfo.name}</p>
           <p>Địa chỉ: {selectedOrder.deliveryInfo.address}</p>
           <p>Số điện thoại: {selectedOrder.deliveryInfo.phonenumber}</p>
           <table className="w-full text-left mt-4 print-table">
             <thead>
               <tr>
                 <th>STT</th>
                 <th>Tên món</th>
                 <th>SL</th>
                 <th>Thành tiền</th>
               </tr>
             </thead>
             <tbody>
               {selectedOrder.cart.map((item, index) => (
                 <tr key={item.productId}>
                   <td>{index + 1}</td>
                   <td>{item.name}</td>
                   <td>{item.quantity}</td>
                   <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                 </tr>
               ))}
             </tbody>
           </table>
           <p className="mt-4">Tổng tiền: {selectedOrder.totalPrice.toLocaleString()} VND</p>
           <p>Phí vận chuyển: {selectedOrder.totalShip.toLocaleString()} VND</p>
           <p>Tổng tiền thanh toán: {(selectedOrder.totalPrice + selectedOrder.totalShip).toLocaleString()} VND</p>
           <div className="flex justify-center gap-3 mt-4 no-print">
             <button
               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
               onClick={() => setShowPrintInvoice(false)}
             >
               Đóng
             </button>
             <button
               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
               onClick={handleConfirmPrint}
             >
               In hóa đơn
             </button>
           </div>
         </div>
        </div>
      )}

      {confirmationAction && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full" ref={confirmationRef}>
            <h2 className="text-lg font-semibold mb-2 text-center">Xác nhận {confirmationAction === 'accept' ? '' : confirmationAction === 'complete' ? 'hoàn thành' : 'hủy'} đơn hàng</h2>
            <p className='text-center'>Bạn có chắc chắn {confirmationAction === 'accept' ? ' muốn nhận' : confirmationAction === 'complete' ? 'đã hoàn thành' : 'muốn hủy'} đơn hàng này không?</p>
            <div className="flex justify-center gap-3 mt-5">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setConfirmationAction(null)}
              >
                Hủy
              </button>
              <button
                className={`px-4 py-2 text-white rounded hover:bg-opacity-90 ${
                  confirmationAction === 'cancel' 
                    ? 'bg-red-500 hover:bg-red-700' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
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
