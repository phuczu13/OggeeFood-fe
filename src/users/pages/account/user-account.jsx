import React, { useState } from 'react';
import HeaderHC4 from '../../components/homepage/headerHC4';
import Footer from '../../components/homepage/footer';

const UserAccount = () => {
  const [thongTin, setThongTin] = useState({
    ho: 'Phạm Thanh',
    ten: 'Phúc',
    viTri: '74/18 Phan Văn Hớn',
    soDienThoai: '+84 799 758 402',
    email: 'phucpham21109@gmail.com',
    gioiTinh: 'Nam',
    bio: 'Tôi rất thích OggeeFood vì sự dễ thương này :3',
    tags: ['Bún Bò', 'Bún Đậu', 'Bánh Mì'],
  });

  const thayDoiThongTin = (e) => {
    const { name, value } = e.target;
    setThongTin({
      ...thongTin,
      [name]: value,
    });
  };

  return (
    <div>
      <HeaderHC4 />
        <div className='px-5 sm:p-0'>
          <div className="max-w-[800px] mx-auto bg-white p-6 rounded-lg shadow-lg border my-10">
            <h1 className="text-2xl font-bold mt-2 mb-6 text-center text-[#ff7e00]">Thông Tin Tài Khoản</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Họ và tên đệm</label>
                <input
                  type="text"
                  name="ho"
                  placeholder="Nhập họ của bạn"
                  value={thongTin.ho}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700">Tên</label>
                <input
                  type="text"
                  name="ten"
                  placeholder="Nhập tên của bạn"
                  value={thongTin.ten}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"

                />
              </div>
              <div>
                <label className="block text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  name="soDienThoai"
                  placeholder="Nhập số điện thoại"
                  value={thongTin.soDienThoai}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"

                />
              </div>
              <div>
                <label className="block text-gray-700">Địa chỉ</label>
                <input
                  type="text"
                  name="viTri"
                  placeholder="Nhập địa chỉ của bạn"
                  value={thongTin.viTri}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"

                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email"
                  value={thongTin.email}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"

                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Giới tính</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gioiTinh"
                      value="Nam"
                      checked={thongTin.gioiTinh === 'Nam'}
                      onChange={thayDoiThongTin}
                      className="mr-2"
                    />
                    Nam
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gioiTinh"
                      value="Nữ"
                      checked={thongTin.gioiTinh === 'Nữ'}
                      onChange={thayDoiThongTin}
                      className="mr-2"
                    />
                    Nữ
                  </label>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Giới thiệu</label>
                <textarea
                  name="bio"
                  placeholder="Nhập giới thiệu của bạn"
                  value={thongTin.bio}
                  onChange={thayDoiThongTin}
                  className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"

                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700">Yêu thích</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {thongTin.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default UserAccount;
