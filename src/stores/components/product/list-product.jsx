import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import IconRating from "../../assets/svg/icon_rating.svg";
import { useLocation } from "react-router-dom";

function ListProduct() {
    const location = useLocation();
    const storeId = location.state?.storeId; // Assuming storeId comes from location state
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteLastItemModalOpen, setIsDeleteLastItemModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch all products when component mounts
    useEffect(() => {
        fetchProducts();
        fetchCategories();//note
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/product/get-products-by-store/${storeId}`);
            setProducts(response.data.data); // Assuming the API returns products in 'data'
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        }
    };

    // API to fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/api/category/getallCategory/${storeId}`);
            setCategories(response.data.data); // Assuming categories come in 'data'
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to load categories.");
        }
    };

    const openAddModal = () => {
        setCurrentProduct({ Food_name: "", Food_detail: "", Price: "", Food_picture: "" });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setSelectedCategory(product.categoryID);//note
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (product) => {
        if (products.length > 1) {
            setProductToDelete(product);
            setIsDeleteModalOpen(true);
        } else {
            setProductToDelete(product);
            setIsDeleteLastItemModalOpen(true);
        }
    };

    // Add or Edit product
    const handleSave = async () => {
        const { Food_name, Food_detail, Price, Food_picture } = currentProduct;

        if (!Food_name || !Food_detail || !Price || !Food_picture || !selectedCategory) {
            toast.error("Vui lòng điền đầy đủ thông tin món và chọn danh mục!", { duration: 2000 });
            return;
        }

        try {
            if (isEditing) {
                // Update product
                await axios.put(`http://localhost:3002/api/product/update-product/${currentProduct._id}`, {
                    Food_name,
                    Food_detail,
                    Price,
                    Food_picture,
                    categoryID: selectedCategory, // Send selected category ID
                });
                toast.success("Cập nhật món thành công!", { duration: 2000 });
            } else {
                // Add new product
                await axios.post("http://localhost:3002/api/product/create-product", {
                    Food_name,
                    Food_detail,
                    Price,
                    Food_picture,
                    categoryID: selectedCategory, // Send selected category ID
                    Store_id: storeId,
                });
                toast.success("Thêm món thành công!", { duration: 2000 });
            }

            setIsModalOpen(false);
            fetchProducts(); // Refresh product list after adding/updating
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Lưu món thất bại.");
        }
    };

    // Delete product
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3002/api/product/delete-product/${productToDelete._id}`);
            toast.success("Xóa món thành công!", { duration: 2000 });
            setIsDeleteModalOpen(false);
            setIsDeleteLastItemModalOpen(false);
            fetchProducts(); // Refresh product list after deleting
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Xóa món thất bại.");
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
                    <h2 className="text-2xl font-bold text-[#ff7e00]">Món ăn</h2>
                    <button
                        onClick={openAddModal}
                        className="flex items-center bg-[#ff7e00] hover:bg-[#ef4c2b] text-white font-medium px-4 py-2 rounded-md"
                    >
                        <span>Thêm món</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border p-3 rounded-lg shadow-sm">
                            <div className="relative">
                                <img src={product.Food_picture} alt={product.Food_name} className="w-full h-[150px] object-cover" />
                                <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                    <span className="text-black font-semibold">{product.rating}</span>
                                    <span className="ml-1">
                                        <img src={IconRating} alt="" />
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">{product.Food_name}</h3>
                                <p className="text-gray-500 text-sm">{product.Food_detail}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-500 font-semibold">{product.Price} VNĐ</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(product)}
                                            className="bg-[#ff7e00] hover:bg-[#ef4c2b] text-white px-3 py-1 rounded-md"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(product)}
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
                            {isEditing ? "Cập nhật món" : "Thêm món mới"}
                        </h2>
                        <div className="mb-4">
                            <input
                                placeholder="Tên món"
                                type="text"
                                value={currentProduct.Food_name}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, Food_name: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Mô tả"
                                type="text"
                                value={currentProduct.Food_detail}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, Food_detail: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Giá"
                                type="text"
                                value={currentProduct.Price}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, Price: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="URL Ảnh"
                                type="text"
                                value={currentProduct.Food_picture}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, Food_picture: e.target.value })
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
                                {isEditing ? "Cập nhật" : "Thêm món"}
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

            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-background"
                    onClick={(e) => {
                        if (e.target.className.includes('modal-background')) {
                            setIsDeleteModalOpen(false);  
                        }
                    }}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-3 text-center">Xác nhận xóa món</h2>
                        <p className="text-center">
                            Bạn có chắc chắn muốn xóa món <strong>{productToDelete?.name}</strong>?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                            <button
                                onClick={handleDelete}  
                                className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Xoá
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteLastItemModalOpen && ( 
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-background"
                    onClick={(e) => {
                        if (e.target.className.includes('modal-background')) {
                            setIsDeleteLastItemModalOpen(false);  
                        }
                    }}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-3 text-center">Cảnh báo</h2>
                        <p className="text-center">
                            Bạn không thể xóa món ăn cuối cùng. 
                        </p>
                        <p className="text-center">
                            Vui lòng thêm ít nhất một món ăn khác trước khi xóa.
                        </p>
                        <div className="flex gap-3 mt-6 justify-center">
                            <button
                                onClick={() => setIsDeleteLastItemModalOpen(false)} 
                                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <Toaster position="top-right"/>
        </>
    );
}

export default ListProduct;
