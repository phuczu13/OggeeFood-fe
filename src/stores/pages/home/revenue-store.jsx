import React from 'react';
import HeaderHS4 from '../../components/header/headerHSmini/headerHS4';
import ListRevenue from '../../components/revenue/list-revenue';

function RevenueStore() {
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS4 />
            </div>
            <div>
                <ListRevenue />
            </div>
        </div>
    );
}

export default RevenueStore;
