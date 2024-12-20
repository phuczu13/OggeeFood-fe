import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import IconRating from "../../assets/svg/icon_rating.svg";
import IconAddCart from "../../assets/svg/icon_addCart.svg";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ListProduct() {
    const [products, setProducts] = useState([]); // Ban đầu để trống
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi
    const userId = localStorage.getItem('userId');

    // Hàm gọi API để lấy dữ liệu sản phẩm ngẫu nhiên
    const fetchRandomProducts = async () => {
        try {
            const response = await axios.get('https://be-order-food.vercel.app/api/product/get-randompro'); // API URL từ backend
            console.log(response.data.data);
            const filteredProducts = response.data.data.filter(product => 
                product.Food_name && product.Food_detail && product.Price && product.Food_picture);
            setProducts(filteredProducts); // Cập nhật sản phẩm
            setLoading(false); // Tắt loading sau khi có dữ liệu
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };


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
    
    // Gọi API khi component được render lần đầu
    useEffect(() => {
        fetchRandomProducts();
    }, []);

    if (loading) {
        return <p className='text-[18px] flex justify-center items-center'>Bạn đợi chút nhé...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <ToastContainer />
            <div className='w-full flex items-center'>
                <span className='text-[#ff7e00] text-xl w-3/5 sm:w-1/5 font-semibold'>Món ăn nổi bật</span>
                <div className='bg-[#ff7e00] w-full h-[1px]'></div>
            </div>
            <div className='mt-10'>
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
    );
}
export default ListProduct;
