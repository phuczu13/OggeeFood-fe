import VietNam from '../../assets/png/imageAvatar.png';
import LogoStore from '../../assets/svg/icon_logoStore.svg';
import { useLocation } from "react-router-dom";


function HeaderStoreLogin() {
    const location = useLocation();
    const storeId = location.state?.storeId;
    return (
        <div className="px-4 md:px-10 lg:px-[150px] mb-10 py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoStore} className='w-[150px] md:w-[200px]' alt="Logo Web" />
                <div className="flex gap-4 items-center">
                    <span className="text-[#ff7e00] font-bold text-sm md:text-base lg:text-lg">Chào bạn cửa hàng thân thiết</span>
                    <img className="w-[40px] md:w-[50px] h-[40px] md:h-[50px] border rounded-full" src={VietNam} alt="Việt Nam" />
                </div>
            </div>
        </div>
    );
}

export default HeaderStoreLogin;
