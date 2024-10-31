import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentStatus() {
    const location = useLocation();
    const { id } = useParams(); // Lấy orderId từ URL
    const [status, setStatus] = useState('Đang xử lý...');

    useEffect(() => {
        async function fetchOrderStatus() {
            try {
                const response = await axios.get(`https://be-order-food.vercel.app/api/order/donhang/${id}`);
                if (response.data.paymentStatus === "Đã thanh toán") {
                    setStatus('Thanh toán thành công!');
                } else {
                    setStatus('Thanh toán không thành công. Vui lòng thử lại.');
                }
            } catch (error) {
                console.error("Error fetching order status:", error);
                setStatus('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        }

        if (id) {
            fetchOrderStatus();
        } else {
            setStatus('Không tìm thấy thông tin đơn hàng.');
        }
    }, [id]);

    return (
        <div className="payment-status">
            <h1>{status}</h1>

            {/* Thêm nút quay về trang chủ hoặc trang đặt hàng nếu cần */}
        </div>
    );
}

export default PaymentStatus;
