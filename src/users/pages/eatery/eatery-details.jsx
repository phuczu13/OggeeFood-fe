import React, { useState } from 'react';
import HeaderHC2 from '../../components/homepage/headerHC2';
import Footer from '../../components/homepage/footer';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link } from 'react-router-dom';
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconRating from "../../assets/svg/icon_rating.svg";

const menuData = {
  mon1: [
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://www.cotrang.org/public/images/tin_dang/6/283_bun-bo-hue-bk-3.jpg', 
    },
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://monngonbinhdinh.vn/Images/images/ganh_dhangng_.jpg', 
    },
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://www.cotrang.org/public/images/tin_dang/6/283_bun-bo-hue-bk-3.jpg', 
    },
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://monngonbinhdinh.vn/Images/images/ganh_dhangng_.jpg', 
    },
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://www.cotrang.org/public/images/tin_dang/6/283_bun-bo-hue-bk-3.jpg', 
    },
    {
      name: 'Bún Bò Đặc Biệt',
      description: 'Tái, Nạm, Gân',
      price: '50.000',
      rating: '4.9',
      imgUrl: 'https://monngonbinhdinh.vn/Images/images/ganh_dhangng_.jpg', 
    },
  ],

  mon2: [
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://nethue.com.vn/uploaded/san%20pham/bun%20bo%20Hue%20so%201.png', 
    },
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://product.hstatic.net/200000294188/product/bun-bo-hue_cf91a28b45364ebbb54201101a63e8c6_large_166abda8dcfb467fba091e89c6832906_master.png', 
    },
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://nethue.com.vn/uploaded/san%20pham/bun%20bo%20Hue%20so%201.png', 
    },
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://product.hstatic.net/200000294188/product/bun-bo-hue_cf91a28b45364ebbb54201101a63e8c6_large_166abda8dcfb467fba091e89c6832906_master.png', 
    },
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://nethue.com.vn/uploaded/san%20pham/bun%20bo%20Hue%20so%201.png', 
    },
    {
      name: 'Bún Bò Tái',
      description: 'Thịt Tái',
      price: '30.000',
      rating: '4.7',
      imgUrl: 'https://product.hstatic.net/200000294188/product/bun-bo-hue_cf91a28b45364ebbb54201101a63e8c6_large_166abda8dcfb467fba091e89c6832906_master.png', 
    },
  ],

  mon3: [
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/08/cach-nau-bun-bo-hue.jpg',
    },
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://dienmaynewsun.com/wp-content/uploads/2021/03/bun-bo-hue.jpg',
    },
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/08/cach-nau-bun-bo-hue.jpg',
    },
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://dienmaynewsun.com/wp-content/uploads/2021/03/bun-bo-hue.jpg',
    },
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://www.huongnghiepaau.com/wp-content/uploads/2017/08/cach-nau-bun-bo-hue.jpg',
    },
    {
      name: 'Bún Bò Giò',
      description: 'Giò Khoanh',
      price: '40.000',
      rating: '4.8',
      imgUrl: 'https://dienmaynewsun.com/wp-content/uploads/2021/03/bun-bo-hue.jpg',
    },
    
  ],
};

