import React from "react";
import ListOrderDriver from "../order-driver/list_order";
import HeaderDriver from "../header/header_driver";

const driverId = localStorage.getItem('driverId')
console.log(driverId)
function OrderDriver(){
    return(
        <div>
           <div>
            <HeaderDriver></HeaderDriver>
           </div>
            <div>
            <ListOrderDriver></ListOrderDriver>
            </div>
        </div>
    );
}

export default OrderDriver;