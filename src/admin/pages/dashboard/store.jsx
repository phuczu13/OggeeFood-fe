import React from 'react';

function Store() {
    const stores = [
        {
            storeId: 'CH001',
            name: 'Cửa hàng A',
            phone: '0901234567',
            taxCode: '123456789',
            address: 'Hà Nội',
            email: 'storea@example.com',
            joinDate: '01/01/2020',
            status: 'Đang hoạt động',
        },
        {
            storeId: 'CH002',
            name: 'Cửa hàng B',
            phone: '0902345678',
            taxCode: '987654321',
            address: 'TP Hồ Chí Minh',
            email: 'storeb@example.com',
            joinDate: '15/06/2021',
            status: 'Tạm ngừng',
        },
        {
            storeId: 'CH003',
            name: 'Cửa hàng C',
            phone: '0903456789',
            taxCode: '456789123',
            address: 'Đà Nẵng',
            email: 'storec@example.com',
            joinDate: '10/10/2019',
            status: 'Đã đóng cửa',
        },
    ];

    return (
        <div className="w-full h-full bg-white p-5">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Thống kê cửa hàng</h2>
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Tìm kiếm cửa hàng..."
                    className="border border-gray-300 rounded px-4 py-2 w-1/3"
                />
            </div>
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="border border-gray-300 px-4 py-2">Mã cửa hàng</th>
                        <th className="border border-gray-300 px-4 py-2">Tên cửa hàng</th>
                        <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                        <th className="border border-gray-300 px-4 py-2">Mã số thuế</th>
                        <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày tham gia</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                        <th className="border border-gray-300 px-4 py-2">Xem thêm</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{store.storeId}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.taxCode}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.address}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{store.joinDate}</td>
                            <td
                                className={`border border-gray-300 px-4 py-2 ${
                                    store.status === 'Đang hoạt động'
                                        ? 'text-green-500'
                                        : store.status === 'Tạm ngừng'
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {store.status}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="text-blue-500 hover:underline">Chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Store;
