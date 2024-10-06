import React from "react";
import HeaderStore from "../../components/header/login-headerStore";
import FormSignUpStore from "../../components/form/form-signupStore";

function SignUpStore(){

    return (
        <div className='bg-[#f1f1f1] w-full h-screen pb-10'>
            <div>
                <HeaderStore />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-20 pb-5 pt-10 bg-white">
                    <FormSignUpStore />
                </div>
            </div>
        </div>
    );
}

export default SignUpStore;
