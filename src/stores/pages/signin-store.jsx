import React from "react";
import HeaderStore from '../components/headerStore';
import FormSignInStore from '../components/form-signinStore';

function SignInStore() {

    return (
        <div className='bg-[#f1f1f1] w-full h-screen'>
            <div>
                <HeaderStore />
            </div>
            <div>
                <div className="w-fit flex mr-auto ml-auto px-24 pb-10 pt-16 bg-white">
                    <FormSignInStore />
                </div>
            </div>
        </div>
    );
}

export default SignInStore;
