import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="max-w-[200px] bg-orange-500 w-full h-full flex flex-col justify-between">
            <div>
                <Link to='/admin' className="text-2xl font-bold text-white flex justify-center py-4">
                    OgeeFood
                    {/* <img src="" alt="LogoWeb" /> */}
                </Link>
                <div className='flex flex-col'>
                    <Link to="/admin/store" className="px-6 py-4 hover:bg-orange-600 text-white">
                        Cửa hàng
                    </Link>
                    <Link to="/admin/driver" className="px-6 py-4 hover:bg-orange-600 text-white">
                        Tài xế
                    </Link>
                    <Link to="/admin/revenue" className="px-6 py-4 hover:bg-orange-600 text-white">
                        Doanh thu
                    </Link>
                </div>
            </div>
            <div>
                <button className="px-6 py-4 w-full bg-red-500 hover:bg-red-600 text-white">
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
