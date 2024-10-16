import React, { useEffect } from "react";
import HeaderHP from "../../components/homepage/headerHP";
import FormSignIn from "../../components/formHP/form-sign-in";
import { Toaster, toast } from "react-hot-toast";

function SignIn() {
    useEffect(() => {
        // Kiểm tra trạng thái đăng xuất
        const loggedOut = localStorage.getItem('loggedOut');
        if (loggedOut === 'true') {
            toast.success('Đăng xuất thành công!', { duration: 2000 });
            localStorage.removeItem('loggedOut'); // Xóa trạng thái sau khi hiển thị toast
        }
    }, []);

    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderHP />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-24 pb-12 pt-10 bg-white">
                    <FormSignIn />
                </div>
            </div>
            < Toaster position="top-right" />
        </div>
    );
}

export default SignIn;
