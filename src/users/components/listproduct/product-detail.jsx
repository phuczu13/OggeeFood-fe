
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link } from 'react-router-dom';
import IconMinus from '../../assets/svg/icon_minus.svg';
import IconPlus from '../../assets/svg/icon_plusOrange.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderHC1 from '../../components/homepage/headerHC1';
import Footer from '../../components/homepage/footer';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({ match }) => {
  const location = useLocation();
  const productId = location.state?.productId;
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/product/get-product/${productId}`);
        setProduct(response.data.data); // Assuming the API returns the product details directly
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Failed to fetch product details.');
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
    };
    setCart([...cart, productToAdd]);

    toast.success('Thêm vào giỏ hàng thành công!');
  };

  if (!product) {
    return <div className='flex text-center items-center text-xl justify-center h-screen'>Loading...</div>;
  }
console.log(product)
  return (
    <div>
        <div>
            <HeaderHC1 />
        </div>
        <div className="max-w-[1200px] mx-auto p-4 relative mt-10">
          <ToastContainer position='top-right'/>
          <div className="md:flex items-start">
            <div className="bg-gray-200 relative w-full mb-4 md:mb-0 md:w-1/2">
              <Link to='/product' className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] top-0 left-[-50px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'>
                <img className='w-2' src={IconBack} alt="btnBack" />
              </Link>
              <img className='rounded' src={product.Food_picture} alt="" />
            </div>
            <div className="md:ml-4 md:w-1/2">
            <h1 className="text-2xl font-semibold mb-2">{product.Food_name}</h1>
            <div className="flex items-center gap-5 mb-4">
              <div className='flex items-center'>
                <span className="text-red-500 text-lg">Đánh giá: 4.9</span>
                <span className="text-gray-400 ml-2">⭐⭐⭐⭐</span>
              </div>
              <div className='flex items-center'>
                <span className="text-red-500 text-lg">Đã bán</span>
                <span className="text-gray-400 text-lg ml-2">199 Tô</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">Mô tả: {product.Food_detail}</p>
            <p className="text-xl font-semibold mb-4">Giá: {product.Price.toLocaleString()} VND</p>
            <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">Số lượng:</label>
                <div className='border flex py-1 '>
                  <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="text-gray-700 px-2 py-1 rounded-l"
                  >
                    <img src={IconMinus} alt="" />
                  </button>
                  <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 h-full focus:outline-none text-center border-gray-300"
                  />
                  <button
                  onClick={() => handleQuantityChange('increase')}
                  className="px-2 py-1 rounded-r"
                  >
                    <img src={IconPlus} alt="" />
                  </button>
                </div>
            </div>

            <button
                onClick={addToCart}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
                Thêm vào giỏ hàng
            </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Đánh giá món</h2>
            <div className="border p-4 rounded">
              <div className="flex items-center mb-2">
                  <img
                  src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/461185481_1058397005800455_8112413207197525059_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SfvOndml2OMQ7kNvgFg5I0q&_nc_zt=23&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AqYeJVo_fzKd8CNrZc3wIdI&oh=00_AYBIlaRMIWS2_o1OUsos2JitUmase4mOTuz8ykWBE4orQQ&oe=6728E0B5"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                  <p className="font-semibold">Tên người dùng</p>
                  <p className="text-sm text-gray-500">4.9 ⭐⭐⭐⭐⭐</p>
                  </div>
              </div>
              <p>
                  Bún ngon lắm ạ!
              </p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                  <div >
                    <img className="rounded-sm" src="https://cdn3.ivivu.com/2022/09/bun-bo-hue-ivivu-3-1024x683.jpg" alt="" />
                  </div>
              </div>
              <p className='text-[13px] text-[#939393] mt-2'>
                22:02 <span>13-06-2024</span> | Thể loại: Bún
              </p>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <Footer />
        </div>
    </div>
  );
};

export default ProductDetail;
