import React, { useState } from "react";

// Component ConfirmDialog
const ConfirmDialog = ({ isOpen, onClose, onConfirm, message, showCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-lg font-semibold">{message}</h2>
          <div className="flex justify-center mt-4">
            {showCancel && (
              <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Hủy</button>
            )}
            <button onClick={onConfirm} className="px-4 py-2 bg-[#ff7e00] text-white rounded">Xác nhận</button>
          </div>
        </div>
      </div>
    );
  };

function ListProducts() {
  const [products, setProducts] = useState([
    {
      name: "Bún Bò Huế",
      category: "Bò Tái",
      topping: "Tái, Nạm, Gân",
      image: "https://lh3.googleusercontent.com/proxy/Xrl45AR1hVgjJsZllJDaBAzw50AEx0BeDhMqDmn8wGs-p7cmw61erHZ_gIFWgZldV6V1BTRrIg4dPcdPsLoDK4WfdOAtHxo8n3vtpARLUd03",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    topping: "",
    image: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmLastItem, setShowConfirmLastItem] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddOrEditProduct = () => {
    if (!newProduct.name.trim() || !newProduct.category.trim() || !newProduct.topping.trim() || !newProduct.image.trim()) {
      setShowConfirmAdd(true); // Hiển thị hộp thoại xác nhận khi thiếu thông tin
      return;
    }

    if (editIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }
    setNewProduct({ name: "", category: "", topping: "", image: "" });
    setShowForm(false);
  };

  const handleCancel = () => {
    setNewProduct({ name: "", category: "", topping: "", image: "" });
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEditProduct = (index) => {
    setNewProduct(products[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteProduct = (index) => {
    if (products.length === 1) {
      setShowConfirmLastItem(true); // Hiển thị hộp thoại xác nhận nếu là món cuối cùng
      return;
    }
    setDeleteIndex(index);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    const updatedProducts = products.filter((_, i) => i !== deleteIndex);
    setProducts(updatedProducts);
    setShowConfirmDelete(false);
    setDeleteIndex(null);
  };

  const confirmAdd = () => {
    setShowConfirmAdd(false);
  };

  const confirmLastItem = () => {
    setShowConfirmLastItem(false);
  };

  return (
    <div>
      <div className="flex mr-auto ml-auto w-[1200px] bg-white justify-between p-4 mb-5">
        <div className="flex items-center">
          <span className="text-[22px] font-semibold">Cửa hàng của bạn</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full border border-[#ff7c00] text-center px-3 py-2 text-white"
          >
            Thêm món mới
          </button>
        </div>
      </div>

      {/* Form thêm hoặc chỉnh sửa sản phẩm */}
      {showForm && (
        <div className="flex flex-col gap-2 mr-auto ml-auto w-[1200px] bg-white p-4 mb-5">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 mb-2 focus:outline-none focus:border-[#ff7e00]"
          />
          <input
            type="text"
            placeholder="Thể loại"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="border p-2 mb-2 focus:outline-none focus:border-[#ff7e00]"
          />
          <input
            type="text"
            placeholder="Topping"
            value={newProduct.topping}
            onChange={(e) => setNewProduct({ ...newProduct, topping: e.target.value })}
            className="border p-2 mb-2 focus:outline-none focus:border-[#ff7e00]"
          />
          <input
            type="text"
            placeholder="URL Hình ảnh"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2 mb-2 focus:outline-none focus:border-[#ff7e00]"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddOrEditProduct}
              className="hover:bg-[#ff7e00] hover:text-white hover:border-[#ff7e00] hover:border bg-white border border-[#ff7c00] text-center px-3 py-1 text-[#ff7e00]"
            >
              {editIndex !== null ? "Lưu" : "Thêm mới"}
            </button>
            <button
              onClick={handleCancel}
              className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] border border-[#ff7c00] text-center px-3 py-1 text-white"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <div className="flex mr-auto ml-auto w-[1200px] bg-white justify-between">
        <table className="w-full">
          <thead className="bg-[#ff7e00] text-white">
            <tr className="text-[18px]">
              <th className="w-1/5 text-start py-2 px-3 font-semibold">Hình ảnh</th>
              <th className="w-1/5 text-start font-semibold">Tên sản phẩm</th>
              <th className="w-1/5 text-start font-semibold">Thể loại</th>
              <th className="w-1/5 text-start font-semibold">Topping</th>
              <th className="w-1/5 text-start font-semibold pl-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-t font-semibold">
                <td>
                  <img
                    src={product.image}
                    alt="image product"
                    className="w-[100px] h-[100px] object-cover p-3"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.topping}</td>
                <td>
                  <div className="flex gap-2 p-3">
                    <button
                      onClick={() => handleEditProduct(index)}
                      className="hover:bg-[#ff7e00] hover:text-white hover:border-[#ff7e00] hover:border bg-white w-full border border-[#ff7c00] text-center px-1 py-1 text-[#ff7e00]"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="hover:bg-white hover:text-[#ff7e00] hover:border-[#ff7e00] hover:border bg-[#ff7e00] w-full border border-[#ff7c00] text-center px-1 py-1 text-white"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hộp thoại xác nhận xóa */}
      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={confirmDelete}
        message="Bạn có chắc chắn muốn xóa món này?"
        showCancel={true}
      />

      {/* Hộp thoại xác nhận khi thiếu thông tin */}
      <ConfirmDialog
        isOpen={showConfirmAdd}
        onClose={confirmAdd}
        onConfirm={confirmAdd}
        message="Vui lòng điền đầy đủ thông tin sản phẩm."
        showCancel={false}
      />

      {/* Hộp thoại xác nhận không thể xóa món cuối cùng */}
      <ConfirmDialog
        isOpen={showConfirmLastItem}
        onClose={confirmLastItem}
        onConfirm={confirmLastItem}
        message="Không thể xóa. Phải có ít nhất một món trong cửa hàng."
        showCancel={false}
      />
    </div>
  );
}

export default ListProducts;
