import React, { useState } from 'react';
import HeaderHC1 from '../../components/homepage/headerHC1'
import Footer from '../../components/homepage/footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toastify

const ProductDetail = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: 'Bún Bò Huế',
    description: 'Thịt Bò Tái',
    price: 30000,
    image: 'https://nethue.com.vn/uploaded/tin-tuc-biquyet-1.jpg',
  };

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

    toast.success('Thêm vào giỏ hàng thành công!');
  };

  return (
    <div>
        <div>
            <HeaderHC1 />
        </div>
        <div className="max-w-[1200px] mx-auto p-4 relative mt-10">
            <ToastContainer position='top-right'/>

            <div className="md:flex items-start">
                <div className="bg-gray-200 w-full mb-4 md:mb-0 md:w-1/2">
                <img className='rounded' src={product.image} alt="" />
                </div>
                <div className="md:ml-4 md:w-1/2">
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                    <span className="text-red-500 text-xl">4.9</span>
                    <span className="text-gray-400 text-sm ml-2">⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-semibold mb-4">{product.price.toLocaleString()} VND</p>

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
                    src="https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/461185481_1058397005800455_8112413207197525059_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=s0m5LenacggQ7kNvgG77VTl&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&_nc_gid=AcUuiCeylrAJoPXQBicK9b1&oh=00_AYA_s4kzTxWxBXytGtgwbUqMhenvaxyHtUfkubITRSKzRA&oe=671F6DF5"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                    <p className="font-semibold">Tên khách hàng</p>
                    <p className="text-sm text-gray-500">4.9 ⭐⭐⭐⭐</p>
                    </div>
                </div>
                <p>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </p>
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
