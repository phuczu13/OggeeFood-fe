
import React, { useState } from 'react';
import ImgSlide1 from '../../assets/png/slide1.png';
import ImgSlide2 from '../../assets/png/slide2.png';
import HeaderHC1 from "../../components/homepage/headerHC1";
import IconRating from "../../assets/svg/icon_rating.svg";


const HomePage = () => {
    
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
      // Add more products...
  ]);




    const [currentIndex, setCurrentIndex] = useState(0);
  
    const images = [ImgSlide1, ImgSlide2];
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div>
        <div>
            <HeaderHC1 />
        </div>
        <div className="w-full my-10 max-w-[1200px] mx-auto flex">
          <div className="relative overflow-hidden max-w-[880px]">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="w-[880px] h-[330px] object-cover"
            />

            <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full focus:outline-none"
            >
              <img src="" alt="Lùi" />
            </button>
    
            <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full focus:outline-none"
            >
              <img src="" alt="Tiến" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
                <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#ff7e00]' : 'bg-gray-400'}`}
                />
            ))}
            </div>
          </div>
          <div className='ml-[10px]'> 
            <div>
              <img className='h-[160px] w-[310px] object-cover' src="https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv9c7ybqhzt32@resize_ss280x175!@crop_w280_h175_cT" alt="" />
            </div>
            <div className='mt-[10px]'>
              <img className='h-[160px] w-[310px] object-cover' src="https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv9c7ybqhzt32@resize_ss280x175!@crop_w280_h175_cT" alt="" />  
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto">
          <div className='w-full flex items-center'>
            <span className='text-[#ff7e00] text-xl w-1/5 font-semibold'>Món ăn nổi bật</span>
            <div className='bg-[#ff7e00] w-full h-[1px]'></div>
          </div>
          <div className='mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                  <div key={product.id} className="border p-3 rounded-lg shadow-sm">
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
                          </div>
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  
