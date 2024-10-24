import React, { useState } from 'react';
import HeaderHC2 from "../../components/homepage/headerHC2";
import IconPrevios from '../../assets/svg/icon_previos.svg'
import IconNext from '../../assets/svg/icon_next.svg'
import IconRating from "../../assets/svg/icon_rating.svg";
import Footer from '../../components/homepage/footer';
import IconSeeAll from '../../assets/svg/icon_next.svg'
import { Link } from 'react-router-dom';


const Eatery = () => {

  const topeateries = [
    { 
      name: 'Bún Bò Huế - O Hai', 
      address: '74/18 Phan Văn Hớn',
      rating: '4.9',
      image: 'https://reviewvilla.vn/wp-content/uploads/2023/08/bun-bo-sai-gon-3.jpg',
    },
    
    { 
      name: 'Bún Đậu Sữa Chua - Cô Tiên', 
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://cdn3.ivivu.com/2016/09/quan-bun-dau-mam-tom-sai-gon-thu-hut-dong-sao-viet-ivivu-1.jpg',
    },

    { 
      name: 'Cơm Chiên Hải Sản - Chú Tuấn', 
      address: '74/18 Phan Văn Hớn',
      rating: '4.7',
      image: 'https://top10bienhoa.com/wp-content/uploads/2021/04/com-chien-duong-chau5.png',
    },
    
    { 
      name: 'Xôi Gà Lá Dứa - Minh Tâm', 
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://anvat.lagi.vn/wp-content/uploads/sites/3/2020/11/xoi-ngon-lagi.jpg',
    },

    { 
      name: 'Mì Quảng - Sông Thu', 
      address: '74/19 Phan Văn Hớn',
      rating: '4.5',
      image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
    },
    
    { 
      name: 'Bánh Mì Thịt Nguội - Phúc Du', 
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
    },

  ];


  const eateries = [

    { 
      id: 1,
      name: 'Mì Quảng - Sông Thu', 
      category: 'Mì Quảng',
      address: '74/19 Phan Văn Hớn',
      rating: '4.5',
      image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
    },

    { 
      id: 2,
      name: 'Bánh Mì Thịt Nguội - Phúc Du', 
      category: 'Bánh Mì',
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
    },
    { 
      id: 3,
      name: 'Mì Quảng - Sông Thu', 
      category: 'Mì Quảng',
      address: '74/19 Phan Văn Hớn',
      rating: '4.5',
      image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
    },

    { 
      id: 4,
      name: 'Bánh Mì Thịt Nguội - Phúc Du', 
      category: 'Bánh Mì',
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
    },
    { 
      id: 5,
      name: 'Bánh Mì Thịt Nguội - Phúc Du', 
      category: 'Bánh Mì',
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
    },

    { 
      id: 6,
      name: 'Mì Quảng - Sông Thu', 
      category: 'Mì Quảng',
      address: '74/19 Phan Văn Hớn',
      rating: '4.5',
      image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
    },

    { 
      id: 7,
      name: 'Bánh Mì Thịt Nguội - Phúc Du', 
      category: 'Bánh Mì',
      address: '142 Phạm Văn Đồng',
      rating: '4.8',
      image: 'https://kenh14cdn.com/203336854389633024/2023/9/12/photo-1-1694513007787746325737.png',
    },
    
    { 
      id: 8,
      name: 'Mì Quảng - Sông Thu', 
      category: 'Mì Quảng',
      address: '74/19 Phan Văn Hớn',
      rating: '4.5',
      image: 'https://helenrecipes.com/wp-content/uploads/2021/05/Screenshot-2021-05-31-142423-1200x675.png',
    },
    
];

  // State to track the current starting index
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4; // Show 4 topeateries at a time

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % topeateries.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? topeateries.length - 1 : prevIndex - 1
    );
  };

  const getVisibletopeateries = () => {
    const endIndex = startIndex + itemsPerPage;

    if (endIndex <= topeateries.length) {
      return topeateries.slice(startIndex, endIndex);
    } else {

      return [
        ...topeateries.slice(startIndex, topeateries.length),
        ...topeateries.slice(0, endIndex - topeateries.length),
      ];
    }
  };

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
            {getVisibletopeateries().map((topeatery, index) => (
              <Link to='/eatery-details'
                key={index}
                className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm text-center"
              >
                <div className="relative w-full bg-gray-300 mb-4 flex items-center justify-center">
                  <img src={topeatery.image} alt='' className="w-full h-[150px] object-cover" />
                  <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                    <span className="text-black font-semibold">{topeatery.rating}</span>
                    <span className="ml-1"><img src={IconRating} alt="" /></span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{topeatery.name}</h3>
                <p className="text-gray-600">
                  <span role="img" aria-label="location">📍</span> {topeatery.address}
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
          {eateries.map((eateries) => (
              <Link to='/eatery-details' key={eateries.id} className="border border-[#F8E7CC] hover:ring-[#e67350] hover:outline-none hover:ring-2 p-3 rounded-lg shadow-sm">
                  <div className="relative">
                      <img src={eateries.image} alt={eateries.name} className="w-full h-[150px] object-cover" />
                      <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                          <span className="text-black font-semibold">{eateries.rating}</span>
                          <span className="ml-1"><img src={IconRating} alt="" /></span>
                      </div>
                  </div>
                  <div className="mt-4">
                      <h3 className="font-semibold text-lg">{eateries.name}</h3>
                      <p className="text-gray-500 text-sm">Thể loại: {eateries.category}</p>
                      <div className="flex justify-between items-center mt-2">
                          <span className="text-red-500 font-semibold">Địa chỉ: {eateries.address}</span>
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
