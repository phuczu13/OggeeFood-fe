
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
  const userId = localStorage.getItem('userId');
  const productId = location.state?.productId;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    // Fetch reviews from API
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://be-order-food.vercel.app/api/rating/product/${productId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    fetchReviews();
  }, [productId]);

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

  const [cart, setCart] = useState([]);

  const handleAddToCart = async (products) => {
        console.log('Product object:', products);
        try {
            const response = await axios.post('https://be-order-food.vercel.app/api/cart/add-to-cart', {
                productId: productId,
                storeId: product.Store_id,
                quantity: quantity, // Bạn có thể cho phép người dùng chọn số lượng nếu muốn
                userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có xác thực người dùng
                }
            });
    
            if (response.status === 200) {
                // Cập nhật giao diện giỏ hàng nếu cần
                setCart([...cart, products]);
                toast.success("Thêm vào giỏ hàng thành công!");
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            toast.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
        }
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
                onClick={handleAddToCart}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
                Thêm vào giỏ hàng
            </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Đánh giá món</h2>
            {reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded mb-4">
                    <div className="flex items-center mb-2">
                        <img
                            src={review.customerId.avatar || 'default-avatar.png'}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                            <p className="font-semibold">{review.customerId.name}</p>
                            <p className="text-sm text-gray-500">{review.rating} ⭐⭐⭐⭐⭐</p>
                        </div>
                    </div>
                    <p>{review.comment}</p>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {review.images.map((image, idx) => (
                            <div key={idx}>
                                <img className="rounded-sm" src={image} alt={`Review image ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                    <p className="text-[13px] text-[#939393] mt-2">
                        {new Date(review.createdAt).toLocaleTimeString()} 
                        <span> {new Date(review.createdAt).toLocaleDateString()}</span> | Thể loại: Bún
                    </p>
                </div>
            ))}
          </div>
          
        </div>
        <div className='mt-10'>
          <Footer />
        </div>
    </div>
  );
};

export default ProductDetail;
