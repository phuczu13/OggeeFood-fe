import React from 'react';
import HeaderHS3 from '../../components/header/headerHSmini/headerHS3';
import ListOrder from '../../components/order/list-order';
import { useLocation } from "react-router-dom";


function OrderStore() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    console.log("storeId at order is "+storeId)

    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS3 />
            </div>
            <div>
                <ListOrder />
            </div>
        </div>
    );
}

export default OrderStore;
