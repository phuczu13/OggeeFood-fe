import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState('day'); // week, month, year
  const [chartData, setChartData] = useState([]);
  const storeId = localStorage.getItem('storeId');
  const [orderCompleted, setOrderCompleted] = useState("");
  const [orderCancel, setOrderCancel] = useState("");
  const [percentageChangeCompleted, setPercentageChangeCompleted] = useState("");
  const [percentageChangeCancel, setPercentageChangeCancel] = useState("");
  const [top5Products, setTop5Products] = useState([])
  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tỷ trọng bán hàng',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  

  const totalRevenue = chartData.reduce((sum, item) => sum + item.totalRevenue, 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  console.log(storeId)
  useEffect(() => {
    fetchData(timeFrame),fetchDataOrder(timeFrame);
  }, [timeFrame]);

  const fetchDataOrder = async (timeFrame) => {
    try {
      let url;
      switch (timeFrame) {
        case 'day':
          url = `https://be-order-food.vercel.app/api/order/order-of-day/${storeId}`;
          break;
        case 'week':
          url = `https://be-order-food.vercel.app/api/order/order-of-week/${storeId}`;
          break;
        case 'month':
          url = `https://be-order-food.vercel.app/api/order/order-of-month/${storeId}`;
          break;
        default:
          url = `https://be-order-food.vercel.app/api/order/order-of-day/${storeId}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
      
      // Duyệt qua danh sách trả về từ API
    data.forEach((item) => {
      if (item.status === 'Hoàn thành') {
        if (timeFrame === 'day') {
          setOrderCompleted(item.thisDayCount);
          setPercentageChangeCompleted(item.percentageChange);
        } else if (timeFrame === 'week') {
          setOrderCompleted(item.thisWeekCount);
          setPercentageChangeCompleted(item.percentageChange);
        } else if (timeFrame === 'month') {
          setOrderCompleted(item.thisMonthCount);
          setPercentageChangeCompleted(item.percentageChange);
        }
      } else if (item.status === 'Đã hủy') {
        if (timeFrame === 'day') {
          setOrderCancel(item.thisDayCount);
          setPercentageChangeCancel(item.percentageChange);
        } else if (timeFrame === 'week') {
          setOrderCancel(item.thisWeekCount);
          setPercentageChangeCancel(item.percentageChange);
        } else if (timeFrame === 'month') {
          setOrderCancel(item.thisMonthCount);
          setPercentageChangeCancel(item.percentageChange);
        }
      }
    });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const formatPercentage = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return "0%"; // Nếu không phải số, trả về "0%"
    return number > 0 ? `+${number}%` : `${number}%`; // Thêm dấu "+" nếu số dương
  };
  
  const statistics = [
    { title: "Doanh thu", value: totalRevenue , color: "text-blue-500", bg_color: "bg-blue-500", rating: '+10%', isCurrency: true },
    { title: "Đơn hàng mới", value: orderCompleted, color: "text-green-500", bg_color: "bg-green-500", rating: formatPercentage(percentageChangeCompleted), isCurrency: false },
    { title: "Đơn hủy", value: orderCancel, color: "text-red-500", bg_color: "bg-red-500", rating: formatPercentage(percentageChangeCancel), isCurrency: false },
  ];

  const fetchData = async (timeFrame) => {
    try {
      let url;
      switch (timeFrame) {
        case 'day':
          url = `https://be-order-food.vercel.app/api/order/revenue/daily/${storeId}`;
          break;
        case 'week':
          url = `https://be-order-food.vercel.app/api/order/revenue/weekly/${storeId}`;
          break;
        case 'month':
          url = `https://be-order-food.vercel.app/api/order/revenue/monthly/${storeId}`;
          break;
        default:
          url = `https://be-order-food.vercel.app/api/order/revenue/daily/${storeId}`;
      }
  
      const response = await axios.get(url);
      const data = response.data;
  
      if (timeFrame === 'day') {
        // Dữ liệu theo ngày
        setChartData(data.map(item => ({
          hour: item.hour,
          totalRevenue: item.totalRevenue,
        })));
      } else if (timeFrame === 'week') {
        // Dữ liệu đã được chuẩn hóa từ API
        setChartData(data.map(item => ({
          day: item.day,
          totalRevenue: item.totalRevenue,
        })));
      } else if (timeFrame === 'month') {
        // Chuẩn hóa dữ liệu tháng từ API
        setChartData(data.map(item => ({
          month: item.month,
          totalRevenue: item.totalRevenue,
        })));
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  
  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };
  const barData = {
    labels: timeFrame === 'day' 
      ? chartData.map(data => `${data.hour}h`)  // Lấy giờ trong ngày
      : timeFrame === 'week'
      ? chartData.map(data => data.day)  // Lấy tên các ngày trong tuần
      : timeFrame === 'month'
      ? chartData.map(data => `Tháng ${data.month}`)  // Lấy tên các tháng
      : chartData.map(data => data._id),  // Lấy năm hoặc giá trị khác (nếu cần)
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

  useEffect(() => {
    const fetchDoughnutData = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/order/top-5-product/${storeId}`);
  
        const data = response.data;
        // Lấy topProducts và xử lý
      const topProducts = data[0]?.topProducts || [];
      setTop5Products(topProducts)
      const othersSales = data[0]?.others && data[0]?.others.length > 0 ? data[0]?.others[0]?.totalSold : 0;
      
      // Lấy tên sản phẩm và số lượng bán
      const labels = topProducts.map((product) => product.name);
      const sales = topProducts.map((product) => product.totalSold);

      // Nếu có sản phẩm "Other", thêm vào cuối mảng
      if (othersSales > 0) {
        labels.push('Các món khác');
        sales.push(othersSales);
      }
  
        // Cập nhật dữ liệu biểu đồ
        setDoughnutData({
          labels: labels,
          datasets: [
            {
              label: 'Tỷ trọng bán hàng',
              data: sales,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Màu cho sản phẩm đầu tiên
                'rgba(54, 162, 235, 0.6)', // Màu cho sản phẩm thứ hai
                'rgba(255, 206, 86, 0.6)', // Màu cho sản phẩm thứ ba
                'rgba(75, 192, 192, 0.6)', // Màu cho sản phẩm thứ tư
                'rgba(153, 102, 255, 0.6)', // Màu cho sản phẩm thứ năm
                'rgba(255, 159, 64, 0.6)', // Màu cho các món khác
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)', 
                'rgba(255, 206, 86, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(153, 102, 255, 1)', 
                'rgba(255, 159, 64, 1)', // Màu cho các món khác
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data', error);
      }
    };
  
    fetchDoughnutData();
  }, [storeId]); 

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
            <h1 className="text-3xl text-[#ff7e00] ml-2 font-semibold">
              {timeFrame === "day" && "Kết quả kinh doanh trong ngày"}
              {timeFrame === "week" && "Kết quả kinh doanh trong tuần"}
              {timeFrame === "month" && "Kết quả kinh doanh trong tháng"}
              {timeFrame === "year" && "Kết quả kinh doanh trong năm"}
            </h1>
          </div>
        </header>
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl flex justify-between font-semibold">
                  {stat.title}
                  <p className={`${stat.bg_color} text-white rounded-full px-2 text-[16px]`}>
                    {stat.rating}
                  </p>
                </h2>
                <div className="flex justify-between items-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.isCurrency
                      ? stat.value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                      : stat.value}
                  </p>
                  <p>
                    {timeFrame === "day" && "Hôm qua"}
                    {timeFrame === "week" && "Tuần qua"}
                    {timeFrame === "month" && "Tháng qua"}
                    {timeFrame === "year" && "Năm qua"}
                  </p>
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
                  className={`px-4 py-2 ${timeFrame === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded mr-2`}
                  onClick={() => handleTimeFrameChange('day')}
                >
                  Ngày
                </button>
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
              </div>
              <div className="flex justify-center" style={{ width: '100%', height: '300px', margin: '0 auto' }}>
                <Bar data={barData} options={barOptions} />
              </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md sm:w-1/3 w-full">
            <h2 className="text-xl font-semibold text-center mb-6">Tỷ trọng bán hàng tháng này</h2>
            <div className='flex justify-center' style={{ width: '100%', height: '300px', margin: '0 auto' }}>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-lg text-[#ef4b2c] font-semibold">
            Tổng doanh thu: <span className="text-2xl font-bold">{totalRevenue}</span>
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-bold mb-4">Top sản phẩm nổi bật tháng này</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 font-semibold border-b">Hình ảnh</th>
                <th className="py-2 px-4 font-semibold border-b">Tên món ăn</th>
                <th className="py-2 px-4 font-semibold border-b">Số lượng bán được</th>
                <th className="py-2 px-4 font-semibold border-b">Doanh thu</th>
                {/* <th className="py-2 px-4 font-semibold border-b">Thông tin khác</th> */}
              </tr>
            </thead>
            <tbody>
              {top5Products.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b justify-center flex"><img className='w-16 h-16' src={product.photo} alt="" /></td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.totalSold}</td>
                  <td className="py-2 px-4 border-b">{(product.price*product.totalSold).toLocaleString()} VNĐ</td>
                  {/* <td className="py-2 px-4 border-b">
                    <button className="text-blue-600 hover:underline">...</button>
                  </td> */}
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
