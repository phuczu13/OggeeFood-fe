import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import IconRating from "../../assets/svg/icon_rating.svg";
import { useLocation } from "react-router-dom";

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
            const response = await axios.get(`https://be-order-food.vercel.app/api/category/getallCategory/${storeId}`);
            setCategories(response.data.data); // Assuming categories come in 'data'
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

        if (!toppingName || !toppingstatus || !toppingPrice || !toppingImage) {
            toast.error("Vui lòng điền đầy đủ thông tin món!", { duration: 2000 });
            return;
        }

        try {
            if (isEditing) {
                // Update topping
                await axios.put(`https://be-order-food.vercel.app/api/topping/update-topping/${currentTopping._id}`, {
                    toppingName,
                    toppingstatus,
                    toppingPrice,
                    toppingImage,
                    categoryID: selectedCategory, // Send selected category ID
                });
                toast.success("Cập nhật topping thành công!", { duration: 2000 });
            } else {
                // Add new topping
                await axios.post("https://be-order-food.vercel.app/api/topping/add-topping", {
                    toppingName,
                    toppingstatus,
                    toppingPrice,
                    toppingImage,
                    categoryID: selectedCategory, // Send selected category ID
                    Store_id: storeId,
                });
                toast.success("Thêm topping thành công!", { duration: 2000 });
            }

            setIsModalOpen(false);
            fetchToppings(); // Refresh topping list after adding/updating
        } catch (error) {
            console.error("Error saving topping:", error);
            toast.error("Lưu topping thất bại.");
        }
    };

    // Delete topping
    const handleDelete = async () => {
        try {
            await axios.delete(`https://be-order-food.vercel.app/api/topping/delete-topping/${toppingToDelete._id}`);
            toast.success("Xóa topping thành công!", { duration: 2000 });
            setIsDeleteModalOpen(false);
            setIsDeleteLastItemModalOpen(false);
            fetchToppings(); // Refresh topping list after deleting
        } catch (error) {
            console.error("Error deleting topping:", error);
            toast.error("Xóa topping thất bại.");
        }
    };

    const closeModalOnClickOutside = (e) => {
        if (e.target.className.includes("modal-background")) {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <div className="max-w-[1200px] mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#ff7e00]">Topping</h2>
                    <button
                        onClick={openAddModal}
                        className="flex items-center bg-[#ff7e00] hover:bg-[#ef4c2b] text-white font-medium px-4 py-2 rounded-md"
                    >
                        <span>Thêm topping</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {toppings.map((topping) => (
                        <div key={topping._id} className="border p-3 rounded-lg shadow-sm">
                            <div className="relative">
                                <img src={topping.toppingImage} alt={topping.toppingName} className="w-full h-[150px] object-cover" />
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">{topping.toppingName}</h3>
                                <p className="text-gray-500 text-sm">{topping.toppingstatus}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-500 font-semibold">{topping.toppingPrice} VNĐ</span>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Modal */}
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
                            {isEditing ? "Cập nhật topping" : "Thêm topping mới"}
                        </h2>
                        <div className="mb-4">
                            <input
                                placeholder="Tên topping"
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
                                type="text"
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

                        {/* Category Selection */}
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

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleSave}
                                className="w-full sm:w-auto bg-[#ff7e00] hover:bg-[#ef4c2b] text-white px-4 py-2 rounded-md"
                            >
                                {isEditing ? "Cập nhật" : "Thêm topping"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Xóa topping</h2>
                        <p>Bạn có chắc chắn muốn xóa topping <strong>{toppingToDelete.toppingName}</strong>?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md ml-2"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Last Item Confirmation Modal */}
            {isDeleteLastItemModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Xóa topping</h2>
                        <p>Bạn không thể xóa topping này vì nó là topping cuối cùng. Vui lòng thêm một topping khác trước khi xóa.</p>
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

            <Toaster />
        </>
    );
}

export default ListTopping;
