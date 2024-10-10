import React from "react";
import HeaderHP from "../../components/homepage/headerHP";

function HomePage () {
    return(
        <div >
            <div>
                <HeaderHP />
            </div>
            <div className="max-w-[1200px] mx-auto border">
                <div className="w-full flex p-5 mt-8">
                    <button className="flex w-[10%] justify-start">
                        <div></div>
                    </button>
                    <div className="w-full flex justify-center">
                        <input type="text" name="" id="" 
                            src="iconSearch"
                            placeholder="Tìm kiếm món yêu thích"
                            className="border-2 w-1/2 rounded-full border-[#d0d0d0] px-4 py-2 focus:outline-none focus:border-[#ff7e00]"
                        />
                    </div>
                    <button className="flex w-[10%] justify-end">
                        <img src="" alt="iconCart" />
                    </button>
                </div>

                <div className="mt-10">
                    <div className="w-full">
                        <div className="w-[200px] flex gap-4 h-fit">
                            <div className="bg-[#ff7e00] w-[10px] max-h-full rounded-r-md"></div>
                            <div className="bg-[#ff7e00] py-3 px-5 w-fit rounded-lg text-white font-semibold">Bún bò Phúc du</div>
                        </div>
                        <div className="flex justify-center w-full">
                            <div className=" grid gap-10 mt-5 grid-cols-4 justify-between">
                                
                                <div className="border rounded-lg w-fit hover:border-[#ff7e00] hover:border hover:ring-2 hover:ring-[#ff7e00]">
                                    <div className="border rounded-lg">
                                        <img className="w-[275px] h-[150px] rounded-lg" src="https://dulichdanangcity.vn/blog/wp-content/uploads/2021/11/cach-nau-bun-bo-hue.jpg" alt="imgProduct" />
                                    </div>
                                    <div className="mt-4">
                                        <h1 className="text-center font-semibold">Bún bò</h1>
                                        <div className="justify-between flex ">
                                            <button>
                                                <span>+</span>
                                            </button>
                                            <span className="font-semibold">30.000 VND</span>
                                            <button>
                                                <span>+</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage