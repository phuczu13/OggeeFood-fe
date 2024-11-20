import React from 'react';
import HeaderHS5 from '../../components/header/headerHSmini/headerHS5';

function TransactionHistory() {
    // Dữ liệu giả
    const transactions = [
        {
            orderId: 'DH0123456789',
            customerName: 'Bùi Nguyễn Thanh Lực',
            activity: 'Hoàn thành đơn',
            amount: '+200.000',
            activityClass: 'text-green-500'
        },
        {
            orderId: 'DH0123456788',
            customerName: 'Bùi Nguyễn Thanh Lực',
            activity: 'Hoàn tiền',
            amount: '-200.000',
            activityClass: 'text-red-500'
        },
        {
            orderId: 'DH0123456787',
            customerName: 'Bùi Nguyễn Thanh Lực',
            activity: 'Rút tiền',
            amount: '-4.700.000',
            activityClass: 'text-red-500'
        },
        {
            orderId: 'DH0123456788',
            customerName: 'Bùi Nguyễn Thanh Lực',
            activity: 'Hoàn thành đơn',
            amount: '+400.000',
            activityClass: 'text-green-500'
        }
    ];

    return (
        <div className="bg-[#ffffff] w-full h-screen">
            <div className="mb-5">
                <HeaderHS5 />
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-4">Lịch sử giao dịch</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Mã đơn hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Tên khách hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Hoạt động</th>
                            <th className="border border-gray-300 px-4 py-2">Dòng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{transaction.orderId}</td>
                                <td className="border border-gray-300 px-4 py-2">{transaction.customerName}</td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 ${
                                        transaction.activity.includes('Hoàn') ? 'font-semibold' : ''
                                    }`}
                                >
                                    {transaction.activity}
                                </td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 ${transaction.activityClass}`}
                                >
                                    {transaction.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionHistory;
