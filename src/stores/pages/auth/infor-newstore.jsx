import React from "react";
import FormNewInfo from '../../components/form/form-newinfo'

function InforNewStore() {
  return (
    <div className="bg-[#f1f1f1] w-full h-max">
      <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-0 pb-[150px]">
        <div className="flex justify-center w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          <FormNewInfo />
        </div>
      </div>
    </div>
  );
}

export default InforNewStore;
