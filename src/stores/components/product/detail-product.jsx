import React, { useState, useEffect } from 'react';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderHS1 from '../header/headerHSmini/headerHS1';
import Footer from '../../../users/components/homepage/footer';

const DetailProduct = () => {
  const location = useLocation();
  const storeId = location.state?.storeId; 
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const productId = location.state?.productId;
  
  useEffect(() => {
    if (productId) {
      console.log("Product ID inside useEffect:", productId);
  
      // Fetch reviews from API
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`https://be-order-food.vercel.app/api/rating/product/${productId}`);
          console.log("Reviews response:", response.data);
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
  
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`https://be-order-food.vercel.app/api/product/get-product/${productId}`);
          console.log("Product details response:", response.data.data);
          setProduct(response.data.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
          toast.error('Failed to fetch product details.');
        }
      };
  
      fetchReviews();
      fetchProductDetails();
    }
  }, [productId]);
  
  const [response, setResponse] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleResponseSubmit = async (reviewId) => {
    try {
        await axios.post(`https://be-order-food.vercel.app/api/rating/respond/${reviewId}`, { response });
        setReviews(reviews.map(review => review._id === reviewId ? { ...review, response } : review));
        setResponse('');
    } catch (error) {
        console.error('Error submitting response:', error);
    }
    setReplyingTo(null); // Exit reply mode
    setResponse(''); // Clear reply text
    toast.success('Phản hồi đánh giá của khách hàng thành công')
};

//   event for reply
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReplyClick = (reviewId) => {
    setReplyingTo(reviewId); // Set the review being replied to
  };

  const handleCancelReply = () => {
    setReplyingTo(null); // Cancel reply mode
    setResponse(''); // Clear reply text
  };

  const handleFavourite = () => {
    toast.success("Yêu thích đánh giá của khách hàng thành công")
  }
  return (
    <div className='bg-[#F5F5F5]'>
        <div>
            <HeaderHS1 />
        </div>
        <div className="max-w-[1200px] mx-auto p-4 relative mt-10">
            <ToastContainer position='top-right'/>
            <div className="md:flex items-start p-6 bg-white">
            <div className="bg-gray-200 relative w-full mb-4 md:mb-0 md:w-1/2">
                <Link to='/home-store' state={{ storeId }} className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] -top-6 left-[-75px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'>
                <img className='w-2' src={IconBack} alt="btnBack" />
                </Link>
                <img className='rounded-sm' src={product?.Food_picture || ''} alt="" />
            </div>
            <div className="md:ml-4 md:w-1/2">
                <h1 className="text-2xl font-semibold mb-2">{product?.Food_name || ''}</h1>
                <p className="text-gray-600 mb-2">Mô tả: {product?.Food_detail || ''}</p>
                <p className="text-xl text-[#ef4b2c] font-semibold mb-4">Giá: {product?.Price.toLocaleString() || ''} VND</p>
                <div>
                    Trạng thái: <span className='text-[#ef4b2c]'>{product?.Food_status || ''}</span>
                </div>
                {/* <div>
                    Số lượng: <span className='text-[#ef4b2c]'>49 tô</span>
                </div> */}
            </div>
            </div>

            <div className="max-w-[1200px] mx-auto relative mt-10 bg-white p-6">
              <h2 className="text-lg font-bold mb-4">Đánh giá món</h2>

              {/* Kiểm tra nếu reviews không có đánh giá */}
              {reviews.length === 0 ? (
                  <p className="text-gray-500">Sản phẩm chưa có đánh giá</p>
              ) : (
                  reviews.map((review, index) => (
                      <div key={review._id} className="border p-4 rounded mb-5">
                          <div className="flex items-center mb-2">
                              <img src={review.customerId.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                              <div className="ml-4">
                                  <p className="font-semibold">{review.customerId.name}</p>
                                  <p className="text-sm text-gray-500">{review.rating} ⭐⭐⭐⭐⭐</p>
                              </div>
                          </div>
                          <p>{review.comment}</p>
                          <div className="grid grid-cols-3 gap-2 mt-3">
                              {review.images.map((image, index) => (
                                  <img key={index} className="rounded-sm" src={image} alt="" />
                              ))}
                          </div>
                          <p className='text-[13px] text-[#939393] mt-2'>
                              {new Date(review.createdAt).toLocaleTimeString()} 
                              <span> {new Date(review.createdAt).toLocaleDateString()}</span> | Thể loại: Bún                                         
                          </p>

                          {/* Display reply if it exists */}
                          {review.response && (
                              <div className="mt-3 p-3 bg-gray-100 rounded">
                                  <p className="text-sm text-gray-600"><strong>Phản hồi từ cửa hàng:</strong> {review.response}</p>
                              </div>
                          )}

                          {/* Reply and Favorite buttons */}
                          <div className='border-t flex gap-4 py-1 mt-4'>
                              <button className='text-[#ef4b2c]' onClick={handleFavourite}>
                                  Yêu thích
                              </button>
                              <button
                                  className='text-[#0094df]'
                                  onClick={() => handleReplyClick(review._id)}
                              >
                                  Trả lời
                              </button>
                          </div>

                          {/* Reply form */}
                          {replyingTo === review._id && (
                              <div className="mt-2">
                                  <textarea
                                      className="w-full p-2 border rounded resize-none"
                                      rows="3"
                                      placeholder="Viết phản hồi của cửa hàng..."
                                      value={response}
                                      onChange={(e) => setResponse(e.target.value)}
                                  />
                                  <div className="flex justify-end gap-2 mt-2">
                                      <button
                                          className="text-gray-500 hover:bg-gray-300 px-4 py-1"
                                          onClick={handleCancelReply}
                                      >
                                          Hủy
                                      </button>
                                      <button
                                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                          onClick={() => handleResponseSubmit(review._id)}
                                      >
                                          Gửi
                                      </button>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))
              )}
          </div>

        </div>
        <div className='mt-10'>
            <Footer/>
        </div>
    </div>
  );
};

export default DetailProduct;
