import React from "react";
// import HeaderUser from "../components/header/header_user";
// import ShoppingCart from "../../src/assets/ShoppingCart.png"
// import ImgBunBo from "../../src/assets/bunbo.png"
// import iconNext from "../../src/assets/next.png"
// import IconBack from "../../src/assets/back.png"
// import IconStart from "../../src/assets/start.png"
// import IconOclock from "../../src/assets/oclock.png"
// import ShoppingCart1 from "../../src/assets/ShoppingCart1.png"

import { useState, useEffect  } from "react";

function DetailFood(){
    const [isOpen, setIsOpen] = useState(false);
    const checkTimeForDoor = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        if (currentHour >= 6 && currentHour < 22) {
          setIsOpen(true); 
        } else {
          setIsOpen(false);
        }
      };
      useEffect(() => {
        checkTimeForDoor();
        const interval = setInterval(checkTimeForDoor, 60000); 
        return () => clearInterval(interval);
    }, []);
    const [price, setPrice] = useState(35000);
    const [size, setSize] = useState("S"); 
    const handleSizeChange = (selectedSize) => {
        setSize(selectedSize);
        if (selectedSize === "S") {
            setPrice(35000);
        } else if (selectedSize === "L") {
            setPrice(40000);
        }
    };
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ["https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg", "https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"];
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleBackImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    const [quantity, setQuantity] = useState(1); 
    const handleQuantityChange = (change) => {
        setQuantity((prevQuantity) => {
            if (prevQuantity + change < 1) return 1; 
            return prevQuantity + change;
        });
    };
    return(
        <div>
            <div>
                {/* <HeaderUser/> */}
            </div>
            <div>
                <div className="flex justify-end items-center h-[80px]">
                   <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="size-8 flex items-center mr-[65px]"></img>
                </div>
                <div className="mx-5">
                <div className="mx-5">
                        <div className="float-left">
                            <div className="border-[#ff7e09] px-[5px] border-2 rounded-[10px] flex justify-start items-center h-[390px] w-[600px]">
                                <div className="flex items-center cursor-pointer" onClick={handleBackImage}>
                                    <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className=" " alt="Back" />
                                </div>
                                <div className="flex w-[390px] h-[390px] mx-[30px]">
                                    <img src={images[currentImageIndex]} alt="Food" />
                                </div>
                                <div className="flex justify-end ml-[30px] cursor-pointer" onClick={handleNextImage}>
                                    <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className=" " alt="Next" />
                                </div>
                            </div>
                            <div className="flex mt-[20px] items-center justify-center">
                                <div className="flex mt-[20px] items-center justify-center">
                                    {images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`w-[120px] h-[100px] rounded-[3px] border-black border-[2px] mx-[10px] cursor-pointer ${currentImageIndex === index ? 'border-orange-500' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}>
                                            <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="w-[100px] h-[100px] flex items-center justify-center" alt="Food thumbnail" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="float-left ml-[20px]">
                        <div>
                            <p className="text-black text-[50px] font-normal ">Quán bún bò Hồ Chí Minh</p>
                            <div className="flex items-center">
                                <p className="text-black text-2xl font-normal   ">Sản phẩm: Bún bò</p>
                                <p className="text-black text-2xl font-normal text-right ml-auto ">Giá: {price.toLocaleString()} VNĐ</p>
                            </div>
                            <div className="flex items-center my-[20px]">
                                <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-5 w-5 mr-[5px]" ></img>
                                <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-5 w-5 mr-[5px] " ></img>
                                <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-5 w-5 mr-[5px]" ></img>
                                <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-5 w-5 mr-[5px]"  ></img>
                                <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-5 w-5 mr-[5px]"  ></img>
                                <div className="flex items-center ml-[80px] ">
                                    <div className="bg-[#FFD809] w-[60px] h-[30px] rounded-[5px] mr-[3px]">
                                        <p className=" flex justify-center text-black text-[20px] font-bold ">+100</p>
                                    </div>
                                    <p> (đánh giá khách hàng) </p>
                                </div>
                            </div>
                            <div className="flex items-center ">
                                <div className={`${isOpen ? 'text-green-500' : 'text-red-500'}`}>
                                    {isOpen ? '🟢 Cửa đang mở' : '🔴 Cửa đang đóng'}
                                </div>
                                <div className="flex items-center ml-[69px] ">
                                    <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className="h-[15px] w-[15px] mr-[10px]"></img>
                                    <p className="font-semibold">6:00 - 22:00 </p>
                                </div>
                            </div>
                            <p className="text-[20px] font-medium mt-[10px]">Size</p>
                            <div className="mt-[8px] flex items-center">
                                <div 
                                    className={`rounded-[5px] w-[39px] h-[45px] border-[1px] border-[#000000] ${size === "S" ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleSizeChange("S")}
                                >
                                    <p className="flex items-between justify-center text-[25px]">S</p>
                                </div>
                                <div 
                                    className={`rounded-[5px] w-[39px] h-[45px] border-[1px] border-[#000000] ml-[10px] ${size === "L" ? 'bg-gray-200' : ''}`}
                                    onClick={() => handleSizeChange("L")}
                                >
                                    <p className="flex items-between justify-center text-[25px]">L</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-[8px]">
                                <div className=" flex items-center justify-center bg-[#D9D9D9] rounded-[3px] w-[89px] h-[39px]" >
                                    <button 
                                        className=" flex justify-center items-center font-bold text-[20px]"
                                        onClick={() => handleQuantityChange(-1)}>-</button>
                                    <p className="mx-[10px] text-[20px]">{quantity}</p>
                                    <button 
                                        className="flex justify-center items-center font-bold text-[20px]"
                                        onClick={() => handleQuantityChange(1)}>+
                                    </button>
                                </div>
                                <div className="bg-[#FF7E09] w-[150px] h-[39px] rounded-[5px] ml-auto flex  items-center px-[10px]">
                                    <img src={"https://i.pinimg.com/564x/a9/b4/fc/a9b4fc8d4b732051c5025e37a73bdc9b.jpg"} className=""></img>
                                    <p className="font-medium ml-auto">Add to Cart</p>
                                </div>
                            </div>
                            <p className="text-[20px] mt-[20px] font-medium">Mô tả: </p>
                            <p>
                                - Bún bò là món ăn với nước dùng đậm đà từ xương bò, thịt bò và mắm ruốc.
                                <p>
                                mắm ruốc.
                                </p>
                            </p>
                            <p>
                                - Món này có hương vị cay, mặn, ngọt đặc trưng, phổ biến nhất là
                                <p>
                                    bún bò Huế.
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailFood;