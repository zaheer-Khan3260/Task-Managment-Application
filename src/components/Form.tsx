import React, { useState } from "react";
import Input from "./Input";
import api from "../../api";

// import { useNavigate } from "react-router-dom";

const Form = (): JSX.Element => {
  // const navigate = useNavigate();
  const [FullName, setFullName] = useState<string>("");
  const [validEmail, setValidEmail] = useState<string>("");
  const [validPassword, setValidPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [location, setLocation] = useState("")

  const checkEmailPasswordValidation = async (): Promise<void> => {
    setError(""); // Clear previous errors

    console.log("email value: ", email)
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
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
        const response = await api.get(`/api/auth/email-validation?email=${email}`);
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
            placeholder="Name"
            value={FullName}
            onChange={(e: any) => setFullName(e.target.value)}
          />

          <Input
            // label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
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
            <button
              className="bg-blue-500 mb-6 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              onClick={checkEmailPasswordValidation}
            >
              Next
            </button>
          </div>
        </div>
        <div className="w-full flex-shrink-0 p-4">
        <div className=' w-full mt-2'>
                <div className='text-[22px] font-bold'>
                  Add your location 
                </div>
                <Input
                label="Location"
                type="text"
                value={location}
                onChange={(e:any) => setLocation(e.target.value)}
                placeholder='Enter a location' className='' />
            </div>
          <label htmlFor="useFor"
          className="block text-gray-700 font-bold mb-2"
          >Use For</label>
            <select name="" id="useFor" 
            className="shadow-xl border rounded-xl w-[95%] h-11 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
              <option value="0">Select</option>
              <option value="1">Company</option>
              <option value="2">Student</option>
              <option value="3"></option>
              <option value="4">Other</option>
            </select>
        </div>
      </div>
    </div>
  );
};

export default Form;
