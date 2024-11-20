import React from 'react';

function Driver() {
    const drivers = [
        {
            driverId: 'TX001',
            name: 'Nguyễn Văn A',
            phone: '0901234567',
            cccd: '123456789',
            dob: '01/01/1990',
            gender: 'Nam',
            address: 'Hà Nội',
            license: 'B2',
            joinDate: '01/01/2020',
            status: 'Hoạt động',
        },
        {
            driverId: 'TX002',
            name: 'Trần Thị B',
            phone: '0902345678',
            cccd: '987654321',
            dob: '15/03/1995',
            gender: 'Nữ',
            address: 'TP Hồ Chí Minh',
            license: 'C',
            joinDate: '15/06/2021',
            status: 'Tạm dừng',
        },
        {
            driverId: 'TX003',
            name: 'Phạm Văn C',
            phone: '0903456789',
            cccd: '456789123',
            dob: '20/07/1988',
            gender: 'Nam',
            address: 'Đà Nẵng',
            license: 'A1',
            joinDate: '10/10/2019',
            status: 'Đã nghỉ',
        },
    ];

    return (
        <div className="w-full h-full bg-white p-5">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">Thống kê tài xế</h2>
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Tìm kiếm tài xế..."
                    className="border border-gray-300 rounded px-4 py-2 w-1/3"
                />
            </div>
            <table className="w-full border-collapse border border-gray-300 text-center">
                <thead>
                    <tr className="bg-orange-500 text-white">
                        <th className="border border-gray-300 px-4 py-2">Mã tài xế</th>
                        <th className="border border-gray-300 px-4 py-2">Tên tài xế</th>
                        <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                        <th className="border border-gray-300 px-4 py-2">CCCD</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày sinh</th>
                        <th className="border border-gray-300 px-4 py-2">Giới tính</th>
                        <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                        <th className="border border-gray-300 px-4 py-2">Bằng lái xe</th>
                        <th className="border border-gray-300 px-4 py-2">Ngày tham gia</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                        <th className="border border-gray-300 px-4 py-2">Xem thêm</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{driver.driverId}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.phone}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.cccd}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.dob}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.gender}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.address}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.license}</td>
                            <td className="border border-gray-300 px-4 py-2">{driver.joinDate}</td>
                            <td
                                className={`border border-gray-300 px-4 py-2 ${
                                    driver.status === 'Hoạt động'
                                        ? 'text-green-500'
                                        : driver.status === 'Tạm dừng'
                                        ? 'text-yellow-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {driver.status}
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

export default Driver;
