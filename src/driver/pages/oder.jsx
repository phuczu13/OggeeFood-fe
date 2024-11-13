import React from "react";
import ListOrderDriver from "../order-driver/list_order";
import HeaderUser from "../header/header_user";
function OrderDriver(){
    return(
        <div>
           <div>
            <HeaderUser></HeaderUser>
           </div>
            <div>
            <ListOrderDriver></ListOrderDriver>
            </div>
        </div>
    );
}

export default OrderDriver;