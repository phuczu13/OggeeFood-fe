import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Store from '../dashboard/store';
import Driver from '../dashboard/driver';
import Revenue from '../dashboard/revenue';
import Dashboard from '../dashboard/dashboard';  // Import Dashboard

function Home() {
    return (
        <div className="flex bg-white h-screen">
            <Sidebar />
            <div className="flex-grow max-h-screen h-full">
                {/* Nếu không có route cụ thể, hiển thị Dashboard */}
                <Routes>
                    <Route path="/" element={<Dashboard />} />  {/* Mặc định là trang Dashboard */}
                    <Route path="/store" element={<Store />} />
                    <Route path="/driver" element={<Driver />} />
                    <Route path="/revenue" element={<Revenue />} />
                </Routes>
                <Outlet />
            </div>
        </div>
    );
}

export default Home;
