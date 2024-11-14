import React from 'react';
import HeaderHS4 from '../../components/header/headerHSmini/headerHS4';
import ListRevenue from '../../components/revenue/list-revenue';
import { useLocation } from "react-router-dom";
import Footer from '../../components/footer/footer';


function RevenueStore() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    console.log("storeId at revenue is "+storeId)

    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS4 />
            </div>
            <div>
                <ListRevenue />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default RevenueStore;
