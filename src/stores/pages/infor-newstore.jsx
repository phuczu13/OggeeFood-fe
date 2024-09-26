import React, { useState, useEffect, useRef } from "react";

function InforNewStore() {
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState(''); // Tên chủ cửa hàng
  const [imageUrl, setImageUrl] = useState(''); // URL hình ảnh
  const [phone, setPhone] = useState(''); // Số điện thoại
  const [businessType, setBusinessType] = useState(''); // Loại hình kinh doanh
  const [address, setAddress] = useState(''); // Địa chỉ cửa hàng
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      storeName,
      ownerName,
      imageUrl,
      phone,
      businessType,
      address,
      openingTime,
      closingTime,
      selectedDays
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleSelectAllDays = (selectAll) => {
    if (selectAll) {
      setSelectedDays(['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']);
    } else {
      setSelectedDays([]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4 sm:px-0 mb-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 sm:p-14 rounded-md shadow-md w-full max-w-[600px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký cửa hàng</h2>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Tên cửa hàng */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên cửa hàng</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập tên cửa hàng"
            />
          </div>

          {/* Tên chủ cửa hàng */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên chủ cửa hàng</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập tên chủ cửa hàng"
            />
          </div>

          {/* Hình ảnh (URL) */}
          <div>
            <label className="block text-sm font-medium mb-1">Hình ảnh (URL)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập URL hình ảnh"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel" // Sử dụng type="tel" để hỗ trợ nhập số điện thoại
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập số điện thoại"
              pattern="[0-9]*" // Chỉ cho phép nhập số
              inputMode="numeric" // Hiển thị bàn phím số trên di động
            />
          </div>

          {/* Loại hình kinh doanh */}
          <div>
            <label className="block text-sm font-medium mb-1">Loại hình kinh doanh</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập loại hình kinh doanh"
            />
          </div>

          {/* Địa chỉ cửa hàng */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ cửa hàng</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
              placeholder="Nhập địa chỉ cửa hàng"
            />
          </div>

          {/* Giờ mở cửa */}
          <div>
            <label className="block text-sm font-medium mb-1">Giờ mở cửa</label>
            <input
              type="time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
            />
          </div>

          {/* Giờ đóng cửa */}
          <div>
            <label className="block text-sm font-medium mb-1">Giờ đóng cửa</label>
            <input
              type="time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none" // Đặt chiều rộng cho input
            />
          </div>

          {/* Các ngày hoạt động */}
          <div ref={dropdownRef}>
            <label className="block text-sm font-medium mb-1">Các ngày hoạt động (dự kiến)</label>
            <div className="relative">
                <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-[230px] px-4 py-2 rounded-full border border-gray-300 focus:border-[#ff7c00] focus:outline-none text-left" // Đặt chiều rộng tương tự như input giờ đóng
                >
                Chọn các ngày
                </button>
                {dropdownOpen && (
                <div className="absolute left-0 w-[230px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10"> {/* Đặt chiều rộng cho dropdown */}
                    <label className="block px-4 py-2">
                    <input
                        type="checkbox"
                        checked={selectedDays.length === 7}
                        onChange={(e) => toggleSelectAllDays(e.target.checked)}
                        className="mr-2 form-checkbox"
                    />
                    Cả tuần
                    </label>
                    {['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'].map((day) => (
                    <label key={day} className="block px-4 py-2">
                        <input
                        type="checkbox"
                        value={day}
                        checked={selectedDays.includes(day)}
                        onChange={(e) => {
                            if (e.target.checked) {
                            setSelectedDays([...selectedDays, day]);
                            } else {
                            setSelectedDays(selectedDays.filter((d) => d !== day));
                            }
                        }}
                        className="mr-2 form-checkbox"
                        />
                        {day}
                    </label>
                    ))}
                </div>
                )}
            </div>
            </div>

        </div>

        {/* Nút Lưu */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 bg-[#ff7c00] text-white rounded-full hover:bg-gray-700 focus:outline-none"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default InforNewStore;
