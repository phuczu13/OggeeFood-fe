import React, { useState, useEffect } from 'react';
import HeaderHC2 from '../../components/homepage/headerHC2';
import Footer from '../../components/homepage/footer';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link } from 'react-router-dom';
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconRating from "../../assets/svg/icon_rating.svg";
import { useLocation } from "react-router-dom";
import axios from 'axios';

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
const location = useLocation();
const storeId = location.state?.storeId;
const userId = localStorage.getItem('userId');
const [products, setProducts] = useState();
const [toppings, setToppings] = useState([]);
const [storeInfo, setStoreInfo] = useState({
  storeName: '',
  storeAvatar: '',
  storeAddress: '',
  phoneNumber: '',
  email: '',
  openingTime: '',
  closingTime: ''
});

// Function to convert time from 12-hour format to 24-hour format
const convertTo24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
};

useEffect(() => {
  const fetchStoreInfo = async () => {
    console.log("Fetching store info for ID:", storeId); // Log storeId
    if (!storeId) {
      toast.error("Store ID is missing"); // Notify if storeId is missing
      return;
    }

    try {
      const response = await fetch(`https://be-order-food.vercel.app/api/store/getInforStore/${storeId}`);
      if (!response.ok) {
        throw new Error('Could not fetch store information');
      }
      const data = await response.json();
      console.log("Fetched store data:", data); // Log the fetched data

      // Check if data has the expected fields
      if (data && data.status === 'OK' && data.data) {
        const storeData = data.data; // Assuming the data is inside a 'data' property
        setStoreInfo({
          storeName: storeData.storeName || '',
          storeAvatar: storeData.avatar || '',
          storeAddress: storeData.storeAddress || '',
          phoneNumber: storeData.phoneNumber || '',
          email: storeData.email || '',
          // Convert times to 24-hour format if necessary
          openingTime: convertTo24HourFormat(storeData.openingTime) || '',
          closingTime: convertTo24HourFormat(storeData.closingTime) || ''
        });
      } else {
        throw new Error('Invalid data format');
      }

      // Log the updated storeInfo state
      console.log("Updated storeInfo state:", storeInfo);
    } catch (error) {
      console.error("Error fetching store information:", error);
      toast.error(error.message);
    }
  };

  fetchStoreInfo();
}, [storeId]);

  const fetchProducts = async () => {
      try {
          const response = await axios.get(`https://be-order-food.vercel.app/api/product/get-products-by-store/${storeId}`);
          setProducts(response.data.data); // Assuming the API returns products in 'data'
      } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products.");
      }
  };
  const fetchToppings = async () => {
    try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/topping/get-toppings-by-store/${storeId}`);
        setToppings(response.data.data); // Assuming the API returns toppings in 'data'
    } catch (error) {
        console.error("Error fetching toppings:", error);
        toast.error("Failed to load toppings.");
    }
};
    // Fetch all products when component mounts
    useEffect(() => {
      fetchProducts();
      fetchToppings();
  }, []);
  const [cart, setCart] = useState([]);

  // const handleAddToCart = async (item, isTopping = false) => { 
  //   // `isTopping` để biết đây là sản phẩm chính hay topping
  //   console.log('Item object:', item);
  //   try {
  //       const response = await axios.post('https://be-order-food.vercel.app/api/cart/add-to-cart', {
  //           productId: item._id,
  //           storeId: item.Store_id,
  //           quantity: 1, // Bạn có thể cho phép người dùng chọn số lượng nếu muốn
  //           userId,
  //           isTopping // Thêm trường để backend biết đây là topping hay sản phẩm chính
  //       }, {
  //           headers: {
  //               'Authorization': `Bearer ${localStorage.getItem('token')}` 
  //           }
  //       });

  //       if (response.status === 200) {
  //           setCart([...cart, item]); // Cập nhật giỏ hàng
  //           toast.success("Thêm vào giỏ hàng thành công!");
  //       }
  //   } catch (error) {
  //       console.error('Lỗi khi thêm vào giỏ hàng:', error);
  //       toast.error("Lỗi khi thêm vào giỏ hàng.");
  //   }
  // };
  const handleAddToCart = async (product) => {
    console.log('Product object:', product);
    try {
        const response = await axios.post('https://be-order-food.vercel.app/api/cart/add-to-cart', {
            productId: product._id,
            storeId: product.Store_id,
            quantity: 1, // Bạn có thể cho phép người dùng chọn số lượng nếu muốn
            userId,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có xác thực người dùng
            }
        });

        if (response.status === 200) {
            // Cập nhật giao diện giỏ hàng nếu cần
            setCart([...cart, product]);
            toast.success("Thêm vào giỏ hàng thành công!");
        }
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
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
            src={storeInfo.storeAvatar} 
            alt="imgEatery" 
          />
          <Link to='/eatery' className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] top-0 left-[-50px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'>
            <img className='w-2' src={IconBack} alt="btnBack" />
          </Link>
          <div className="absolute inset-0 rounded-md bg-black opacity-50"></div>  
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl font-bold">{storeInfo.storeName}</h1>
            <p className="mt-3">Bún - Phở - Cháo, Cơm, Lẩu & Nướng - Quay</p>
            <p className="mt-1">{storeInfo.storeAddress}</p>
            <div className="mt-4 flex space-x-4">
              <span>⭐ 4.8</span>
              <span>📍 1.3 km</span>
              <span>⏰ Hàng ngày {storeInfo.openingTime} - {storeInfo.closingTime}</span>
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
                  Món chính
                </a>
              </li>
              <li>
                <a 
                  href="#mon2" 
                  className={`text-xl hover:text-[#ef4b2c] pb-[2px] ${activeSection === 'mon2' ? 'border-b-2 border-[#ef4b2c] text-[#ef4b2c]' : ''}`} 
                  onClick={() => handleSectionClick('mon2')}
                >
                  Món phụ
                </a>
              </li>
              {/* <li>
                <a 
                  href="#mon3" 
                  className={`text-xl hover:text-[#ef4b2c] ${activeSection === 'mon3' ? 'border-b-2 border-[#ef4b2c] text-[#ef4b2c]' : ''}`} 
                  onClick={() => handleSectionClick('mon3')}
                >
                  Buổi trưa vui vẻ
                </a>
              </li> */}
            </ul>
          </div>



          <div className="w-3/4 mt-3">
            <section id="mon1" className="">
              <h2 className="text-2xl font-semibold mb-4">Món chính</h2>
              <div className="grid grid-cols-3 gap-6">
                {products && products.map((dish, index) => (
                  <Link to={`/product-detail`} state={ {productId : dish._id} } key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img  src={dish.Food_picture} alt={dish.Food_name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.Food_name}</h3>
                      <p className="text-gray-500 text-sm">{dish.Food_detail}</p>
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.Price.toLocaleString()} VND</span>
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
              <h2 className="text-2xl font-semibold mb-4">Món phụ</h2>
              <div className="grid grid-cols-3 gap-6">
                {toppings && toppings.map((dish, index) => (
                  <Link to='/product-detail' key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={dish.toppingImage} alt={dish.toppingName} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.toppingName}</h3>
                      {/* <p className="text-gray-500 text-sm">{dish.Food_detail}</p> */}
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.toppingPrice.toLocaleString()} VND</span>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCart(dish); }}>
                              <img className='w-[30px] absolute right-0 bottom-0 h-[30px]' src={IconAddCart} alt="icon_add_cart" />
                          </button>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* <section id="mon3" className="my-8">
              <h2 className="text-2xl font-semibold mb-4">Buổi trưa vui vẻ</h2>
              <div className="grid grid-cols-3 gap-6">
                {menuData.mon3.map((dish, index) => (
                  <Link to='/product-detail' key={index} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={dish.Food_picture} alt={dish.Food_name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{dish.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{dish.Food_name}</h3>
                      <p className="text-gray-500 text-sm">{dish.Food_detail}</p>
                      <div className="flex relative justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">{dish.Price} VND</span>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCart(dish); }}>
                              <img className='w-[30px] absolute right-0 bottom-0 h-[30px]' src={IconAddCart} alt="icon_add_cart" />
                          </button>
                      </div>
                  </div>
                  </Link>
                ))}
              </div>
            </section> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EateryDetails;
