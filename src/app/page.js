"use client";

import ModalComponent from "@/components/ModalComponent";
import Recommendations from "@/components/Recommendations";
import { fetchPreferences } from "@/redux/features/preferenceSlice";
import { hideModal, selectIsAuthenticated } from "@/redux/features/userAuth";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

export default function HomePage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { status, error, preferences } = useSelector(
    (state) => state.preferences
  );
  const { modalVisible, modalMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch preferences if the user is authenticated
    if (isAuthenticated && status === "idle") {
      dispatch(fetchPreferences());
    }
  }, [isAuthenticated, status, dispatch]);

  if (!isAuthenticated) {
    // If the user is not authenticated, show the login button
    return (
      <>
        <ModalComponent
          openModal={modalVisible}
          setOpenModal={() => dispatch(hideModal())} // Hide modal when closed
          message={modalMessage} // Pass the appropriate message
        />

        <div className="flex justify-center items-center h-screen bg-gray-100">
          <main className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Welcome to QuickLit!
            </h1>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
              Discover amazing content, learn new things, and join our community
              of enthusiasts.
            </p>
            <Link
              href="/login"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Get Started
            </Link>
          </main>
        </div>
      </>
    );
  }

  if (status === "loading") {
    // Show loading spinner while preferences are being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-gray-600">
          <Spinner color="info" size="md" aria-label="Info" />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    // If fetching preferences fails, show a fallback message
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Failed to load preferences: {error}
        </div>
      </div>
    );
  }

  if (preferences && preferences.length > 0) {
    // If authenticated and preferences are available, show recommendations
    return (
      <>
        <ModalComponent
          openModal={modalVisible}
          setOpenModal={() => dispatch(hideModal())} // Hide modal when closed
          message={modalMessage} // Pass the appropriate message
        />
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome Back QuickLit!
          </h1>
          <Recommendations />
        </main>
      </>
    );
  }

  // If the user is authenticated but has no preferences, prompt them to set preferences
  return (
    <div>
      {/* Modal Component */}
      <ModalComponent
        openModal={modalVisible}
        setOpenModal={() => dispatch(hideModal())} // Hide modal when closed
        message={modalMessage} // Pass the appropriate message
      />

      <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome Back to QuickLit!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          It seems you haven't set any preferences yet. Let's get started with
          that.
        </p>
        <Link
          href="/interests"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Set Preferences
        </Link>
      </main>
    </div>
  );
}

// // src/app/page.js
// "use client";

// import Recommendations from "@/components/Recommendations";
// import { fetchPreferences } from "@/redux/features/preferenceSlice";
// import { selectIsAuthenticated } from "@/redux/features/userAuth";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function HomePage() {
//   const dispatch = useDispatch()
//   const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
//   const {status, error, preferences} = useSelector(state => state.preferences)
//   useEffect(()=>{
//     if(status=="idle"){
//       console.log('idle status')
//       dispatch(fetchPreferences())
//     }
//   }, [status, dispatch])

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-lg font-semibold text-gray-600">
//           Loading preferences...
//         </div>
//       </div>
//     );
//   }

//   if (status === "failed") {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-lg font-semibold text-red-500">
//           Failed to load preferences: {error}
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to My QuickLit!</h1>
//         <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
//           Discover amazing content, learn new things, and join our community of enthusiasts.
//         </p>
//         {/* {
//           preferences ? <Recommendations/> : <Link href='/interests' className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
//           Get Started
//         </Link>}  */}
//         {
//           preferences ? <Recommendations/> : <Link href='/login' className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
//           Get Started
//         </Link>}

//       </main>
//     </div>
//   );
// }
