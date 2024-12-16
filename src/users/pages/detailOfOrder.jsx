import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import HeaderHC4 from '../components/homepage/headerHC4';
import Footer from '../components/homepage/footer'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import MapComponent from '../components/Map';

const steps = [
    'Đơn hàng đã đặt',
    'Chờ chế biến',
    'Đang giao',
    'Đã nhận hàng',
    'Đánh giá',
];

// Array of images corresponding to each step
const stepImages = [
    'https://cdn-icons-png.flaticon.com/512/5261/5261648.png',
    'https://cdn-icons-png.flaticon.com/512/1830/1830839.png',
    'https://www.pngmart.com/files/7/Delivery-PNG-Image.png',
    'https://cdn-icons-png.flaticon.com/512/4988/4988858.png',
    'https://www.reemalkw.com/wp-content/uploads/2022/01/customer-service.png',
];

// Custom Step Icon component
function CustomStepIcon(props) {
    const { active, completed, icon } = props;

    // Get the image URL for the current step
    const imageUrl = stepImages[icon - 1];

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: completed ? '3px solid #4caf50' : '3px solid transparent', // Optional: show border for completed steps
            }}
        >
            <img
                src={imageUrl}
                alt={`Step ${icon}`}
                style={{ width: '80%', height: '80%' }}
            />
        </div>
    );
}

// Custom connector with green color for completed steps
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
        transition: 'all 0.3s ease-in-out',
        height: 3, // Line thickness
        border: 0,
        backgroundColor: theme.palette.grey[400], // Default grey color
        marginTop: 10,
        marginLeft: 2,
        marginRight: 2
    },
    '&.Mui-completed .MuiStepConnector-line': {
        backgroundColor: '#4caf50', // Green for completed steps

    },
    '&.Mui-active .MuiStepConnector-line': {
        backgroundColor: '#4caf50', // Green for active step
    },
}));

function Hihi() {
    const [orderData, setOrderData] = useState(null);
    const [driverData, setDriverData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { orderId } = location.state || {};
    useEffect(() => {
        // Function to fetch order info
        const fetchOrderInfo = async () => {
            try {
                const response = await axios.get(`https://be-order-food.vercel.app/api/order/get-order-infor/${orderId}`);
                setOrderData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Something went wrong');
                setLoading(false);
            }
        };

        fetchOrderInfo();
    }, [orderId]);

    const {
        deliveryInfo,
        cart,
        totalPrice,
        totalShip,
        paymentMethod,
        paymentStatus,
        status,
        driverId
    } = orderData || {}; // Nếu orderData là null, gán giá trị mặc định {}

    useEffect(() => {
        const fetchDriverInfo = async () => {
            if (driverId) { // Chỉ gọi API nếu driverId đã có giá trị
                try {
                    const response = await axios.get(`https://be-order-food.vercel.app/api/driver/get-driver/${driverId}`);
                    setDriverData(response.data.data);
                } catch (err) {
                    setError(err.response?.data?.message || 'Something went wrong');
                }
            }
        };

        fetchDriverInfo();
    }, [driverId]);

    if (loading) return <p className='w-full text-[18px] font-semibold text-[#ff7e00] h-screen flex justify-center items-center'>Bạn đợi chút nhé :3</p>;
    if (error) return <p>Error: {error}</p>;

    const statusMapping = {
        'Chờ xác nhận': 1,
        'Cửa hàng xác nhận': 2,
        'Đang giao': 3,
        'Hoàn thành': 4,
    };
    // Determine activeStep
    let activeStep = statusMapping[status] ?? 0; // Default to step 0 if status is undefined
    if (status === 'Hoàn thành' && orderData?.hasRated) {
        activeStep = 5; // Step for "Đánh giá"
    }

    return (
        <div className="payment-status">
            <HeaderHC4 />
            <div className="mt-10 mb-10">
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<CustomConnector />}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div className="border mx-5 sm:mx-20 mt-5"></div>

                {orderData && (
                    <div className="flex flex-col md:flex-row mx-5 sm:mx-20 mt-5 gap-5">
                        {/* Driver Information */}
                        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg space-y-4">
                            <div>
                                <p className="text-xl font-semibold text-gray-800 mt-5 mb-5">Thông tin tài xế</p>
                                {driverId ? (
                                    <div className="flex items-center space-x-4">
                                        <img
                                            className="w-[50px] h-[50px] rounded-full border-2 border-gray-300"
                                            src={driverData?.avatar}
                                            alt="Driver Avatar"
                                        />
                                        <div>
                                            <p className="text-lg font-medium text-gray-700">{driverData?.name}</p>
                                            <p className="text-sm text-gray-500">0123456789</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-lg font-medium text-orange-500">Đang tìm tài xế...</p>
                                )}
                            </div>

                            <div>
                                <p className="text-xl font-semibold text-gray-800">Thông tin nhận hàng</p>
                                <p className="text-lg text-gray-700">
                                    Tên người nhận: <span className="font-semibold">{orderData.deliveryInfo.name}</span>
                                </p>
                                <p className="text-sm text-gray-500">Số điện thoại: {orderData.deliveryInfo.phone}</p>
                                <p className="text-sm text-gray-500">
                                    Địa chỉ: {orderData.deliveryInfo.address}
                                </p>
                            </div>

                            <div>
                                <p className="text-xl font-semibold text-gray-800">Trạng thái thanh toán</p>
                                <p className="text-lg font-semibold text-green-600">{orderData.paymentStatus}</p>
                            </div>
                        </div>
                        {/* Map Section */}
                        <div className="w-full md:w-1/2 p-4 bg-white shadow-lg rounded-lg">
                            {driverId ? (
                                <div>
                                    <p>Bản đồ</p>
                                    <MapComponent />
                                </div>
                            ) : (
                                <p className="text-lg font-medium text-orange-500">Đang tìm tài xế...</p>
                            )}
                        </div>
                    </div>

                )}

            </div>
            <Footer />
        </div>

    );
}

export default Hihi;
