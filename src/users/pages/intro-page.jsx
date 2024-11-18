import LogoWeb from '../assets/svg/icon_logoweb.svg';
import HeaderHP from '../components/homepage/headerHP';
import { Link } from "react-router-dom";

function IntroPage() {
    return (
        <div>
            <div>
                <HeaderHP />
            </div>
            <div className='flex justify-center'>
                <div className='font-bold mt-10 sm:mt-20 px-4'>
                    <h1 className='flex justify-center text-[24px] sm:text-[40px] text-center'>Chào mừng đến với siêu ứng dụng</h1>
                    <div className='flex justify-center my-2'>
                        <img src={LogoWeb} alt="logoWeb" className="w-32 sm:w-48" />
                    </div>
                    <h1 className='flex justify-center text-[18px] sm:text-[26px] mt-3 mb-1 text-center'>Ứng dụng giao đồ ăn tận giường cho bạn</h1>
                    <h1 className='flex justify-center text-[16px] sm:text-[22px] text-center'>Chỉ cần vài cú nhấp chuột bạn sẽ có đồ ăn ngay</h1>
                    <div className='mt-5 flex justify-center'>
                        <Link
                            className='px-4 py-1 sm:px-6 sm:py-2 rounded-full border-2 border-[#ff7e00] text-[#ff7e00] hover:bg-[#ff7e00] hover:text-white'
                            rel="stylesheet" to="/sign-in">
                            Bắt đầu ngay!
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default IntroPage;
