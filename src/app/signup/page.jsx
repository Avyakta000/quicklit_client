"use client";

import { CustomAlert } from "@/components/Alert";
import { signupUser } from "@/redux/features/userAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const SignupPage = () => {
  const [alert, setAlert] = useState(null); 
  const router = useRouter()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { status, error } = useSelector((state) => state.auth);

  const onCloseModal = () => {
    setOpenModal(false);
    // Reset all fields on close
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    router.push("/")
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setAlert({ type: 'error', message: 'Passwords do not match!' });
      return;
    }
    dispatch(signupUser({first_name:firstName, last_name:lastName, email, password1, password2}))
    // Handle signup logic here
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    
  };

  const handleGoogleLogin = () => {
    const clientID = "802970042014-bbq707u390sn2nmcr7ujqn1src1b2po3.apps.googleusercontent.com"; 
    const callBackURI = process.env.NEXT_PUBLIC_CALLBACK_URI; // Replace with your callback URI
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`;

    window.location.href = googleAuthURL;
  };

  if(status==="success"){
    router.push("/")
  }

  return (
    <>
    <div className="h-[calc(100vh-68px)]" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/050/503/588/small_2x/a-close-up-of-a-wave-in-the-ocean-photo.jpeg')", backgroundRepeat: "no-repeat",
      backgroundSize: "cover", }}>

  
      {openModal && (
        <div className="top-16 z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {alert && <CustomAlert {...alert} onDismiss={() => setAlert(null)} />}
          <div className="relative w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={onCloseModal}
            >
              <FaTimes/>
            </button>
            <h3 className="text-2xl font-semibold text-center text-gray-900">
              Create Account
            </h3>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <form onSubmit={handleSignupSubmit} className="space-y-4 mt-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="John"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password1"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-2 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
              {status === "loading" ? "loading..." : "Submit"}
              </button>
            </form>
            <div className="flex items-center justify-center mt-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              className="flex items-center justify-center w-full py-3 mt-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
              onClick={handleGoogleLogin}
            >
            <FaGoogle/> <span className="mx-2">Sign Up with Google</span>
            </button>
            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?
              <Link
                href={"/login"}
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default SignupPage;
