import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)

        if (code) {
            // Gọi API để xử lý code và đăng nhập người dùng
            fetch(`https://be-order-food.vercel.app/api/user/sso/callback`, {
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
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        const userId = data.userId; 
                        console.log("userId:", userId);  // Log userId để kiểm tra
                        // Chuyển hướng về trang chính và kèm theo userId (hoặc storeId) trong state
                        navigate('/home-page', { state: { userId } });
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

export default CallbackPage;
