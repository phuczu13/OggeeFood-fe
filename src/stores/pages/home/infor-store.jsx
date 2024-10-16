import React from 'react';
import HeaderHS5 from '../../components/header/headerHSmini/headerHS5';
import StoreInfo from '../../components/account/store-infor';
import { useLocation } from "react-router-dom";


function InforStore() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    console.log("storeId at in4 store is "+storeId)

    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS5 />
            </div>
            <div>
                <StoreInfo />
            </div>
        </div>
    );
}

export default InforStore;
