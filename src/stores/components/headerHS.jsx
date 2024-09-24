import VietNam from '../../users/assets/png/imageAvatar.png';
import LogoStore from '../assets/svg/icon_logoStore.svg';
import SettingHS from '../assets/svg/icon_setting.svg';


function HeaderHS(){
    return(
        <div className="px-[150px] mb-10 py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoStore} className='w-[200px]' alt="Logo Web" />
                <div className="flex gap-4 items-center">
                    <div className='flex gap-4 items-center mr-5'>
                        <span className="text-[#ff7e00] font-bold">Phúc Mập Quán</span>
                        <img className="w-[45px] h-[45px] border rounded-full" src={VietNam} alt="Việt Nam" />
                    </div>
                    <div>
                        <img className="w-[30px] h-[30px]" src={SettingHS} alt="setting" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderHS