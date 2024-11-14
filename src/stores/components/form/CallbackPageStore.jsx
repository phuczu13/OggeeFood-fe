import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPageStore = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)

        if (code) {
            // Gọi API để xử lý code và đăng nhập người dùng
            fetch(`https://be-order-food.vercel.app/api/store/sso/callback-store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }) // Gửi code trong thân của yêu cầu
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("API response:", data);  // Log response để kiểm tra
                    if (data.token) {
                        // Lưu token vào localStorage
                        localStorage.setItem('authToken', data.token);
                        localStorage.setItem('storeId', data.storeId);
                        const storeId = data.storeId; 
                        console.log("driverId:", storeId);  // Log userId để kiểm tra

                         // Gọi API để lấy thông tin tài xế từ driverId
                         fetch(`https://be-order-food.vercel.app/api/store/getInforStore/${storeId}`)
                         .then(response => {
                             if (!response.ok) {
                                 throw new Error('Error fetching store info');
                             }
                             return response.json();
                         })
                         .then(storeData => {
                             console.log('Driver Data:', storeData);
                             
                             // Kiểm tra xem tài xế có thông tin đầy đủ không
                             const requiredFields = [
                                 'storeName', 'email', 'avatar', 'phoneNumber', 'storeAddress', 'openingTime', 'closingTime','storeStatus'
                             ];

                             // Kiểm tra các trường cần thiết
                             const isInfoComplete = requiredFields.every(field => storeData.data[field] && storeData.data[field] !== "");

                             if (isInfoComplete) {
                                 // Nếu đầy đủ thông tin, chuyển đến trang order-driver
                                 navigate('/home-store', { state: { storeId } });
                             } else {
                                 // Nếu thiếu thông tin, chuyển đến trang register-driver
                                 navigate('/infor-newstore');
                             }
                         })
                         .catch(error => {
                             console.error('Error fetching driver info:', error);
                         });
                        // // Chuyển hướng về trang chính và kèm theo userId (hoặc storeId) trong state
                        // navigate('/order-driver', { state: { driverId } });
                    } else {
                        console.error('No token found in response:', data);
                    }
                })
                .catch(error => {
                    console.error('Error during SSO callback:', error);
                });
        }
    }, [navigate]);  // Chỉ cần theo dõi `navigate`

    return <div>Loading...</div>; // Hoặc một spinner loading
};

export default CallbackPageStore;
