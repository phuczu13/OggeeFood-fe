import React, { useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DoanhThu() {
  const sampleData = [
    {
      storeId: "store1",
      storeName: "Cửa hàng ABC",
      storeAddress: "123 Đường A, Quận 1, TP.HCM",
      items: [
        {
          _id: "product1",
          name: "Sản phẩm 1",
          description: "Mô tả sản phẩm 1",
          imageUrl: "https://via.placeholder.com/80",
          price: 50000,
          quantity: 2,
        },
        {
          _id: "product2",
          name: "Sản phẩm 2",
          description: "Mô tả sản phẩm 2",
          imageUrl: "https://via.placeholder.com/80",
          price: 70000,
          quantity: 1,
        },
        {
            _id: "product3",
            name: "Sản phẩm 3",
            description: "Mô tả sản phẩm 3",
            imageUrl: "https://via.placeholder.com/80",
            price: 40000,
            quantity: 1,
          },
      ],
    },
    {
      storeId: "store2",
      storeName: "Cửa hàng XYZ",
      storeAddress: "456 Đường B, Quận 2, TP.HCM",
      items: [
        {
          _id: "product4",
          name: "Sản phẩm 4",
          description: "Mô tả sản phẩm 4",
          imageUrl: "https://via.placeholder.com/80",
          price: 30000,
          quantity: 3,
        },
        {
            _id: "product5",
            name: "Sản phẩm 5",
            description: "Mô tả sản phẩm 5",
            imageUrl: "https://via.placeholder.com/80",
            price: 30000,
            quantity: 3,
          },
      ],
    },
  ];

  const [cartItems, setCartItems] = useState(sampleData);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [activeStore, setActiveStore] = useState(null); // Cửa hàng đang được chọn
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Trạng thái hiển thị dialog
  const [storeToDelete, setStoreToDelete] = useState(null);

  const handleQuantityChange = (storeId, productId, action) => {
    const updatedCartItems = cartItems.map((store) => {
      if (store.storeId === storeId) {
        return {
          ...store,
          items: store.items.map((item) => {
            if (item._id === productId) {
              const newQuantity = action === 'increase'
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1); // Điều kiện không giảm dưới 1
              return { ...item, quantity: newQuantity };
            }
            return item;
          }).filter(item => item.quantity > 0),
        };
      }
      return store;
    });
  
    setCartItems(updatedCartItems);
  };  

  const handleSelectItem = (storeId, productId) => {
    if (activeStore && activeStore !== storeId) {
      toast.error("Chỉ được chọn 1 cửa hàng");
      return;
    }

    const itemKey = `${storeId}-${productId}`;
    const newSelectedItems = new Set(selectedItems);

    if (newSelectedItems.has(itemKey)) {
      newSelectedItems.delete(itemKey);
      if (newSelectedItems.size === 0) setActiveStore(null); // Bỏ chọn tất cả, không còn cửa hàng nào
    } else {
      newSelectedItems.add(itemKey);
      setActiveStore(storeId); // Ghi nhận cửa hàng đang chọn
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAllStoreItems = (storeId, isChecked) => {
    if (activeStore && activeStore !== storeId) {
      toast.error("Chỉ được chọn 1 cửa hàng");
      return;
    }

    const newSelectedItems = new Set(selectedItems);

    cartItems.forEach(store => {
      if (store.storeId === storeId) {
        store.items.forEach(item => {
          const itemKey = `${store.storeId}-${item._id}`;
          if (isChecked) {
            newSelectedItems.add(itemKey);
          } else {
            newSelectedItems.delete(itemKey);
          }
        });
      }
    });

    setSelectedItems(newSelectedItems);
    setActiveStore(isChecked ? storeId : null); // Cập nhật cửa hàng đang chọn
  };

  const calculateSelectedTotalItems = () => {
    return Array.from(selectedItems).reduce((acc, itemKey) => {
      const [storeId, productId] = itemKey.split('-');
      const store = cartItems.find(store => store.storeId === storeId);
      const item = store?.items?.find(item => item._id === productId);
      return acc + (item ? item.quantity : 0);
    }, 0);
  };

  const calculateSelectedTotalPrice = () => {
    return Array.from(selectedItems).reduce((acc, itemKey) => {
      const [storeId, productId] = itemKey.split('-');
      const store = cartItems.find(store => store.storeId === storeId);
      const item = store?.items?.find(item => item._id === productId);
      return acc + (item ? item.price * item.quantity : 0);
    }, 0);
  };

  const selectedTotalItems = useMemo(() => calculateSelectedTotalItems(), [selectedItems, cartItems]);
  const selectedTotalPrice = useMemo(() => calculateSelectedTotalPrice(), [selectedItems, cartItems]);

  const handleDeleteProduct = (storeId, productId) => {
    const updatedCartItems = cartItems
      .map((store) => {
        if (store.storeId === storeId) {
          return {
            ...store,
            items: store.items.filter((item) => item._id !== productId),
          };
        }
        return store;
      })
      .filter((store) => store.items.length > 0); // Xóa cửa hàng nếu không còn sản phẩm

    setCartItems(updatedCartItems);

    // Cập nhật trạng thái chọn
    const itemKey = `${storeId}-${productId}`;
    const newSelectedItems = new Set(selectedItems);
    newSelectedItems.delete(itemKey);
    setSelectedItems(newSelectedItems);

    // Xóa trạng thái cửa hàng nếu tất cả sản phẩm bị xóa
    if (!updatedCartItems.find((store) => store.storeId === storeId)) {
      setActiveStore(null);
    }
  };
  
  const handleDeleteAllProduct = () => {
    if (!storeToDelete) return;

    const updatedCartItems = cartItems.filter((store) => store.storeId !== storeToDelete);
    setCartItems(updatedCartItems);

    // Xóa tất cả sản phẩm của cửa hàng khỏi danh sách được chọn
    const newSelectedItems = new Set(selectedItems);
    Array.from(selectedItems).forEach((itemKey) => {
      const [storeId] = itemKey.split('-');
      if (storeId === storeToDelete) {
        newSelectedItems.delete(itemKey);
      }
    });

    setSelectedItems(newSelectedItems);

    // Reset trạng thái nếu không còn cửa hàng nào được chọn
    if (!updatedCartItems.find((store) => store.storeId === activeStore)) {
      setActiveStore(null);
    }

    // Đóng dialog
    setIsDialogOpen(false);
    setStoreToDelete(null);
  };

  const openDialog = (storeId) => {
    setStoreToDelete(storeId); // Lưu ID cửa hàng cần xóa
    setIsDialogOpen(true); // Hiển thị dialog
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setStoreToDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <div className="flex-1 w-full max-w-[1200px] mx-auto mt-10 px-4 pb-10">
        <ToastContainer />
        {cartItems.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-2xl font-semibold mb-4">Giỏ hàng của bạn đang trống</p>
          </div>
        ) : (
          <div>
            <div className="text-xl font-bold mb-4 text-[#ff7e00]">Danh sách sản phẩm</div>
            {cartItems.map((store) => {
              const isStoreFullySelected = store.items.every(item => 
                selectedItems.has(`${store.storeId}-${item._id}`)
              );
              const isDisabled = activeStore && activeStore !== store.storeId; // Vô hiệu hóa cửa hàng khác

              return (
                <div key={store.storeId} className="mt-5 border shadow-sm bg-white py-4">
                  <div className="flex items-center border-b pb-4 px-9">
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4"
                      checked={isStoreFullySelected}
                      disabled={isDisabled}
                      onChange={(e) => handleSelectAllStoreItems(store.storeId, e.target.checked)}
                    />
                    <div className='flex w-full justify-between items-center'>
                        <div className='flex flex-col ml-2'>
                        <div className='flex gap-2 items-center'>
                            <h2 className='bg-[#ef4b2c] px-2 text-sm text-white font-semibold h-fit'>Yêu thích</h2>
                            <h2 className="text-lg font-semibold">{store.storeName}</h2>
                        </div>
                        <p className="text-gray-500 text-[14px]">{store.storeAddress}</p>
                        </div>
                        <button 
                            className="ml-4 text-[#ef4b2c] hover:bg-red-500 hover:text-white h-fit px-2 py-1 rounded font-semibold border border-[#ef4b2c]"
                            onClick={() => openDialog(store.storeId)} // Mở hộp thoại xác nhận
                            >
                            Xóa tất cả món
                        </button>
                    </div>
                  </div>
                  {store.items.map((item) => (
                    <div className='px-5'>
                        <div key={item._id} className="border-b p-4 flex justify-between items-center">
                            <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-5 h-4 w-4"
                                checked={selectedItems.has(`${store.storeId}-${item._id}`)}
                                disabled={isDisabled}
                                onChange={() => handleSelectItem(store.storeId, item._id)}
                            />
                            <img className="w-20 h-20 object-cover mr-4" src={item.imageUrl} alt="product" />
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-500">{item.description}</p>
                            </div>
                            </div>
                            <div className="flex items-center">
                            <button
                                className="border rounded-full h-6 w-6 flex items-center justify-center"
                                onClick={() => handleQuantityChange(store.storeId, item._id, 'decrease')}
                            >
                                -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                                className="border rounded-full h-6 w-6 flex items-center justify-center"
                                onClick={() => handleQuantityChange(store.storeId, item._id, 'increase')}
                            >
                                +
                            </button>
                            {item.quantity > 0 && (
                                <button
                                className="ml-4 text-red-500"
                                onClick={() => handleDeleteProduct(store.storeId, item._id)}
                                >
                                Xóa
                                </button>
                            )}
                            </div>
                        </div>
                    </div>
                    ))}
                    <div className='px-9 mt-3'>
                        Kiếm gì ghi ở đây cho nó đỡ trống nè, chứ dư cái border-b
                    </div>
                </div>
              );
            })}
            <div className="mt-5 p-4 border-t bg-white shadow-sm">
              <p className="text-lg font-bold">Tổng cộng:</p>
              <p>Số lượng: {selectedTotalItems}</p>
              <p>Doanh thu: {selectedTotalPrice.toLocaleString()} VNĐ</p>
            </div>
          </div>
        )}
      </div>

      {/* Dialog Modal */}
      {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/4">
              <h3 className="text-lg font-bold text-center">Xác nhận xóa</h3>
              <p className="text-gray-600 mb-5">
                Bạn có chắc chắn muốn xóa tất cả món của cửa hàng này?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-400"
                  onClick={closeDialog} // Đóng hộp thoại
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={handleDeleteAllProduct} // Xác nhận xóa
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default DoanhThu;
