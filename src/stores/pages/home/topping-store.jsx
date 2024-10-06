import React from 'react';
import HeaderHS2 from '../../components/header/headerHSmini/headerHS2';
import ListTopping from '../../../stores/components/topping/list-topping';


function ToppingStore() {
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className='mb-5'>
                <HeaderHS2 />
            </div>
            <div>
                <ListTopping />
            </div>
        </div>
    );
}

export default ToppingStore;
