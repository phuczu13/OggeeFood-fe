import React from "react";
import ListOrderDriver from "../order-driver/list_order";
import HeaderDriver from "../header/header_driver";
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