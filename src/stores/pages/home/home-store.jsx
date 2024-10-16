import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import HeaderHS1 from '../../components/header/headerHSmini/headerHS1';
import ListProduct from '../../components/product/list-product';

function HomeStore() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    console.log("storeId at home is "+storeId)
    // useEffect(() => {
    //     // Kiểm tra trạng thái đăng nhập thành công
    //     const loginSuccess = localStorage.getItem('loginSuccess');
    //     if (loginSuccess === 'true') {
    //         toast.success('Đăng nhập thành công!', { duration: 2000 });
    //         localStorage.removeItem('loginSuccess'); // Xóa trạng thái sau khi hiển thị toast
    //     }
    // }, []);

    // useEffect(() => {
    //     const loginSuccess = localStorage.getItem('loginSuccess');
    //     if (loginSuccess) {
    //         toast.success('Đăng nhập thành công!', { duration: 2000 });
    //         localStorage.removeItem('loginSuccess'); // Xóa trạng thái sau khi hiển thị toast
    //     }
    // }, []);
    
    
    
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS1/>
            </div>
            <div>
                <ListProduct />
            </div>
            {/* <Toaster position="top-right" /> */}
        </div>
    );
}

export default HomeStore;
