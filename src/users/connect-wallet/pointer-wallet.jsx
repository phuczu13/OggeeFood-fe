import React from 'react';
import axios from 'axios';
import HeaderHC3 from '../components/homepage/headerHC3';
import HeaderHC4 from '../components/homepage/headerHC4';

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
    const returnUrl = encodeURIComponent('https://oggee-food-fe.vercel.app/pointer-wallet-user');
    const handleConnect = () =>{
        window.location.href = `https://wallet.pointer.io.vn/connect-app?partnerId=66a78d1bc49d6f5b6a59e303&returnUrl=${returnUrl}&userId=${userId}`; // Chuyển hướng đến trang liên kết
    }
    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className="mb-5">
                <HeaderHC4 />
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-4">Danh sách ví</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-orange-500 text-white">
                            <th className="border border-gray-300 px-4 py-2">Loại ví</th>
                            <th className="border border-gray-300 px-4 py-2">Số ví</th>
                            <th className="border border-gray-300 px-4 py-2">Tên chủ ví</th>
                            <th className="border border-gray-300 px-4 py-2">Số dư</th>
                            <th className="border border-gray-300 px-4 py-2">Hủy liên kết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{wallet.type}</td>
                                <td className="border border-gray-300 px-4 py-2">{wallet.walletId}</td>
                                <td className="border border-gray-300 px-4 py-2">{wallet.owner}</td>
                                <td className="border border-gray-300 px-4 py-2">{wallet.balance}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="text-red-500 hover:text-red-700">
                                        <i className="fas fa-trash-alt"></i> {/* Hoặc thêm icon tùy ý */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-right">
                    <button onClick={handleConnect} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        Liên kết ví mới
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PointerWalletUser;
