import React, { useEffect, useState } from 'react';
import ImgSlide1 from '../../assets/png/slide1.png';
import ImgSlide2 from '../../assets/png/slide2.png';
import HeaderHC1 from "../../components/homepage/headerHC1";
import Footer from "../../components/homepage/footer";
import ListProduct from '../../components/listproduct/list-product';
import IconPrevios from '../../assets/svg/icon_previos.svg';
import IconNext from '../../assets/svg/icon_next.svg';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const HomePage = () => {
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  console.log("userId at home is "+userId)

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
    <div className="md:px-0">
      <HeaderHC1 />
      <div className="w-full px-3 sm:px-0 my-10 max-w-[1200px] justify-between mx-auto flex flex-col md:flex-row">
        <div className="relative overflow-hidden max-w-[880px]">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-[880px] h-[330px] object-cover rounded-lg"
          />

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none shadow-md"
          >
            <img className='w-3' src={IconPrevios} alt="" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none shadow-md"
          >
            <img className='w-3' src={IconNext} alt="Next" />
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
        <div className='mt-3 md:mt-0 flex flex-col'> 
          <div className=''>
            <img className='h-[160px] w-full sm:w-[310px] border object-cover rounded-md' src="https://food-cms.grab.com/compressed_webp/merchants/5-C6WFNP6CGAKVGX/hero/843f7929b66e48e5a2fa4c98b6961c23_1726657138029678869.webp" alt="" />
          </div>
          <div className='mt-[10px]'>
            <img className='h-[160px] w-full sm:w-[310px] border object-cover rounded-md' src="https://png.pngtree.com/png-vector/20240321/ourlarge/pngtree-cute-chefs-make-bread-png-image_12021205.png" alt="" />  
          </div>
        </div>
      </div>

      <div className='px-6'>
        <ListProduct />
      </div>
      
      <div className='mt-10 w-full max-w-[350px] mx-auto flex justify-center '>
        <Link to='/product' className='hover:ring-[#ff7e00] hover:outline-none hover:ring-2 relative p-3 border flex items-center justify-center font-semibold text-[18px] border-[#F8E7CC] text-[#ff7e00] rounded-full w-full'>
          Xem tất cả các món
          <img className='absolute right-[70px]' src={IconNext} alt="" />
        </Link>
      </div>

      <div className='mt-[50px]'>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
