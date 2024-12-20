import React, { useState, useEffect } from 'react';
import IconRating from "../../assets/svg/icon_rating.svg";
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { Link } from 'react-router-dom';
import HeaderHC1 from '../homepage/headerHC1';
import Footer from '../homepage/footer';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS của Toastify
import IconPrevios from '../../assets/svg/icon_previos.svg';
import axios from 'axios'; // Import axios


function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    const userId = localStorage.getItem('userId');

    // Fetch all products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://be-order-food.vercel.app/api/product/getall-products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const filteredProducts = data.data.filter(product => 
                    product.Food_name && product.Food_detail && product.Price && product.Food_picture);
                setProducts(filteredProducts); // Assuming the API response contains a 'data' field
                setLoading(false); // Tắt loading sau khi có dữ liệu
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to run once on mount

    
    const [cart, setCart] = useState([]);

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

    if (loading) {
        return <p className='w-full text-[18px] font-semibold text-[#ff7e00] h-screen flex justify-center items-center'>Bạn đợi chút nhé :3</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <div>
                <HeaderHC1 />
            </div>
            <div className="w-full max-w-[1200px] mx-auto sm:mt-8 p-6 sm:p-0">
                <div className='w-full flex items-center'>
                    <span className='text-[#ff7e00] text-xl w-4/5 sm:w-1/5 font-semibold'>Món ngon nóng hổi</span>
                    <div className='bg-[#ff7e00] w-full h-[1px]'></div>
                </div>
                <div className='mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div className="border border-[#f1b452] hover:ring-[#e67350] flex flex-col h-full hover:outline-none p-3 rounded-lg shadow-sm transition-transform duration-250 transform hover:scale-105">
                                <Link to={`/product-detail`} state={ {productId : product._id} } key={product._id} className="relative">
                                    <img src={product.Food_picture} alt={product.Food_name} className="w-full h-[150px] object-cover" />
                                    <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                        <span className="text-black font-semibold">{product.rating}</span>
                                        <span className="ml-1"><img src={IconRating} alt="" /></span>
                                    </div>
                                </Link>
                                <div className="mt-4 flex-grow">
                                    <h3 className="font-semibold text-lg line-clamp-2">{product.Food_name} - {product.storeName}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-1">{product.Food_detail}</p>
                                </div>
                                <div className="flex relative justify-between text-center items-center mt-2">
                                    <span className="text-red-500 font-semibold">
                                        {product.Price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </span>
                                    <button 
                                        onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                                    >
                                        <img className='w-[30px] absolute right-0 bottom-[-3px] h-[30px]' src={IconAddCart} alt="" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-10 w-full max-w-[350px] mx-auto flex justify-center '>
                <Link to='/home-page' className='hover:ring-[#ff7e00] hover:outline-none hover:ring-2 relative p-3 border flex items-center justify-center font-semibold text-[18px] border-[#F8E7CC] text-[#ff7e00] rounded-full w-full'>
                Trở lại trang chủ
                <img className='absolute left-[70px]' src={IconPrevios} alt="" />
                </Link>
            </div>
            <div className='mt-20'>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}

export default Product;
