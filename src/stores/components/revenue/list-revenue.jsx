import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('week'); // week, month, year
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const storeId = localStorage.getItem('storeId');
  console.log(storeId)
  useEffect(() => {
    fetchData(timeFrame);
  }, [timeFrame]);
  const initialData = [
    { day: 'Mon', revenue: 123456 },
    { day: 'Tue', revenue: 234567 },
    { day: 'Wed', revenue: 504000 },
    { day: 'Thu', revenue: 230000 },
    { day: 'Fri', revenue: 220000 },
    { day: 'Sat', revenue: 280000 },
    { day: 'Sun', revenue: 220000 },
  ];
  const statistics = [
    { title: "Doanh thu hôm nay", value: 123456 , color: "text-blue-500", bg_color: "bg-blue-500", rating: '+15%', isCurrency: true },
    { title: "Đơn hàng mới", value: 456, color: "text-green-500", bg_color: "bg-green-500", rating: '+25%', isCurrency: false },
    { title: "Đơn hủy", value: 123, color: "text-red-500", bg_color: "bg-red-500", rating: '+0%', isCurrency: false },
  ];
  const [filteredData, setFilteredData] = useState(initialData);

  const fetchData = async (timeFrame) => {
    try {
      let url;
      switch (timeFrame) {
        case 'week':
          url = `https://be-order-food.vercel.app/api/order/revenue/weekly/${storeId}`;
          break;
        case 'month':
          url = `https://be-order-food.vercel.app/api/order/revenue/monthly/${storeId}`;
          break;
        case 'year':
          url = `https://be-order-food.vercel.app/api/order/revenue/yearly/${storeId}`;
          break;
        default:
          url = `https://be-order-food.vercel.app/api/order/revenue/weekly/${storeId}`;
      }
      const response = await axios.get(url);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };
  const barData = {
    labels: chartData.map(data => data._id),
    datasets: [
      {
        label: 'Doanh thu',
        data: chartData.map(data => data.totalRevenue),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Bún Bò', 'Bánh Mì', 'Hủ Tiếu', 'Phở Nam Vang', 'Mì Quảng'],
    datasets: [
      {
        label: 'Tỷ trọng bán hàng',
        data: [46, 22, 13, 6, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
        },
      },
    },
  };

  const topProducts = [
    { 
      photo: 'https://cdn.tuoitre.vn/thumb_w/586/2022/8/1/photo-3-16593440747491567009046-1659344316464156375039.png',
      nameStore: 'Bún Bò', 
      quantity: 120, 
      revenue: '1.300.000đ' 
    },
    { 
      photo: 'https://i.pinimg.com/736x/e7/d3/3d/e7d33d3f552b1fcb6f941a222a99d842.jpg', 
      nameStore: 'Bún Đậu', 
      quantity: 85, 
      revenue: '2.600.000đ'
    },
    { 
      photo: 'https://i.pinimg.com/736x/6f/f8/d2/6ff8d22732761bd3037a8f27b5faeadc.jpg', 
      nameStore: 'Mì Quảng', 
      quantity: 200, 
      revenue: '3.700.000đ' 
    },
    { 
      photo: 'https://i.pinimg.com/736x/d5/41/30/d541306e5750a94cc3404cf41765fe6b.jpg', 
      nameStore: 'Bánh Mì', 
      quantity: 150, 
      revenue: '3.000.000đ' 
    }
  ];
  
  return (
    <div>
      <div className="max-w-[1200px] border my-10 mx-auto sm:p-0 p-4 bg-gray-50">
        <header className="bg-[#F8E7CC] text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl text-[#ff7e00] ml-2  font-semibold">Kết quả kinh doanh trong ngày</h1>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl flex justify-between font-semibold">
                  {stat.title}
                  <p className={`${stat.bg_color} text-white rounded-full px-2 text-[16px]`}>{stat.rating}</p>
                </h2>
                <div className="flex justify-between">
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.isCurrency 
                      ? stat.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) 
                      : stat.value}
                  </p>
                  <p>Hôm qua</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] border my-10 mx-auto sm:p-6 p-5 bg-gray-50">
        <div className="flex sm:flex-row flex-col gap-6 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md sm:w-2/3 w-full">
            <h2 className="text-xl font-semibold text-center mb-6">Doanh thu bán hàng</h2>
            <div className="flex justify-center mb-4">
                <button 
                  className={`px-4 py-2 ${timeFrame === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
                  onClick={() => handleTimeFrameChange('week')}
                >
                  Tuần
                </button>
                <button 
                  className={`px-4 py-2 ${timeFrame === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
                  onClick={() => handleTimeFrameChange('month')}
                >
                  Tháng
                </button>
                <button 
                  className={`px-4 py-2 ${timeFrame === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                  onClick={() => handleTimeFrameChange('year')}
                >
                  Năm
                </button>
              </div>
              <div className="flex justify-center" style={{ width: '100%', height: '300px', margin: '0 auto' }}>
                <Bar data={barData} options={barOptions} />
              </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md sm:w-1/3 w-full">
            <h2 className="text-xl font-semibold text-center mb-6">Tỷ trọng bán hàng</h2>
            <div className='flex justify-center' style={{ width: '100%', height: '300px', margin: '0 auto' }}>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-lg text-[#ef4b2c] font-semibold">
            Tổng doanh thu: <span className="text-2xl font-bold">Jack 5 củ</span>
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Top sản phẩm nổi bật</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 font-semibold border-b">Hình ảnh</th>
                <th className="py-2 px-4 font-semibold border-b">Tên món ăn</th>
                <th className="py-2 px-4 font-semibold border-b">Số lượng bán được</th>
                <th className="py-2 px-4 font-semibold border-b">Doanh thu</th>
                <th className="py-2 px-4 font-semibold border-b">Thông tin khác</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b justify-center flex"><img className='w-16 h-16' src={product.photo} alt="" /></td>
                  <td className="py-2 px-4 border-b">{product.nameStore}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">{product.revenue}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-600 hover:underline">...</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
