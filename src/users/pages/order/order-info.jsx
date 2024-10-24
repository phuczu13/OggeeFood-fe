import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';  // Thêm thư viện Toastify
import 'react-toastify/dist/ReactToastify.css';  // Thêm style Toastify


const OrderInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCancelOrder = () => {
    setModalOpen(false);
    toast.success("Hủy đặt hàng thành công");
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
       < ToastContainer />     


      {/* Thông tin đơn hàng */}
      <div className="border rounded-lg shadow-lg p-6 bg-white">
        <h2 className="text-center text-orange-600 text-lg font-bold mb-4">THÔNG TIN ĐƠN HÀNG</h2>
        <div className="text-sm text-gray-700">
          <p>Mã vận đơn: #123456789</p>
          <p>Địa chỉ: 123 ABC Street</p>
          <p>Thời gian dự kiến: 30 phút</p>
        </div>

        {/* Bảng thông tin món ăn */}
        <table className="table-auto w-full mt-4 text-left">
          <thead>
            <tr className="text-orange-500">
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
              <td>2</td>
              <td>45.000</td>
              <td>90.000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Bún bò</td>
              <td>2</td>
              <td>45.000</td>
              <td>90.000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Bún bò</td>
              <td>2</td>
              <td>45.000</td>
              <td>90.000</td>
            </tr>
          </tbody>
        </table>

        {/* Tổng tiền và phí */}
        <div className="mt-4">
          <p>Tổng tiền: 270.000 VND</p>
          <p>Phí vận chuyển: 30.000 VND</p>
          <p className="font-bold">Tổng tiền: 300.000 VND</p>
        </div>

        {/* Button Hủy đơn */}
        <div className="text-center mt-4">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setModalOpen(true)}
          >
            Hủy Đơn
          </button>
        </div>
      </div>

      {/* Modal Xác nhận */}
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Dừng sự kiện khi click trong modal
          >
            <h3 className="text-lg font-bold mb-4">Bạn muốn hủy đơn hàng này?</h3>
            <div className="flex justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancelOrder}
              >
                Đồng ý
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setModalOpen(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default OrderInfo;
