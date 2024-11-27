import HeaderHC4 from '../components/homepage/headerHC4';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CircularProgress, Alert } from "@mui/material";
function PointerWalletUser() {
    const userId = localStorage.getItem('userId')
    // const [accWallet, setAccWallet] = useState([]);
    // Dữ liệu giả
    const wallets = [
        {
            type: 'Ví Pointer',
            walletId: 'DH0123456789',
            owner: 'Bùi Nguyễn Thanh Lực',
            balance: '4.500.000'
        },
        {
            type: 'Ví Pointer',
            walletId: 'DH0123456789',
            owner: 'Phạm Thanh Phúc',
            balance: '2.000.000'
        },
        {
            type: 'Ví Pointer',
            walletId: 'DH0123456789',
            owner: 'Bùi Nguyễn Thanh Lực',
            balance: '4.500.000'
        },
        {
            type: 'Ví Pointer',
            walletId: 'DH0123456789',
            owner: 'Phạm Thanh Phúc',
            balance: '2.000.000'
        }
    ];
    const [account, setAccount] = useState(null); // Lưu dữ liệu trả về
    // const [loading, setLoading] = useState(true); // Trạng thái loading
    // const [error, setError] = useState(null); // Trạng thái lỗi
    const returnUrl = encodeURIComponent('https://oggee-food-fe.vercel.app/pointer-wallet-user');
    const handleConnect = () => {
        window.location.href = `https://wallet.pointer.io.vn/connect-app?partnerId=66a78d1bc49d6f5b6a59e303&returnUrl=${returnUrl}&userId=${userId}`; // Chuyển hướng đến trang liên kết
    }

    useEffect(() => {
        const fetchAccountData = async () => {
                // setLoading(true);
                const res = await axios.get(`https://be-order-food.vercel.app/api/payment/account/${userId}`);
                setAccount(res.data); // Lưu dữ liệu vào state
                // setLoading(false)
        };

        fetchAccountData();
    }, [userId]);

    // if (loading) return <CircularProgress />;
    // if (error) return <Alert severity="error">{error}</Alert>;
     // Chỉ hiển thị 4 ký tự đầu, phần còn lại là dấu *
     const maskedSignature = account?.signature
     ? account.signature.substring(0, 4) + '****' 
     : 'Không tìm thấy tài khoản';

     const maskedUserId = account?.userId
     ? account.userId.substring(0, 4) + '****' 
     : 'Không tìm thấy tài khoản';

     const maskedId = account?._id
     ? account._id.substring(0, 4) + '****' 
     : 'Không tìm thấy tài khoản';
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className="mb-5">
                <HeaderHC4 />
            </div>
            <div className="px-5">
                <div className="mt-4 center">
                    <Card sx={{ maxWidth: 400, margin: "20px auto" }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Chi tiết tài khoản
                            </Typography>
                            {account ? (
                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                    <li>
                                        <Typography>
                                            <strong>Mã tài khoản (_id):</strong> {maskedId}
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            <strong>User ID:</strong> {maskedUserId}
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography>
                                            <strong>Chữ ký (Signature):</strong> {maskedSignature}
                                        </Typography>
                                    </li>
                                </ul>
                            ) : (
                                <Typography>Không tìm thấy tài khoản</Typography>
                            )}
                        </CardContent>
                    </Card>
                    <button onClick={handleConnect} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        Liên kết ví mới
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PointerWalletUser;
