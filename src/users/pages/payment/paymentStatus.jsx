import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentStatus() {
    const location = useLocation();
    const { id } = useParams(); // Lấy orderId từ URL
    const [status, setStatus] = useState('Đang xử lý...');
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('storeId');
    console.log(storeId)

    

    return (
        <div className="payment-status">
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-md text-center py-10 max-w-[500px] w-full">

                <div className="border rounded-full flex mx-auto border-green-500 w-fit">
                <img className='pl-16 w-[250px] h-[250px]' src="https://th.bing.com/th/id/R.a1c1a8331f107deedf8ef54de1b257e3?rik=oqQ50DLg6fye8A&riu=http%3a%2f%2fcraftizen.org%2fwp-content%2fuploads%2f2019%2f02%2fsuccessful_payment_388054.png&ehk=Em4ImyRV5nk%2bEJIoj56uumAei6qyyq8J7UZVyyjeqIM%3d&risl=&pid=ImgRaw&r=0" alt="iCon" />
                </div>
                
                <h2 className="text-3xl font-semibold my-4">Thanh toán thành công</h2>
                <div>
                <div className='text-xl'>Mã đơn hàng của bạn là <span className='text-[#ff7e00] font-semibold'>{storeId}</span>.</div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                <button 
                    onClick={() => navigate('/order')} 
                    className="bg-gray-200 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-300 transition"
                >
                    Xem đơn hàng của bạn
                </button>
                <button 
                    onClick={() => navigate('/home-page')} 
                    className="bg-[#ff7e00] text-white px-4 py-3 rounded-md hover:bg-[#ef4c2b] transition"
                >
                    Mua sắm tiếp
                </button>
                </div>
            </div>
            </div>      
        </div>
    );
}

export default PaymentStatus;
