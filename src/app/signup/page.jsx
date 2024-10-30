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
    const callBackURI = "http://localhost:3000/login"; // Replace with your callback URI
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

// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
// import { useState } from "react";

// const SignupPage = () => {
//   const [openModal, setOpenModal] = useState(true);
//   const [email, setEmail] = useState('');

//   function onCloseModal() {
//     setOpenModal(false);
//     setEmail('');
//   }

//   return (
//     <>
//       <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
//       <Modal show={openModal} size="md" onClose={onCloseModal} popup>
//         <Modal.Header className="bg-gray-200" />
//         <Modal.Body className="bg-gray-200">
//           <div className="space-y-6">
//             <h3 className="text-xl font-medium text-gray-900 dark:text-black">Sign in to our platform</h3>
//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="email" value="Your email" />
//               </div>
//               <TextInput
//                 id="email"
//                 placeholder="name@company.com"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <div className="mb-2 block">
//                 <Label htmlFor="password" value="Your password" />
//               </div>
//               <TextInput id="password" type="password" required />
//             </div>
//             <div className="flex justify-between">
//               <div className="flex items-center gap-2">
//                 <Checkbox id="remember" />
//                 <Label htmlFor="remember">Remember me</Label>
//               </div>
//               <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
//                 Lost Password?
//               </a>
//             </div>
//             <div className="w-full">
//               <Button>Log in to your account</Button>
//             </div>
//             <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
//               Not registered?&nbsp;
//               <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
//                 Create account
//               </a>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
// export default SignupPage;

// import { useState } from 'react';
// import { FcGoogle } from 'react-icons/fc';

// const SignupPage = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validate passwords match
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     // Handle signup logic here
//     console.log('First Name:', firstName);
//     console.log('Last Name:', lastName);
//     console.log('Email:', email);
//     console.log('Password:', password);
//     setError(""); // Clear error
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
//         <p className="text-center text-gray-500 mt-2">Join us and explore amazing features.</p>
//         {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="John"
//               />
//             </div>
//             <div className="flex-1">
//               <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Doe"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//             />
//           </div>
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="••••••••"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             Sign Up
//           </button>

//         </form>
//         <button
//           className="flex items-center justify-center w-full mt-4 py-3 text-lg font-semibold text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
//         >
//           <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
//           Login with Google
//         </button>
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
