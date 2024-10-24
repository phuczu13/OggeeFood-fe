import React, { useEffect, useState } from 'react';
import ImgSlide1 from '../../assets/png/slide1.png';
import ImgSlide2 from '../../assets/png/slide2.png';
import HeaderHC1 from "../../components/homepage/headerHC1";
import Footer from "../../components/homepage/footer";
import ListProduct from '../../components/listproduct/list-product';
import IconPrevios from '../../assets/svg/icon_previos.svg'
import IconNext from '../../assets/svg/icon_next.svg'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const HomePage = () => {
  const location = useLocation();
  const userId = location.state?.userId;
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

  // Function to check if user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    if (!token) {
      // If no token is found, redirect to login
      const redirectUri = encodeURIComponent('http://localhost:1306/auth/callback'); // URL to redirect after login
      window.location.href = `https://sso-pointer.vercel.app/authorize?callbackUrl=${redirectUri}`;
    }
  };

  // Run the checkLoginStatus function when the component is mounted
  useEffect(() => {
    checkLoginStatus();
  }, []);

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
            className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none"
          >
            <img className="w-3" src={IconPrevios} alt="Previous" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full focus:outline-none"
          >
            <img className="w-3" src={IconNext} alt="Next" />
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
        <div className="ml-[10px]">
        <div>
            <img
              className="h-[160px] w-[310px] object-cover"
              src="https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv9c7ybqhzt32@resize_ss280x175!@crop_w280_h175_cT"
              alt="Ad"
            />
          </div>
          <div className="mt-[10px]">
            <img
              className="h-[160px] w-[310px] object-cover"
              src="https://down-tx-vn.img.susercontent.com/vn-11134513-7r98o-lsv9c7ybqhzt32@resize_ss280x175!@crop_w280_h175_cT"
              alt="Ad"
            />
          </div>
        </div>
        
    </div>
    <div className="ml-[10px]">      

        <div>
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
    </div>
  );
};

export default HomePage;
