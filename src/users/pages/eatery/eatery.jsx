import React, { useState } from 'react';
import HeaderHC2 from "../../components/homepage/headerHC2";


const Eatery = () => {
  // Example data: list of 7 restaurants
  const restaurants = [
    { name: 'Quán 1', address: 'Địa chỉ 1' },
    { name: 'Quán 2', address: 'Địa chỉ 2' },
    { name: 'Quán 3', address: 'Địa chỉ 3' },
    { name: 'Quán 4', address: 'Địa chỉ 4' },
    { name: 'Quán 5', address: 'Địa chỉ 5' },
    { name: 'Quán 6', address: 'Địa chỉ 6' },
    { name: 'Quán 7', address: 'Địa chỉ 7' },
  ];

  // State to track the current starting index
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 restaurants at a time

  // Function to move to the next slide
  const nextSlide = () => {
    // Calculate new index by shifting one restaurant at a time
    setStartIndex((prevIndex) => (prevIndex + 1) % restaurants.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    // Move back by one item, or loop to the end if at the start
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? restaurants.length - 1 : prevIndex - 1
    );
  };

  // Create a slice of the restaurants array starting from startIndex
  const getVisibleRestaurants = () => {
    const endIndex = startIndex + itemsPerPage;

    // If the end index exceeds the array length, we need to loop the array
    if (endIndex <= restaurants.length) {
      return restaurants.slice(startIndex, endIndex);
    } else {
      // Slice up to the end, and then slice from the beginning of the array to fill up to 4 items
      return [
        ...restaurants.slice(startIndex, restaurants.length),
        ...restaurants.slice(0, endIndex - restaurants.length),
      ];
    }
  };

  return (
    <div>
      <div>
        < HeaderHC2 />
      </div>
      <div className="relative w-full max-w-[1200px] mx-auto">
        <h2 className="text-xl font-bold mb-4 text-red-600">Quán ngon nên thử</h2>

        <div className="flex items-center justify-between">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="text-gray-500 hover:text-black"
          >
            &#8249;
          </button>

          {/* Restaurants */}
          <div className="grid grid-cols-4 gap-4 flex-1">
            {getVisibleRestaurants().map((restaurant, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md bg-white text-center"
              >
                <div className="w-full h-32 bg-gray-300 mb-4 flex items-center justify-center">
                  Hình
                </div>
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <p className="text-gray-600">
                  <span role="img" aria-label="location">📍</span> {restaurant.address}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="text-gray-500 hover:text-black"
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Eatery;
