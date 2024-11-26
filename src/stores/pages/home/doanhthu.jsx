import React, { useEffect, useState } from 'react';
import HeaderHS5 from '../../components/header/headerHSmini/headerHS5';
import axios from 'axios';
import { Button, Modal } from 'antd';
import toast from 'react-hot-toast';
function DoanhThu() {
    const [totalRevenue, settotalRevenue] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    const itemsPerPage = 5;
    const storeId = localStorage.getItem('storeId')
    const fetchsettotalRevenue = async () => {
        const response = await axios.get(`https://be-order-food.vercel.app/api/order/store-revenue/${storeId}`);
        settotalRevenue(response.data.balance); // Assuming the API returns products in 'data'
    }
    useEffect(() => {
        fetchsettotalRevenue()
    }, [])
    const fetchData = async () => {
        const response = await axios.get(`https://be-order-food.vercel.app/api/order/store-revenueex/${storeId}`);
        setData(response.data); // Assuming the API returns products in 'data'
    }
    useEffect(() => {
        fetchData()
    }, [])

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    // Tính toán dữ liệu phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem); // Lấy dữ liệu của trang hiện tại

    // Tổng số trang
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Chuyển trang
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log("email: "+email )
        console.log("amount: "+amount )
        //Rút tiền
        try{
            const rs = axios.post('https://be-order-food.vercel.app/api/payment/with-draw',
                {email: email,
                currency: 'VND',
                amount : amount}
            )
                axios.put(`https://be-order-food.vercel.app/api/store/update-balance/${storeId}`,amount)
                toast.success('Rút tiền thành công')
        }catch{
            toast.error('Lỗi')
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS5 />
            </div>
            <div>
                <div class="flex gap-5 w-full">
                    <div class="flex-[65%] p-5">
                        <div class="mb-5">
                            <h1 class="text-xl font-bold pl-10">Tài Chính</h1>
                            <p class="mt-2 pl-20">Tổng số dư:</p>
                            <div class="flex items-center justify-between mt-2">
                                <p class="text-lg font-semibold pl-24">{totalRevenue?.toLocaleString()} VNĐ</p>
                                <button onClick={showModal} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Rút tiền
                                </button>
                                <Modal title="Bạn muốn rút tiền?" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <div>
                                    <label htmlFor="">Nhập email: </label>
                                    <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='abc@gmail.com' className='border ml-6 px-5 py-1'/>
                                    </div>
                                    <div className='mt-4'>
                                    <label htmlFor="">Nhập số tiền muốn rút: </label>
                                    <input onChange={(e)=>setAmount(e.target.value)} type="text" placeholder='100.000 VND' className='border ml-6 px-5 py-1'/>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <div className="mt-5 bg-gray-100 p-5">
                            <h2 className="text-lg font-bold mb-4">Doanh thu</h2>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-200 px-4 py-2 text-left">Mã đơn hàng</th>
                                            <th className="border border-gray-200 px-4 py-2 text-right">Tổng tiền đơn hàng</th>
                                            <th className="border border-gray-200 px-4 py-2 text-right">Giá trị đơn hàng</th>
                                            <th className="border border-gray-200 px-4 py-2 text-right">Doanh thu</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData?.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                                                <td className="border border-gray-200 px-4 py-2">{item.orderId}</td>
                                                <td className="border border-gray-200 px-4 py-2 text-right">
                                                    {item.totalOrder.toLocaleString()} VNĐ
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-right">
                                                    {item.orderValue.toLocaleString()} VNĐ
                                                </td>
                                                <td className="border border-gray-200 px-4 py-2 text-right">
                                                    {item.storeRevenue.toLocaleString()} VNĐ
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Phân trang */}
                            <div className="flex justify-center items-center mt-4 space-x-2">
                                <button
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Trước
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={`px-4 py-2 ${currentPage === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Tiếp
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex-[35%] p-5">
                        <h2 class="text-lg font-bold mb-4">Giao dịch gần đây</h2>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Logo giao dịch"
                                    class="w-10 h-10 rounded-full mr-4"
                                />
                                <div class="flex-1">
                                    <p class="font-semibold">Rút tiền về ví</p>
                                    <p class="text-gray-500 text-sm">2024-11-22 16:00:33</p>
                                </div>
                                <p class="text-red-500 font-bold">-40,000</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        
    )
}
export default DoanhThu;
