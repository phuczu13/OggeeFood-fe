import React from "react";
import HeaderHP from "../components/homepage/headerHP";
import FormSignUp from "../components/formHP/form-sign-up";

function SignUp(){

    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderHP />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-[130px] pb-[100px] pt-16 bg-white">
                    <FormSignUp />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
