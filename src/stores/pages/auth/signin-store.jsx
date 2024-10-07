import React, { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import HeaderStore from '../../components/header/login-headerStore';
import FormSignInStore from '../../components/form/form-signinStore';

function SignInStore() {
    useEffect(() => {
        // Kiểm tra trạng thái đăng xuất
        const loggedOut = localStorage.getItem('loggedOut');
        if (loggedOut === 'true') {
            toast.success('Đăng xuất thành công!', { duration: 2000 });
            localStorage.removeItem('loggedOut'); // Xóa trạng thái sau khi hiển thị toast
        }
    }, []);
    

    return (
        <div className='bg-[#f1f1f1] w-full h-screen pb-10'>
            <div>
                <HeaderStore />
            </div>
            <div>
            <div className="w-fit flex mr-auto ml-auto px-20 pb-1 pt-10 bg-white">
                    <FormSignInStore />
                </div>
            </div>
            <Toaster position='top-right' />
        </div>
    );
}

export default SignInStore;
