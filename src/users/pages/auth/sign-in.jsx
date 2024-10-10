import React from "react";
import HeaderHP from "../../components/homepage/headerHP";
import FormSignIn from "../../components/formHP/form-sign-in";

function SignIn() {

    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderHP />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-24 pb-12 pt-10 bg-white">
                    <FormSignIn />
                </div>
            </div>
        </div>
    );
}

export default SignIn;
