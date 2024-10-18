"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, loginWithGoogle } from '@/redux/features/userAuth';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();


  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearError());
    const code = searchParams.get('code');
    if (code && !user) { // Ensure it's only triggered if the user isn't already logged in
      dispatch(loginWithGoogle(code)); // Dispatch the login with Google action
    }
  
  }, [dispatch, searchParams, user]);

  useEffect(()=>{
    if (user) {
      router.push('/'); // Redirect after successful login
    }
  })

  const handleGoogleLogin = () => {
    const clientID = "802970042014-bbq707u390sn2nmcr7ujqn1src1b2po3.apps.googleusercontent.com"
    const callBackURI = "http://localhost:3000/login"
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`; // Adjust the URL based on your Django server
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Log In</h2>
        
        {error && <p className="text-red-500">{error}</p>} {/* Error message display */}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Log In'} {/* Show loading state */}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4">
          <span className="w-full h-px bg-gray-300"></span>
          <span className="mx-4 text-gray-500">or</span>
          <span className="w-full h-px bg-gray-300"></span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full py-2 mt-4 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;




// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const LoginPage = () => {

//   const router = useRouter();
//   useEffect(()=>{
//     code
//   })
//   const { query } = router;   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');



//   const handleGoogleLogin = () => {
//     const clientID = "802970042014-bbq707u390sn2nmcr7ujqn1src1b2po3.apps.googleusercontent.com"
//     const callBackURI = "http://localhost:3000/login"
//     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`; // Adjust the URL based on your Django server
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle regular login logic here (e.g., API call to your Django backend)
//     console.log("Logging in with:", { email, password });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-blue-600">Log In</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="block w-full px-3 py-2 mt-1 text-gray-900 border-b border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="********"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="flex items-center justify-center mt-4">
//           <span className="w-full h-px bg-gray-300"></span>
//           <span className="mx-4 text-gray-500">or</span>
//           <span className="w-full h-px bg-gray-300"></span>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           className="flex items-center justify-center w-full py-2 mt-4 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
//         >
         
//           Log in with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
