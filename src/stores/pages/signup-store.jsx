import React from "react";
import HeaderStore from "../components/headerStore";
import FormSignUpStore from "../components/form-signupStore";

function SignUpStore(){

    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderStore />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-28 pb-20 pt-16 bg-white">
                    <FormSignUpStore />
                </div>
            </div>
        </div>
    );
}

export default SignUpStore;
