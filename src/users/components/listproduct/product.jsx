import React, { useState, useEffect } from 'react';
import IconRating from "../../assets/svg/icon_rating.svg";
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { Link } from 'react-router-dom';
import HeaderHC1 from '../homepage/headerHC1';
import Footer from '../homepage/footer';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS của Toastify
import IconPrevios from '../../assets/svg/icon_previos.svg';

function Product() {
    const [products, setProducts] = useState([]);

    // Fetch all products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://be-order-food.vercel.app/api/product/getall-products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.data); // Assuming the API response contains a 'data' field
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array to run once on mount

    
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        toast.success("Thêm vào giỏ hàng thành công!");
    };


    return (
        <div>
            <div>
                <HeaderHC1 />
            </div>
            <div className="w-full max-w-[1200px] mx-auto mt-8 p-3 sm:p-0">
                <div className='w-full flex items-center'>
                    <span className='text-[#ff7e00] text-xl w-1/5 font-semibold'>Món ngon nóng hổi</span>
                    <div className='bg-[#ff7e00] w-full h-[1px]'></div>
                </div>
                <div className='mt-8'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link to='/product-detail' key={product._id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                                <div className="relative">
                                    <img src={product.Food_picture} alt={product.Food_name} className="w-full h-[150px] object-cover" />
                                    <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                        <span className="text-black font-semibold">{product.rating}</span>
                                        <span className="ml-1"><img src={IconRating} alt="" /></span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-lg">{product.Food_name} - {product.storeName}</h3>
                                    <p className="text-gray-500 text-sm">{product.Food_detail}</p>
                                    <div className="flex relative justify-between items-center mt-2">
                                        <span className="text-red-500 font-semibold">{product.Price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                        <button onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}><img className='w-[30px] absolute right-0 bottom-1 h-[30px] mr-2' src={IconAddCart} alt="" /></button>
                                    </div>
                                </div>
                            </Link>
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
