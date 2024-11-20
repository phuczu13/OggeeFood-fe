import React from 'react';
import { Link } from 'react-router-dom';

// Component thống kê tổng số lượng cửa hàng và tài xế
function Stats() {
    const totalStores = 10;  // Giả sử có 10 cửa hàng
    const totalDrivers = 5;  // Giả sử có 5 tài xế

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-500 p-6 text-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Tổng số cửa hàng</h2>
                <p className="text-4xl">{totalStores}</p>
            </div>
            <div className="bg-blue-500 p-6 text-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Tổng số tài xế</h2>
                <p className="text-4xl">{totalDrivers}</p>
            </div>
        </div>
    );
}

function Dashboard() {
    return (
        <div className="bg-white shadow-md h-full rounded p-6">
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            <p>Chào mừng bạn đến với giao diện quản lý.</p>
            <div className='mt-5'>
                <Stats />
            </div>
        </div>
    );
}

export default Dashboard;
