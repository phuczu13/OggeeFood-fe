import React from 'react';

const DishDetails = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-4">
      {/* Product Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Product Image */}
        <div className="bg-gray-300 w-full h-[300px] flex items-center justify-center">
          Hình
        </div>

        {/* Product Information */}
        <div className="border p-4 rounded-lg">
          <h1 className="text-2xl font-semibold mb-2">Tên món......................</h1>
          <div className="flex items-center mb-2">
            <span className="text-red-500 font-bold text-lg">4.2</span>
            <span className="text-red-500 ml-2">★★★★★</span>
          </div>
          <p className="text-gray-500 mb-4">Mô tả món......................</p>
          <p className="text-xl font-bold mb-4">100.000 VND</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button className="p-2 bg-gray-300 rounded">-</button>
            <span className="mx-4">1</span>
            <button className="p-2 bg-gray-300 rounded">+</button>
          </div>

          {/* Add to Cart Button */}
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center">
            <span role="img" aria-label="cart">🛒</span> Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Đánh giá món</h2>

        {/* Single Review */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <img
              src="/path/to/avatar.png"
              alt="avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">Tên khách hàng</h3>
              <div className="flex items-center">
                <span className="text-red-500 font-bold">4.2</span>
                <span className="text-red-500 ml-2">★★★★☆</span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <p className="text-gray-700 mb-4">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...</p>

          {/* Review Images */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-300 w-full h-24 flex items-center justify-center">Hình</div>
            <div className="bg-gray-300 w-full h-24 flex items-center justify-center">Hình</div>
            <div className="bg-gray-300 w-full h-24 flex items-center justify-center">Hình</div>
            <div className="bg-gray-300 w-full h-24 flex items-center justify-center">Hình</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
