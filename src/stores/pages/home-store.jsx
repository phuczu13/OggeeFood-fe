import React, { useState } from "react";
import HeaderHS from "../components/headerHS";
import ListProducts from '../components/list-product'
import ListToppings from "../components/list-topping";

function HomeStore() {
  // State để lưu danh sách các sản phẩm
  const [products, setProducts] = useState([
    { name: "Bún bò huế", category: "Tái", topping: "Tái, Nạm, Gân" },
    { name: "Phở bò", category: "Tái", topping: "Có hành" }, // Ví dụ thêm món khác
  ]);

  return (
    <div className="bg-[#f1f1f1] w-full h-max pb-20">
      <div>
        <HeaderHS />
      </div>
      <div className="pb-10">
        <ListProducts/>    
      </div>
      <div className="p-4">
        <ListToppings/>    
      </div>
    </div>
  );
}

export default HomeStore;
