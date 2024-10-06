import React from 'react';
import HeaderHS1 from '../../components/header/headerHSmini/headerHS1';
import ListProduct from '../../components/product/list-product';

function HomeStore() {
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS1 />
            </div>
            <div>
                <ListProduct />
            </div>
        </div>
    );
}

export default HomeStore;
