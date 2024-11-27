import React, { useState, useEffect } from 'react';
import IconRating from "../../assets/svg/icon_rating.svg";
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { Link } from 'react-router-dom';
import HeaderHC2 from '../../components/homepage/headerHC2';
import Footer from '../../components/homepage/footer';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS của Toastify
import IconPrevios from '../../assets/svg/icon_previos.svg';
import axios from 'axios'; // Import axios


function ListEatery() {
    const [stores,setStore] = useState([])
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    // Hàm gọi API để lấy dữ liệu sản phẩm ngẫu nhiên
    const fetchStores = async () => {
        try {
            const response = await axios.get('https://be-order-food.vercel.app/api/store/getAllStore'); // API URL từ backend
            console.log(response.data.data);
            const filteredStores = response.data.data.filter(store => 
                store.storeName && store.avatar && store.storeAddress && store.openingTime && store.closingTime);
            setStore(filteredStores); // Cập nhật sản phẩm
            setLoading(false); // Tắt loading sau khi có dữ liệu
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchStores();
    }, []);
    if (loading) {
        return <p className='text-[18px] flex justify-center items-center'>Bạn đợi chút nhé...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <div>
                <HeaderHC2 />
            </div>
            <div className="w-full max-w-[1200px] mx-auto mt-8 p-3 sm:p-0">
                <div className='w-full flex items-center'>
                    <span className='text-[#ff7e00] text-xl w-1/5 font-semibold'>Quán ăn</span>
                    <div className='bg-[#ff7e00] w-full h-[1px]'></div>
                </div>
                <div className='mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {stores?.map((store) => (
                            <Link to={`/eatery-details`} state={ {storeId : store._id}} key={store._id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                                <div className="relative">
                                    <img src={store.avatar} alt={store.storeName} className="w-full h-[150px] object-cover" />
                                    <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                        <span className="text-black font-semibold">{store.rating}</span>
                                        <span className="ml-1"><img src={IconRating} alt="" /></span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-lg">{store.storeName}</h3>
                                    <p className="text-gray-500 text-sm">Thể loại: {store.category}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-red-500 font-semibold">Địa chỉ: {store.storeAddress}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-10 w-full max-w-[350px] mx-auto flex justify-center '>
                <Link to='/eatery' className='hover:ring-[#ff7e00] hover:outline-none hover:ring-2 relative p-3 border flex items-center justify-center font-semibold text-[18px] border-[#F8E7CC] text-[#ff7e00] rounded-full w-full'>
                Trở lại trang chủ
                <img className='absolute left-[70px]' src={IconPrevios} alt="" />
                </Link>
            </div>
            <div className='mt-20'>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}

export default ListEatery;
