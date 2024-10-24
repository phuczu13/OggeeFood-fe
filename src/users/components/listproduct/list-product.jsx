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
            const response = await axios.get('http://localhost:3002/api/product/get-randompro'); // API URL từ backend
            console.log(response.data.data);
            setProducts(response.data.data); // Cập nhật sản phẩm
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
            const response = await axios.post('http://localhost:3002/api/cart/add-to-cart', {
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
        return <p>Loading...</p>;
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
                        <Link to={`/product-detail`} state={ {productId : product._id} } key={product._id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
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
                                    <span className="text-red-500 font-semibold">
                                        {product.Price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                    </span>
                                    <button onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}><img className='w-[30px] absolute right-0 bottom-1 h-[30px] mr-2' src={IconAddCart} alt="" /></button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
