import React, { useState } from 'react';
import IconBack from '../../assets/svg/icon_previos.svg';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderHS1 from '../header/headerHSmini/headerHS1';
import Footer from '../../../users/components/homepage/footer';

const DetailProduct = () => {

  const [product, setProduct] = useState({
    Food_picture: 'https://vandieuhay.net/wp-vdh/uploads/2022/08/internet-1.jpg',
    Food_name: 'Bún bò Huế',
    Food_detail: 'Bún bò Huế truyền thống với hương vị đậm đà và thịt bò tươi ngon.',
    Price: 35000,
  });
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [productReviews, setProductReviews] = useState([
    {
      id: 1,
      userAvatar: "https://i.pinimg.com/564x/45/b6/fa/45b6fa403c4dd5f8f09a58a7d6d7453a.jpg",
      userName: "Nguyễn Văn A",
      rating: 4.9,
      comment: "Bún ngon lắm ạ!",
      date: "13-06-2024",
      time: "22:02",
      category: "Bún",
      images: ["https://cdn3.ivivu.com/2022/09/bun-bo-hue-ivivu-3-1024x683.jpg"],
      reply: null,
    },
    {
      id: 2,
      userAvatar: "https://i.pinimg.com/736x/9d/43/2b/9d432b8489adc002d07ffeac2015f8cc.jpg",
      userName: "Trần Thị B",
      rating: 4.7,
      comment: "Thơm và vừa miệng, rất ngon!",
      date: "10-06-2024",
      time: "18:45",
      category: "Bún",
      images: ["https://example.com/image2.jpg"],
      reply: "Cảm ơn quý khách đã ủng hộ Bún bò Phúc du, chúc quý khách ngon miệng ạ!",
    },
  ]);

//   event for reply
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = (reviewId) => {
    setReplyingTo(reviewId); // Set the review being replied to
  };

  const handleCancelReply = () => {
    setReplyingTo(null); // Cancel reply mode
    setReplyText(''); // Clear reply text
  };

  const handleSendReply = (reviewId) => {
    setProductReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, reply: replyText } : review
      )
    );
    setReplyingTo(null); // Exit reply mode
    setReplyText(''); // Clear reply text
    toast.success('Phản hồi đánh giá của khách hàng thành công')
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
                <Link to='/home-store' className='absolute bg-[#fff0d7] hover:bg-[#ef4b2c] hover:border-[#ef4b2c] -top-6 left-[-75px] flex border-2 border-[#ff7e00] w-8 h-8 gap-2 rounded-full justify-center'>
                <img className='w-2' src={IconBack} alt="btnBack" />
                </Link>
                <img className='rounded-sm' src={product.Food_picture} alt="" />
            </div>
            <div className="md:ml-4 md:w-1/2">
                <h1 className="text-2xl font-semibold mb-2">{product.Food_name}</h1>
                <p className="text-gray-600 mb-2">Mô tả: {product.Food_detail}</p>
                <p className="text-xl text-[#ef4b2c] font-semibold mb-4">Giá: {product.Price.toLocaleString()} VND</p>
                <div>
                    Trạng thái: <span className='text-[#ef4b2c]'>Còn món</span>
                </div>
                <div>
                    Số lượng: <span className='text-[#ef4b2c]'>49 tô</span>
                </div>
            </div>
            </div>

            <div className="max-w-[1200px] mx-auto relative mt-10 bg-white p-6">
                <h2 className="text-lg font-bold mb-4">Đánh giá món</h2>
                {productReviews.map(review => (
                    <div key={review.id} className="border p-4 rounded mb-5">
                    <div className="flex items-center mb-2">
                        <img src={review.userAvatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
                        <div className="ml-4">
                        <p className="font-semibold">{review.userName}</p>
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
                        {review.time} <span>{review.date}</span> | Thể loại: {review.category}
                    </p>

                    {/* Display reply if it exists */}
                    {review.reply && (
                        <div className="mt-3 p-3 bg-gray-100 rounded">
                        <p className="text-sm text-gray-600"><strong>Phản hồi từ cửa hàng:</strong> {review.reply}</p>
                        </div>
                    )}

                    {/* Reply and Favorite buttons */}
                    <div className='border-t flex gap-4 py-1 mt-4'>
                        <button className='text-[#ef4b2c]' onClick={handleFavourite}>
                        Yêu thích
                        </button>
                        <button
                        className='text-[#0094df]'
                        onClick={() => handleReplyClick(review.id)}
                        >
                        Trả lời
                        </button>
                    </div>

                    {/* Reply form */}
                    {replyingTo === review.id && (
                        <div className="mt-2">
                        <textarea
                            className="w-full p-2 border rounded resize-none"
                            rows="3"
                            placeholder="Viết phản hồi của cửa hàng..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
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
                            onClick={() => handleSendReply(review.id)}
                            >
                            Gửi
                            </button>
                        </div>
                        </div>
                    )}
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-10'>
            <Footer/>
        </div>
    </div>
  );
};

export default DetailProduct;
