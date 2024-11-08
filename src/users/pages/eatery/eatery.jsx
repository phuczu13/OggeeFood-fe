import React, { useState, useEffect } from 'react';
import HeaderHC2 from "../../components/homepage/headerHC2";
import IconPrevios from '../../assets/svg/icon_previos.svg'
import IconNext from '../../assets/svg/icon_next.svg'
import IconRating from "../../assets/svg/icon_rating.svg";
import Footer from '../../components/homepage/footer';
import IconSeeAll from '../../assets/svg/icon_next.svg'
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios



const Eatery = () => {

  // const topStores = [
  //   { 
  //     name: 'Bún Bò Huế - O Hai', 
  //     address: '74/18 Phan Văn Hớn',
  //     rating: '4.9',
  //     image: 'https://reviewvilla.vn/wp-content/uploads/2023/08/bun-bo-sai-gon-3.jpg',
  //   },
    
  //   { 
  //     name: 'Bún Đậu Sữa Chua - Cô Tiên', 
  //     address: '142 Phạm Văn Đồng',
  //     rating: '4.8',
  //     image: 'https://cdn3.ivivu.com/2016/09/quan-bun-dau-mam-tom-sai-gon-thu-hut-dong-sao-viet-ivivu-1.jpg',
  //   },

  //   { 
  //     name: 'Cơm Chiên Hải Sản - Chú Tuấn', 
  //     address: '74/18 Phan Văn Hớn',
  //     rating: '4.7',
  //     image: 'https://top10bienhoa.com/wp-content/uploads/2021/04/com-chien-duong-chau5.png',
  //   },
    
  //   { 
  //     name: 'Xôi Gà Lá Dứa - Minh Tâm', 
  //     address: '142 Phạm Văn Đồng',
  //     rating: '4.8',
  //     image: 'https://anvat.lagi.vn/wp-content/uploads/sites/3/2020/11/xoi-ngon-lagi.jpg',
  //   },

  //   { 
  //     name: 'Mì Quảng - Sông Thu', 
  //     address: '74/19 Phan Văn Hớn',
  //     rating: '4.5',
  //     image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
  //   },
    
  //   { 
  //     name: 'Bánh Mì Thịt Nguội - Phúc Du', 
  //     address: '142 Phạm Văn Đồng',
  //     rating: '4.8',
  //     image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
  //   },

  // ];


//   const stores = [

//     { 
//       id: 1,
//       name: 'Mì Quảng - Sông Thu', 
//       category: 'Mì Quảng',
//       address: '74/19 Phan Văn Hớn',
//       rating: '4.5',
//       image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
//     },

//     { 
//       id: 2,
//       name: 'Bánh Mì Thịt Nguội - Phúc Du', 
//       category: 'Bánh Mì',
//       address: '142 Phạm Văn Đồng',
//       rating: '4.8',
//       image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
//     },
//     { 
//       id: 3,
//       name: 'Mì Quảng - Sông Thu', 
//       category: 'Mì Quảng',
//       address: '74/19 Phan Văn Hớn',
//       rating: '4.5',
//       image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
//     },

//     { 
//       id: 4,
//       name: 'Bánh Mì Thịt Nguội - Phúc Du', 
//       category: 'Bánh Mì',
//       address: '142 Phạm Văn Đồng',
//       rating: '4.8',
//       image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
//     },
//     { 
//       id: 5,
//       name: 'Bánh Mì Thịt Nguội - Phúc Du', 
//       category: 'Bánh Mì',
//       address: '142 Phạm Văn Đồng',
//       rating: '4.8',
//       image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
//     },

//     { 
//       id: 6,
//       name: 'Mì Quảng - Sông Thu', 
//       category: 'Mì Quảng',
//       address: '74/19 Phan Văn Hớn',
//       rating: '4.5',
//       image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
//     },

//     { 
//       id: 7,
//       name: 'Bánh Mì Thịt Nguội - Phúc Du', 
//       category: 'Bánh Mì',
//       address: '142 Phạm Văn Đồng',
//       rating: '4.8',
//       image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
//     },
    
//     { 
//       id: 8,
//       name: 'Mì Quảng - Sông Thu', 
//       category: 'Mì Quảng',
//       address: '74/19 Phan Văn Hớn',
//       rating: '4.5',
//       image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
//     },
    
// ];
  const [topStores, setTopStores] = useState([]); // Ban đầu để trống
  const [stores, setStores] = useState([]); // Ban đầu để trống
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const userId = localStorage.getItem('userId');

  // Hàm gọi API để lấy dữ liệu sản phẩm ngẫu nhiên
  const fetchRandomStores = async () => {
    try {
        const response = await axios.get('https://be-order-food.vercel.app/api/store/random'); // API URL từ backend
        console.log(response.data.data);
        setTopStores(response.data.data); // Cập nhật sản phẩm
        setLoading(false); // Tắt loading sau khi có dữ liệu
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
  };
  useEffect(() => {
    fetchRandomStores();
  }, []);
  useEffect(() => {
    const fetchStores = async () => {
        try {
            const response = await fetch('https://be-order-food.vercel.app/api/store/getAllStore');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStores(data.data); // Assuming the API response contains a 'data' field
            setLoading(false); // Tắt loading sau khi có dữ liệu
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    fetchStores();
  }, []); 
  // State to track the current starting index
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 topStores at a time

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % topStores.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? topStores.length - 1 : prevIndex - 1
    );
  };

  const getVisibletopStores = () => {
    const endIndex = startIndex + itemsPerPage;

    if (endIndex <= topStores.length) {
      return topStores.slice(startIndex, endIndex);
    } else {

      return [
        ...topStores.slice(startIndex, topStores.length),
        ...topStores.slice(0, endIndex - topStores.length),
      ];
    }
  };
  if (loading) {
      return <p className='text-center'>Loading...</p>;
  }

  if (error) {
      return <p>Error: {error}</p>;
  }
  return (
    <div>
      <div>
        < HeaderHC2 />
      </div>
      <div className="relative w-full max-w-[1200px] mx-auto mt-10 sm:px-0 px-8">
        <h2 className="text-xl font-bold text-[#ff7e00]">Quán ngon nên thử</h2>

        <div className="flex items-center justify-between mt-6 relative">
          <button
            onClick={prevSlide}
            className="prev-slide-button absolute left-[-23px] sm:left-[-30px] top-[280px] sm:top-[110px] transform -translate-y-1/2 rounded-full focus:outline-none z-10"
          >
            <img className='w-4' src={IconPrevios} alt="" />
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {getVisibletopStores().map((topStore, index) => (
              <Link to={`/eatery-details`} state={ {storeId : topStore._id}}
                key={index}
                className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm text-center"
              >
                <div className="relative w-full bg-gray-300 mb-4 flex items-center justify-center">
                  <img src={topStore.avatar} alt='' className="w-full h-[150px] object-cover" />
                  <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                    <span className="text-black font-semibold">{topStore.rating}</span>
                    <span className="ml-1"><img src={IconRating} alt="" /></span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{topStore.storeName}</h3>
                <p className="text-gray-600">
                  <span role="img" aria-label="location">📍</span> {topStore.storeAddress}
                </p>
              </Link>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="next-slide-button absolute right-[-23px] top-[280px] sm:top-[110px] sm:right-[-30px] transform -translate-y-1/2 rounded-full focus:outline-none z-10"
          >
            <img className='w-4' src={IconNext} alt="" />
          </button>
        </div>
      </div>



      <div className='w-full max-w-[1200px] mx-auto my-10 sm:px-0 px-3'>
        <div className='w-full flex items-center'>
          <div className='text-[#ff7e00] text-xl w-28 font-bold'>Quán ăn</div>
          <div className='bg-[#ff7e00] w-full h-[1px]'></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {stores.map((stores) => (
              <Link to={`/eatery-details`} state={ {storeId : stores._id}} key={stores._id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={stores.avatar} alt={stores.storeName} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{stores.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{stores.storeName}</h3>
                      <p className="text-gray-500 text-sm">Thể loại: {stores.category}</p>
                      <div className="flex justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">Địa chỉ: {stores.storeAddress}</span>
                      </div>
                  </div>
              </Link>
          ))}
        </div>


      </div>
      <div className='mt-10 w-full max-w-[350px] mx-auto flex justify-center '>
        <Link to='/list-eatery' className='hover:ring-[#ff7e00] hover:outline-none hover:ring-2 relative p-3 border flex items-center justify-center font-semibold text-[18px] border-[#F8E7CC] text-[#ff7e00] rounded-full w-full'>
          Xem tất cả các quán
          <img className='absolute right-[70px]' src={IconSeeAll} alt="" />
        </Link>
      </div>

      <div className='pt-10'>
        <Footer />
      </div>
    </div>
  );
};

export default Eatery;
