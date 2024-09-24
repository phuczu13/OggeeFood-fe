import VietNam from '../../assets/png/imageAvatar.png'
import LogoWeb from '../../assets/svg/icon_logoweb.svg'

function HeaderHP(){
    return(
        <div className="px-[150px] mb-10 py-[15px] border-b bg-white">
            <div className="flex justify-between items-center">
                <img src={LogoWeb} alt="Logo Web" />
                <div className="flex gap-4 items-center">
                    <span className="text-[#ff7e00] font-bold">Việt Nam Cố Lên</span>
                    <img className="w-[50px] h-[50px] border rounded-full" src={VietNam} alt="Việt Nam" />
                </div>
            </div>
        </div>
    )
}

export default HeaderHP