'use client'

import React, { useState } from "react";
import Input from "./Input";
import { CgArrowLeftR } from "react-icons/cg";
import api from "../../api";
import { useAppDispatch } from "@/lib/hook";
import { add } from "@/lib/features/emailSlice/emailSlice";

// import { useNavigate } from "react-router-dom";

const Form = (): JSX.Element => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [fullName, setFullName] = useState<string>("");
  const [validEmail, setValidEmail] = useState<string>("");
  const [validPassword, setValidPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState("");
  const [useAs, setUseAs] = useState("")

  const checkEmailPasswordValidation = async (): Promise<void> => {
    setError(""); // Clear previous errors
    // Validate Email
    const isValidEmail = (): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        return true;
      } else {
        setError("Invalid email address");
        return false;
      }
    };

    // Validate Password
    const isValidPassword = (): boolean => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordRegex.test(password)) {
        return true;
      } else {
        setError(
          "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters"
        );
        return false;
      }
    };

    // Check email and password validity
    if (isValidEmail() && isValidPassword()) {
      try {
        const response = await api.get(
          `/api/auth/email-validation?email=${email}`
        );
        if (response.status === 200) {
          setIsRegister(true);
          setError("Email is already registered");
        } else {
          setIsRegister(false);
          setValidEmail(email);
          setValidPassword(password);
          setCurrentIndex(currentIndex + 1); // Move to the next step
        }
      } catch (err) {
        setError("Error validating email. Please try again.");
      }
    }
  };

  const handleSubmit = async () => {
    setError("");

    if(!location) {setError("Location is required"); return;}
    if(!industry) {setError("Industry is required"); return;}
    if(!useAs) {setError("Use As is required"); return;}
    
    
    if(location && industry && useAs){
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", validEmail);
      formData.append("password", validPassword);
      formData.append("location", location);
      formData.append("industry", industry);
      formData.append("useAs", useAs);
      
      try {
        const response = await api.post("/api/auth/sign-up", formData);
        if (response.status === 201) {
          console.log("user data in form: ", response.data.data);
          
          const userData = response.data.data
          dispatch(add(userData?.email))

        } else {
          setError("Error registering user. Please try again.");
        }
      } catch (error) {
       console.log("REgister user error: ", error) 
      }


    }


    
  };

  return (
    <div className="mt-10 mx-16 flex w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="w-full flex-shrink-0">
          <div className="mt-6">
            <h1 className="text-[25px] font-extrabold text-black">
              Sign up to Dribbble
            </h1>
          </div>
          <div className="ml-6 mt-3">
            {error && (
              <ul>
                <li className="text-red-600 font-semibold">{error}</li>
              </ul>
            )}
          </div>

          <Input
            label="Name"
            id="name"
            type="text"
            placeholder="eg. Jhon duo"
            value={fullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            placeholder="eg. jhonduo@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="8+ Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mt-7">
            <button
              className="bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              // onClick={checkEmailPasswordValidation}
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-full flex-shrink-0 p-4">
          <CgArrowLeftR
            className="text-black mb-6 text-2xl"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          />

          <div className="ml-6 mt-3">
            {error && (
              <ul>
                <li className="text-red-600 font-semibold">{error}</li>
              </ul>
            )}
          </div>
          <label
            htmlFor="useFor"
            className="block text-gray-700 font-bold mb-2"
          >
            Use As <span className="text-red-700">*</span>
          </label>
          <select
            name=""
            id="useFor"
            className="shadow-xl border rounded-xl w-[95%] h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            onChange={(e:any) => setUseAs(e.target.value) }
          >
            <option value="0">Select</option>
            <option value="1">Company</option>
            <option value="2">Student</option>
          </select>
          <div className=" w-full mt-6">
            <Input
              label="Industry Name"
              type="text"
              value={industry}
              onChange={(e: any) => setIndustry(e.target.value)}
              placeholder="eg. IT"
              className=""
            />
          </div>
          <div className=" w-full mt-2">
            <Input
              label="Location"
              type="text"
              value={location}
              onChange={(e: any) => setLocation(e.target.value)}
              placeholder="eg. Banglore"
              className=""
            />
          </div>
          <div className="relative xl:w-[26rem]">
            <input
              type="checkbox"
              id="terms"
              className="absolute top-[0.38rem] left-1"
            />
            <h2 className="text-black inline-block ml-6 font-semibold">
              Creating an account means you're okay with our{" "}
              <a href="#" className="text-blue-600">
                Terms of Service, Privacy Policy,
              </a>
              and default{" "}
              <a href="#" className="text-blue-600">
                Notification Setting
              </a>
            </h2>
          </div>
          <div className="flex justify-end mt-7">
            <button className="bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