function EateryDetails() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const [activeSection, setActiveSection] = useState('mon1');

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div>
      <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} />
      <HeaderHC2 />
      <div className="max-w-[1200px] mx-auto mt-10">
        <div className=" relative bg-cover rounded-md bg-center h-[300px] mt-6">
          <img 
            className="absolute inset-0 w-full h-full object-cover rounded-md" 
            src="https://i.ytimg.com/vi/SHS3434gl48/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBrjbDvwidBmis2oyWEardxBmBiCg" 
            alt="imgEatery" 
          />
          <Link to='/eatery' className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] top-0 left-[-50px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'>
            <img className='w-2' src={IconBack} alt="btnBack" />
          </Link>
          <div className="absolute inset-0 rounded-md bg-black opacity-50"></div>  
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold">Bún Bò Phúc Du</h1>
            <p className="mt-3">Bún - Phở - Cháo, Cơm, Lẩu & Nướng - Quay</p>
            <p className="mt-1">74/18 Phan Văn Hớn, Quận 12</p>
            <div className="mt-4 flex space-x-4">
              <span>⭐ 4.8</span>
              <span>📍 1.3 km</span>
              <span>⏰ Hàng ngày 07:00 - 20:30</span>
            </div>
          </div>
        </div>

        {/* Menu Header */}
        <div className='w-full flex items-center mt-8 mb-4'>
          <span className='text-[#ff7e00] text-xl w-3/5 sm:w-1/5 font-semibold'>Thực đơn của quán</span>
          <div className='bg-[#ff7e00] w-full h-[1px]'></div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 py-5">
            <ul className="space-y-4 text-[#ff7e00] text-center bg-[#fff0d7] border-[#ff7e00] border-2 px-5 py-5 mr-4 sticky top-4">
              <li className=''>
                <a 
                  href="#mon1" 
                  className={`text-xl hover:text-[#ef4b2c] ${activeSection === 'mon1' ? 'border-b-2 border-[#ef4b2c] text-[#ef4b2c]' : ''}`} 
                  onClick={() => handleSectionClick('mon1')}
                >
                  Món ăn nổi bật
                </a>
              </li>
              <li>
                <a 
                  href="#mon2" 
                  className={`text-xl hover:text-[#ef4b2c] pb-[2px] ${activeSection === 'mon2' ? 'border-b-2 border-[#ef4b2c] text-[#ef4b2c]' : ''}`} 
                  onClick={() => handleSectionClick('mon2')}
                >
                  Buổi sáng năng lượng
                </a>
              </li>
              <li>
                <a 
                  href="#mon3" 
                  className={`text-xl hover:text-[#ef4b2c] ${activeSection === 'mon3' ? 'border-b-2 border-[#ef4b2c] text-[#ef4b2c]' : ''}`} 
                  onClick={() => handleSectionClick('mon3')}
                >
                  Buổi trưa vui vẻ
                </a>
              </li>
            </ul>
          </div>



          <div className="w-3/4 mt-3">
            <section id="mon1" className="">
              <h2 className="text-2xl font-semibold mb-4">Món ăn nổi bật</h2>
              <div className="grid grid-cols-3 gap-6">
                {menuData.mon1.map((dish, index) => (
                  <Link to='/product-detail' key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img  src={dish.imgUrl} alt={dish.name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.name}</h3>
                      <p className="text-gray-500 text-sm">{dish.description}</p>
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.price} VND</span>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCart(dish); }}>
                              <img className='w-[30px] absolute right-0 bottom-0 h-[30px]' src={IconAddCart} alt="icon_add_cart" />
                          </button>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </section>

            <section id="mon2" className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Buổi sáng năng lượng</h2>
              <div className="grid grid-cols-3 gap-6">
                {menuData.mon2.map((dish, index) => (
                  <Link to='/product-detail' key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={dish.imgUrl} alt={dish.name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.name}</h3>
                      <p className="text-gray-500 text-sm">{dish.description}</p>
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.price} VND</span>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCart(dish); }}>
                              <img className='w-[30px] absolute right-0 bottom-0 h-[30px]' src={IconAddCart} alt="icon_add_cart" />
                          </button>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </section>

            <section id="mon3" className="my-8">
              <h2 className="text-2xl font-semibold mb-4">Buổi trưa vui vẻ</h2>
              <div className="grid grid-cols-3 gap-6">
                {menuData.mon3.map((dish, index) => (
                  <Link to='/product-detail' key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={dish.imgUrl} alt={dish.name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.name}</h3>
                      <p className="text-gray-500 text-sm">{dish.description}</p>
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.price} VND</span>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCart(dish); }}>
                              <img className='w-[30px] absolute right-0 bottom-0 h-[30px]' src={IconAddCart} alt="icon_add_cart" />
                          </button>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EateryDetails;
