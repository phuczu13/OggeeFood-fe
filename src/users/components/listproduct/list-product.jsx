import React, { useState } from 'react'
import IconRating from "../../assets/svg/icon_rating.svg";
import IconAddCart from "../../assets/svg/icon_addCart.svg";


function ListProduct() {

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Cơm Chiên Dương Châu",
            description: "Nhiều topping kèm theo",
            price: "30.000 VND",
            rating: 4.5,
            image: 'https://top10bienhoa.com/wp-content/uploads/2021/04/com-chien-duong-chau5.png',
        },
        {
            id: 2,
            name: "Cơm Gà Xối Mỡ",
            description: "Đùi lớn",
            price: "40.000 VND",
            rating: 4.9,
            image: 'https://mms.img.susercontent.com/vn-11134513-7r98o-lsvc8luiih0939@resize_ss1242x600!@crop_w1242_h600_cT',
        },
        {
          id: 3,
          name: "Cơm Chiên Dương Châu",
          description: "Nhiều topping kèm theo",
          price: "30.000 VND",
          rating: 4.5,
          image: 'https://top10bienhoa.com/wp-content/uploads/2021/04/com-chien-duong-chau5.png',
        },
        {
            id: 4,
            name: "Cơm Gà Xối Mỡ",
            description: "Đùi lớn",
            price: "40.000 VND",
            rating: 4.9,
            image: 'https://mms.img.susercontent.com/vn-11134513-7r98o-lsvc8luiih0939@resize_ss1242x600!@crop_w1242_h600_cT',
        },
      
    ]);
  

  return (
    <div className="w-full max-w-[1200px] mx-auto">
        <div className='w-full flex items-center'>
            <span className='text-[#ff7e00] text-xl w-1/5 font-semibold'>Món ăn nổi bật</span>
            <div className='bg-[#ff7e00] w-full h-[1px]'></div>
        </div>
        <div className='mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                        <div className="relative">
                            <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover" />
                            <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                <span className="text-black font-semibold">{product.rating}</span>
                                <span className="ml-1"><img src={IconRating} alt="" /></span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-red-500 font-semibold">{product.price}</span>
                                <button><img className='w-[30px] h-[30px] mr-2' src={IconAddCart} alt="" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ListProduct