import React, { useState, useEffect } from 'react';
import HeaderHC4 from '../../components/homepage/headerHC4';
import Footer from '../../components/homepage/footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Import CSS cho toastify


const UserAccount = () => {
  const [thongTin, setThongTin] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    introduce: '',
    avatar: ''
  });

  const [isEdited, setIsEdited] = useState(false);
  const userId = localStorage.getItem('userId');
  // Gọi API lấy thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://be-order-food.vercel.app/api/user/inforUser/${userId}`); // API lấy thông tin user bằng userId
        console.log(response)
        setThongTin(response.data);
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  const thayDoiThongTin = (e) => {
    const { name, value } = e.target;
    setThongTin({
      ...thongTin,
      [name]: value,
    });
    setIsEdited(true); // Hiển thị nút "Lưu" khi có chỉnh sửa
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://be-order-food.vercel.app/api/user/update/${userId}`, thongTin); // API cập nhật thông tin user
      setIsEdited(false); // Ẩn nút "Lưu" sau khi lưu thành công
      toast.success('Cập nhật thành công!');
    } catch (error) {
      console.error('Error updating user info', error);
      toast.error('Cập nhật thất bại!');
    }
  };

  //////ảnh đại diện
  const [image, setImage] = useState("https://i.pinimg.com/736x/65/2a/fa/652afa0a7cf9bac3e8af32384e34068e.jpg");
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Lấy file người dùng chọn
    if (file && file.type.startsWith("image/")) { // Kiểm tra xem file có phải ảnh không
      const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
      setImage(imageUrl); // Cập nhật URL vào state
    } else {
      toast.warning("Vui lòng chọn một tệp ảnh hợp lệ!");
    }
  };

  return (
    <div>
      <HeaderHC4 />
      <div className='px-5 sm:p-0'>
        <div className="max-w-[800px] mx-auto bg-white p-6 rounded-lg shadow-lg border my-10">
          <h1 className="text-2xl font-bold mt-2 mb-4 text-center text-[#ff7e00]">Thông Tin Tài Khoản</h1>
          <div className='flex flex-col items-center text-center mx-auto justify-center'>
          <img className="w-[100px] object-cover border rounded-full h-[100px]" src={thongTin.avatar} alt="Uploaded" />
            <label
              htmlFor="file-upload"
              className="mt-4 px-3 py-1 border border-[#525252] rounded-lg cursor-pointer"
            >
              Đổi ảnh
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Tên</label>
              <input
                type="text"
                name="name"
                placeholder="Nhập tên của bạn"
                value={thongTin.name}
                onChange={thayDoiThongTin}
                className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Ngày sinh</label>
              <input
                type="date"
                name="dateOfBirth"
                value={thongTin.dateOfBirth ? thongTin.dateOfBirth.split('T')[0] : ''}
                onChange={thayDoiThongTin}
                className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={thongTin.phoneNumber}
                onChange={thayDoiThongTin}
                className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700">Địa chỉ</label>
              <input
                type="text"
                name="address"
                placeholder="Nhập địa chỉ của bạn"
                value={thongTin.address}
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
                disabled
                className="border rounded-md w-full p-2 mt-1 bg-gray-100"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Giới tính</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={thongTin.gender === 'Nam'}
                    onChange={thayDoiThongTin}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={thongTin.gender === 'Nữ'}
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
                name="introduce"
                placeholder="Nhập giới thiệu của bạn"
                value={thongTin.introduce}
                onChange={thayDoiThongTin}
                className="border rounded-md w-full p-2 mt-1 hover:border-[#ff7e00] focus:ring-1 focus:ring-[#ff7e00] focus:border-[#ff7e00] focus:outline-none"
              />
            </div>
          </div>
          {isEdited && (
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-[#ff7e00] text-white py-2 rounded-md hover:bg-[#ff6200] transition-all"
            >
              Lưu
            </button>
          )}
        </div>
      </div>
      <ToastContainer/>
      <Footer />
    </div>
  );
};

export default UserAccount;
