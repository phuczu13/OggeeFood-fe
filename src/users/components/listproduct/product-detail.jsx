import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import HeaderHC1 from '../../components/homepage/headerHC1';
import Footer from '../../components/homepage/footer';
import { useLocation } from "react-router-dom";

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

  // Handle quantity change
  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle adding to cart
  const addToCart = () => {
    const productToAdd = {
      ...product,
      quantity,
    };
    setCart([...cart, productToAdd]);

    // Show toast notification
    toast.success('Thêm vào giỏ hàng thành công!');
  };

  if (!product) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }
console.log(product)
  return (
    <div>
      <HeaderHC1 />
      <div className="max-w-[1200px] mx-auto p-4 relative mt-10">
        <Toaster position='top-right' />
        
        {/* Product Section */}
        <div className="md:flex items-start">
          {/* Product Image */}
          <div className="bg-gray-200 w-full mb-4 md:mb-0 md:w-1/2">
            <img src={product.Food_picture} alt={product.Food_name} className="w-full h-100 object-cover" />
          </div>
          {/* Product Info */}
          <div className="md:ml-4 md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.Food_name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-red-500 text-xl">4.2</span>
              <span className="text-gray-400 text-sm ml-2">⭐⭐⭐⭐</span>
            </div>
            <p className="text-gray-600 mb-2">{product.Food_detail}</p>
            <p className="text-xl font-semibold mb-4">
              {product.Price ? product.Price.toLocaleString() + ' VND' : 'Giá không khả dụng'}
            </p>

            {/* Quantity */}
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2">Số lượng:</label>
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
              >
                -
              </button>
              <input
                id="quantity"
                type="text"
                value={quantity}
                readOnly
                className="w-10 text-center border-gray-300"
              />
              <button
                onClick={() => handleQuantityChange('increase')}
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Đánh giá món</h2>
          <div className="border p-4 rounded">
            <div className="flex items-center mb-2">
              <img
                src="https://placekitten.com/40/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">Tên khách hàng</p>
                <p className="text-sm text-gray-500">4.2 ⭐⭐⭐⭐</p>
              </div>
            </div>
            <p>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </p>
            {/* Image review placeholders */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div className="bg-gray-200 w-full h-24">
                <p className="text-center pt-8 text-gray-400">Hình</p>
              </div>
              <div className="bg-gray-200 w-full h-24">
                <p className="text-center pt-8 text-gray-400">Hình</p>
              </div>
              <div className="bg-gray-200 w-full h-24">
                <p className="text-center pt-8 text-gray-400">Hình</p>
              </div>
              <div className="bg-gray-200 w-full h-24">
                <p className="text-center pt-8 text-gray-400">Hình</p>
              </div>
            </div>
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
