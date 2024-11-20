import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import IconRating from "../../assets/svg/icon_rating.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function ListTopping() {
    const location = useLocation();
    const storeId = location.state?.storeId; // Assuming storeId comes from location state
    const [toppings, setToppings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteLastItemModalOpen, setIsDeleteLastItemModalOpen] = useState(false);
    const [currentTopping, setCurrentTopping] = useState(null);
    const [toppingToDelete, setToppingToDelete] = useState(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch all toppings when component mounts
    useEffect(() => {
        fetchToppings();
        fetchCategories();//note
    }, []);

    const fetchToppings = async () => {
        try {
            const response = await axios.get(`https://be-order-food.vercel.app/api/topping/get-toppings-by-store/${storeId}`);
            setToppings(response.data.data); // Assuming the API returns toppings in 'data'
        } catch (error) {
            console.error("Error fetching toppings:", error);
            toast.error("Failed to load toppings.");
        }
    };

    // API to fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`https://be-order-food.vercel.app/api/category/getallCategory`);
            console.log(response.data); // In toàn bộ phản hồi để kiểm tra
    
            // Kiểm tra xem phản hồi có phải là một mảng hay không
            if (Array.isArray(response.data)) {
                setCategories(response.data); // Gán danh sách danh mục vào state
            } else {
                console.error("Data structure is not as expected");
                toast.error("Unexpected data structure");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories.");
        }
    };

    const openAddModal = () => {
        setCurrentTopping({ toppingName: "", toppingstatus: "", toppingPrice: "", toppingImage: "" });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (topping) => {
        setCurrentTopping(topping);
        setIsEditing(true);
        setSelectedCategory(topping.categoryID);//note
        setIsModalOpen(true);
    };

    const openDeleteModal = (topping) => {
        if (toppings.length > 1) {
            setToppingToDelete(topping);
            setIsDeleteModalOpen(true);
        } else {
            setToppingToDelete(topping);
            setIsDeleteLastItemModalOpen(true);
        }
    };

    // Add or Edit topping
    const handleSave = async () => {
        const { toppingName, toppingstatus, toppingPrice, toppingImage } = currentTopping;
    
        // Kiểm tra nếu các trường bắt buộc còn trống
        if (!toppingName || !toppingstatus || !toppingPrice || !toppingImage) {
            toast.error("Vui lòng điền đầy đủ thông tin món!", { duration: 2000 });
            return;
        }
    
        // Kiểm tra giá topping không hợp lệ
        const price = parseInt(toppingPrice, 10);
    
        if (isNaN(price)) {
            toast.error("Giá tiền không hợp lệ! Giá không được chứa ký tự đặc biệt hoặc chữ cái.", { duration: 2000 });
            return;
        }
    
        if (price < 0) {
            toast.error("Giá tiền phải là số dương.", { duration: 2000 });
            return;
        }
    
        if (price < 1000 || price > 10000000) {
            toast.error("Giá tiền phải từ 1,000 đến 10,000,000 VNĐ.", { duration: 2000 });
            return;
        }
    
        try {
            if (isEditing) {
                // Update topping
                await axios.put(`https://be-order-food.vercel.app/api/topping/update-topping/${currentTopping._id}`, {
                    toppingName,
                    toppingstatus,
                    toppingPrice: price, // Dùng giá trị số hợp lệ
                    toppingImage,
                    categoryID: selectedCategory, // Send selected category ID
                });
                toast.success("Cập nhật món phụ thành công!", { duration: 2000 });
            } else {
                // Add new topping
                await axios.post("https://be-order-food.vercel.app/api/topping/add-topping", {
                    toppingName,
                    toppingstatus,
                    toppingPrice: price, // Dùng giá trị số hợp lệ
                    toppingImage,
                    categoryID: selectedCategory, // Send selected category ID
                    Store_id: storeId,
                });
                toast.success("Thêm món phụ thành công!", { duration: 2000 });
            }
    
            setIsModalOpen(false);
            fetchToppings(); // Refresh topping list after adding/updating
        } catch (error) {
            console.error("Error saving topping:", error);
            toast.error("Lưu món phụ thất bại.");
        }
    };
    

    // Delete topping
    const handleDelete = async () => {
        try {
            await axios.delete(`https://be-order-food.vercel.app/api/topping/delete-topping/${toppingToDelete._id}`);
            toast.success("Xóa món phụ thành công!", { duration: 2000 });
            setIsDeleteModalOpen(false);
            setIsDeleteLastItemModalOpen(false);
            fetchToppings(); // Refresh topping list after deleting
        } catch (error) {
            console.error("Error deleting topping:", error);
            toast.error("Xóa món phụ thất bại.");
        }
    };

    const closeModalOnClickOutside = (e) => {
        if (e.target.className.includes("modal-background")) {
            setIsModalOpen(false);
            setIsDeleteModalOpen(false);
        }
    };
    const closeModalOnClickOutside1 = (e) => {
        // Kiểm tra nếu người dùng click vào phần ngoài modal (có lớp modal-background)
        if (e.target.classList.contains("modal-background")) {
            setIsDeleteModalOpen(false);  // Đóng modal nếu click vào background
        }
    };

    return (
        <>
            <div className="max-w-[1200px] mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#ff7e00]">Món phụ</h2>
                    <button
                        onClick={openAddModal}
                        className="flex items-center bg-[#ff7e00] hover:bg-[#ef4c2b] text-white font-medium px-4 py-2 rounded-md"
                    >
                        <span>Thêm món phụ</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {toppings.map((topping) => (
                        <div key={topping._id} className="border p-3 rounded-lg shadow-sm flex flex-col h-full">
                            <div className="relative">
                                <Link to={'/detail-topping'} state={ {toppingId : topping._id, storeId} } key={topping._id} >
                                    <img src={topping.toppingImage} alt={topping.toppingName} className="w-full h-[150px] object-cover" />
                                </Link>
                                <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                    <span className="text-black font-semibold">{topping.rating}</span>
                                    <span className="ml-1">
                                        <img src={IconRating} alt="" />
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4 flex-grow">
                                <h3 className="font-semibold text-lg line-clamp-2">{topping.toppingName}</h3>
                                <p className="text-gray-500 text-sm line-clamp-1 mt-1">{topping.toppingstatus}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-red-500 font-semibold">
                                    {typeof topping.toppingPrice === 'number'
                                        ? topping.toppingPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                                        : 'Giá không hợp lệ'}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(topping)}
                                        className="bg-[#ff7e00] hover:bg-[#ef4c2b] text-white px-3 py-1 rounded-md"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(topping)}
                                        className="bg-[#ef4c2b] hover:bg-[#ff7e00] text-white px-3 py-1 rounded-md"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-background"
                    onClick={closeModalOnClickOutside}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {isEditing ? "Cập nhật món phụ" : "Thêm món phụ mới"}
                        </h2>
                        <div className="mb-4">
                            <input
                                placeholder="Tên món phụ"
                                type="text"
                                value={currentTopping.toppingName}
                                onChange={(e) =>
                                    setCurrentTopping({ ...currentTopping, toppingName: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="toppingstatus" className="block mb-2 font-medium">Trạng thái</label>
                            <select
                                id="toppingstatus"
                                value={currentTopping.toppingstatus}
                                onChange={(e) =>
                                    setCurrentTopping({ ...currentTopping, toppingstatus: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="Còn">Còn</option>
                                <option value="Hết">Hết</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <input
                                placeholder="Giá"
                                type="number"
                                value={currentTopping.toppingPrice}
                                onChange={(e) =>
                                    setCurrentTopping({ ...currentTopping, toppingPrice: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="URL Ảnh"
                                type="text"
                                value={currentTopping.toppingImage}
                                onChange={(e) =>
                                    setCurrentTopping({ ...currentTopping, toppingImage: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700">Chọn danh mục</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center sm:flex-row gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="w-full sm:w-auto bg-[#ff7e00] hover:bg-[#ef4c2b] text-white px-4 py-2 rounded-md"
                            >
                                {isEditing ? "Cập nhật" : "Thêm món phụ"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div 
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-background"
                    onClick={closeModalOnClickOutside1}  // Click vào background để đóng modal
                >
                    <div
                        className="bg-white text-center p-6 rounded-lg w-11/12 sm:w-1/4"
                        onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click từ div này lan ra ngoài
                    >
                        <h2 className="text-lg font-semibold mb-2">Xác nhận xóa món phụ</h2>
                        <p>Bạn có chắc chắn muốn xóa món phụ <strong>{toppingToDelete.toppingName}</strong>?</p>
                        <div className="flex justify-center gap-3 mt-5">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteLastItemModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Xóa món phụ</h2>
                        <p>Bạn không thể xóa món phụ này vì nó là món phụ cuối cùng. Vui lòng thêm một món phụ khác trước khi xóa.</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsDeleteLastItemModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-md"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Toaster position="bottom-right"/>
        </>
    );
}

export default ListTopping;
