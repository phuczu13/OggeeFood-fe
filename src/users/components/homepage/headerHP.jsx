import VietNam from '../../assets/png/imageAvatar.png';
import LogoWeb from '../../assets/svg/icon_logoweb.svg';

function HeaderHP() {
    return (
        <div className="px-4 sm:px-[150px] mb-6 sm:mb-10 py-4 sm:py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoWeb} alt="Logo Web" className="w-24 sm:w-auto" /> {/* Responsive logo */}
                <div className="flex gap-2 sm:gap-4 items-center">
                    <span className="text-[#ff7e00] text-sm sm:text-base font-bold">Việt Nam Cố Lên</span> {/* Responsive text size */}
                    <img className="w-10 sm:w-[50px] h-10 sm:h-[50px] border rounded-full" src={VietNam} alt="Việt Nam" /> {/* Responsive avatar */}
                </div>
            </div>
        </div>
    );
}

export default HeaderHP;
    