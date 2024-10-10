import React from "react";
import HeaderHP from "../../components/homepage/headerHP";
import BannerImage from '../../../stores/assets/png/banner_bg.jpg';
import IconAvatar from '../../../stores/assets/svg/banner_icon.svg';
import IconGift from '../../../stores/assets/svg/icon_gift.svg'
import IconReWard from '../../../stores/assets/svg/icon_reward.svg'
import IconHotline from '../../../stores/assets/svg/icon_hotline.svg'

function DetailStore() {
    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderHP />
            </div>
            <div className="flex justify-center mb-10">
                <div className="flex w-[1200px] bg-white">
                    <div className="w-[400px] flex items-center gap-5 justify-center">
                        <div className="bg-[#f1f1f1] border rounded-full w-[168px] h-[168px] flex justify-center">
                            <img className="w-[80px] " src={IconAvatar} alt="ảnh đại diện" />
                        </div>
                        <div>
                            <div className="font-bold text-[24px] mb-2">Bún Bò Phúc Du</div>
                            <div className="font-semibold text-[14px]">Mở cửa: 6:00 - 21:00</div>
                            <div className="font-semibold text-[14px]">Địa chỉ: 74/18 Phan Văn Hớn</div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <img className="w-[400px]" src={BannerImage} alt="ảnh nền" />
                        <img className="w-[400px]" src={BannerImage} alt="ảnh nền" />
                    </div>
                </div>
            </div>
            <div className="flex mr-auto ml-auto w-[1200px] justify-between ">
                <div className="w-[1200px] flex items-center justify-center gap-3">
                    <div className="border-[#ff7c00] border-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <img className="w-[25px] h-[25px]" src={IconGift} alt="icon" />
                    </div>
                    <div>
                        <div className="font-semibold text-[16px]">Món ngon hấp dẫn</div>
                        <div className="text-[14px]">Nhiều gia vị đặc biệt</div>
                    </div>
                </div>

                <div className="w-[1200px] flex items-center gap-3 justify-center">
                    <div className="border-[#ff7c00] border-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <img className="w-[25px] h-[25px]" src={IconReWard} alt="icon" />
                    </div>
                    <div>
                        <div className="font-semibold text-[16px]">Đảm bảo chất lượng</div>
                        <div className="text-[14px]">Đã được kiểm định</div>
                    </div>
                </div>

                <div className="w-[1200px] flex items-center gap-3 justify-center">
                    <div className="border-[#ff7c00] border-2 rounded-full w-10 h-10 flex items-center justify-center">
                        <img className="w-[25px] h-[25px]" src={IconHotline} alt="icon" />
                    </div>
                    <div>
                        <div className="font-semibold text-[16px]">Hotline: 07997584xx</div>
                        <div className="text-[14px]">Liên hệ để được hỗ trợ</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default DetailStore;
