import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPageDriver = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)

        if (code) {
            // Gọi API để xử lý code và đăng nhập người dùng
            fetch(`https://be-order-food.vercel.app/api/driver/sso/callback-driver`, {
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
                        localStorage.setItem('driver-token', data.token);
                        localStorage.setItem('driverId', data.driverId);
                        const driverId = data.driverId; 
                        console.log("driverId:", driverId);  // Log userId để kiểm tra

                         // Gọi API để lấy thông tin tài xế từ driverId
                         fetch(`https://be-order-food.vercel.app/api/driver/get-driver/${driverId}`)
                         .then(response => {
                             if (!response.ok) {
                                 throw new Error('Error fetching driver info');
                             }
                             return response.json();
                         })
                         .then(driverData => {
                             console.log('Driver Data:', driverData);
                             
                             // Kiểm tra xem tài xế có thông tin đầy đủ không
                             const requiredFields = [
                                 'name', 'email', 'avatar', 'driverLicenseNumber', 'vehicleOwnerNumber', 'gender', 'dateOfBirth'
                             ];

                             // Kiểm tra các trường cần thiết
                             const isInfoComplete = requiredFields.every(field => driverData.data[field] && driverData.data[field] !== "");

                             if (isInfoComplete) {
                                 // Nếu đầy đủ thông tin, chuyển đến trang order-driver
                                 navigate('/order-driver', { state: { driverId } });
                             } else {
                                 // Nếu thiếu thông tin, chuyển đến trang register-driver
                                 navigate('/register-driver');
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

export default CallbackPageDriver;
