import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InforDriver() {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [licenseImage, setLicenseImage] = useState(null);
    const [vehicleDocumentImage, setVehicleDocumentImage] = useState(null);

    const navigate = useNavigate();
    const driverId = localStorage.getItem('driverId')
    // Handle image uploads
    const handleImageUpload = (event, setImage) => {
        const file = event.target.files[0];
        if (file) {
          setImage(file); 
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường dữ liệu nhập vào
        if (!firstname || !surname || !dob || !gender || !profileImage || !licenseImage || !vehicleDocumentImage) {
          toast.error('Vui lòng điền đầy đủ thông tin và tải lên tất cả các tài liệu!');
          return;
        }
        // Combine firstname and surname into one 'name' field
        const name = `${surname} ${firstname}`;

        // Create form data to send to the server
        const formData = new FormData();
        formData.append("name", name);
        formData.append("dateOfBirth", dob);
        formData.append("gender", gender);
        formData.append("profileImage", profileImage);
        formData.append("licenseImage", licenseImage);
        formData.append("vehicleDocumentImage", vehicleDocumentImage);

        try {
          const response = await axios.put(
              `https://be-order-food.vercel.app/api/driver/update-driver/${driverId}`, 
              formData
          );
          console.log("Driver updated:", response.data);
          // Redirect after success (optional)
          toast.success('Đăng ký thành công')
          navigate("/order-driver");
      } catch (error) {
          console.error("Error updating driver:", error);
      }
    };

    return (
      
        <div className="min-h-screen py-20" style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}>
          <ToastContainer position='top-right'/>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row w-full lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <h1 className="text-white text-3xl mb-3">Welcome</h1>
                    <div className="w-full lg:w-1/2 py-12 px-8">
                        <h2 className="text-3xl font-semibold mb-4">Register</h2>
                        <p className="mb-6 text-gray-600">Create your account. It’s free and only takes a minute.</p>
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="Firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="mt-5">
                                <label className="block text-gray-600 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="mt-5">
                                <label className="block text-gray-600 mb-2">Gender</label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            onChange={(e) => setGender(e.target.value)}
                                            className="form-radio text-purple-500"
                                        />
                                        <span className="ml-2 text-gray-600">Male</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            onChange={(e) => setGender(e.target.value)}
                                            className="form-radio text-purple-500"
                                        />
                                        <span className="ml-2 text-gray-600">Female</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label for="avatar" className="block text-gray-600 mb-2">Upload 3x4 Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="profileImage" id="avatar"
                                    onChange={(e) => handleImageUpload(e, setProfileImage)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {profileImage && (
                                    <div className="mt-4">
                                        <img
                                            src={profileImage}
                                            alt="Profile Preview"
                                            className="w-24 h-32 object-cover rounded-md border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-5">
                                <label for="driverLicenseImage" className="block text-gray-600 mb-2">Upload Driver's License</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="licenseImage" id="driverLicenseImage"
                                    onChange={(e) => handleImageUpload(e, setLicenseImage)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {licenseImage && (
                                    <div className="mt-4">
                                        <img
                                            src={licenseImage}
                                            alt="License Preview"
                                            className="w-32 h-24 object-cover rounded-md border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-5">
                                <label for="vehicleOwnerImage" className="block text-gray-600 mb-2">Upload Vehicle Document</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="vehicleDocumentImage" id="vehicleOwnerImage"
                                    onChange={(e) => handleImageUpload(e, setVehicleDocumentImage)}
                                    className="border border-gray-400 py-2 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                {vehicleDocumentImage && (
                                    <div className="mt-4">
                                        <img
                                            src={vehicleDocumentImage}
                                            alt="Vehicle Document Preview"
                                            className="w-32 h-24 object-cover rounded-md border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mt-5 flex items-center">
                                <input type="checkbox" className="border border-gray-400 mr-2" />
                                <span className="text-gray-600">
                                    I accept the
                                    <a href="#" className="text-purple-500 font-semibold hover:underline">
                                        Terms of Use
                                    </a>{" "}
                                    &{" "}
                                    <a href="#" className="text-purple-500 font-semibold hover:underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full bg-purple-500 py-3 text-white rounded-md hover:bg-purple-600 transition duration-200"
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforDriver;
