import React, { useState } from "react";
import IconRating from '../../assets/svg/icon_rating.svg';

function ListTopping() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Đùi gà nhỏ",
            description: "1 cái",
            price: "10.000 VND",
            rating: 4.7,
            image: 'https://i.ytimg.com/vi/InxT5IWEBWk/maxresdefault.jpg',
        },
        {
            id: 2,
            name: "Đùi gà lớn",
            description: "1 cái",
            price: "20.000 VND",
            rating: 4.9,
            image: 'https://i-giadinh.vnecdn.net/2021/10/01/Gxim-1633061096-8197-1633061138.png',
        },

    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);

    const openAddModal = () => {
        setCurrentProduct({ name: "", description: "", price: "", image: "" });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openDeleteModal = (product) => {
        if (products.length > 1) {
            setProductToDelete(product);
            setIsDeleteModalOpen(true);
        } else {
            alert("Không thể xóa, cần ít nhất 1 món ăn trong danh sách.");
        }
    };

    const handleSave = () => {
        if (isEditing) {
            setProducts(
                products.map((item) =>
                    item.id === currentProduct.id ? currentProduct : item
                )
            );
        } else {
            setProducts([
                ...products,
                { ...currentProduct, id: products.length + 1 },
            ]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        setProducts(products.filter((item) => item.id !== productToDelete.id));
        setIsDeleteModalOpen(false);
    };

    const closeModalOnClickOutside = (e) => {
        if (e.target.className.includes('modal-background')) {
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
                    {products.map((product) => (
                        <div key={product.id} className="border p-3 rounded-lg shadow-sm">
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full h-[150px] object-cover" />
                                <div className="absolute w-fit top-0 right-0 rounded-bl-md flex px-2 py-1 bg-slate-100 items-center justify-end text-sm text-white">
                                    <span className="text-black font-semibold">{product.rating}</span>
                                    <span className="ml-1"><img src={IconRating} alt="" /></span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-500 text-sm">{product.description}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-500 font-semibold">{product.price}</span>
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
                                            Xoá
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
                    className="fixed inset-0 flex items-center justify-center modal-background bg-black bg-opacity-50"
                    onClick={closeModalOnClickOutside}
                >
                    <div className="bg-white p-6 rounded-lg w-1/3" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? "Cập nhật topping" : "Thêm topping"}
                        </h2>
                        <div className="mb-4">
                            <input
                                placeholder="Tên topping"
                                type="text"
                                value={currentProduct.name}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, name: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Mô tả"
                                type="text"
                                value={currentProduct.description}
                                onChange={(e) =>
                                    setCurrentProduct({
                                        ...currentProduct,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="Giá"
                                type="text"
                                value={currentProduct.price}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, price: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                placeholder="URL Ảnh"
                                type="text"
                                value={currentProduct.image}
                                onChange={(e) =>
                                    setCurrentProduct({ ...currentProduct, image: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-[#ff7e00]"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                className="bg-[#ff7e00] hover:bg-[#ef4c2b] text-white px-4 py-2 rounded-md"
                            >
                                {isEditing ? "Cập nhật" : "Thêm topping"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-background"
                    onClick={(e) => {
                        if (e.target.className.includes('modal-background')) {
                            setIsDeleteModalOpen(false);  
                        }
                    }}
                >
                    <div className="bg-white p-6 rounded-lg w-1/4" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-3 text-center">Xác nhận xóa Topping</h2>
                        <p className="text-center">Bạn có chắc chắn muốn xóa Topping <strong>{productToDelete?.name}</strong>?</p>
                        <div className="flex gap-3 mt-6 justify-center">
                            <button
                                onClick={handleDelete}  
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Xoá
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ListTopping;
