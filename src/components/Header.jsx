"use client";

import { clearPreferences } from "@/redux/features/preferenceSlice";
import {
  clearAuth,
  fetchCurrentUser,
  hideModal,
  logoutUser,
  selectIsAuthenticated,
} from "@/redux/features/userAuth";
import { FaRegPaperPlane, FaRegCommentAlt } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { RiHome2Line } from "react-icons/ri";
import ModalComponent from "./ModalComponent";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { clearRecommendations } from "@/redux/features/recommendationsSlice";
import { handleLogout } from "@/utils/helper";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
  const { modalVisible, modalMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkExpiration = () => {
      const expiration = localStorage.getItem("q_exp");
      if (expiration) {
        const expTime = new Date(expiration).getTime();
        const currentTime = Date.now();
        if (currentTime >= expTime) {
          alert("Session expired");
          dispatch(clearAuth());
          localStorage.removeItem("q_exp");
        } else {
          dispatch(fetchCurrentUser());
        }
      }
    };

    checkExpiration();
  }, [dispatch]);

  return (
    <>
      <ModalComponent
        openModal={modalVisible}
        setOpenModal={() => dispatch(hideModal())}
        message={modalMessage}
      />
      <header className="sticky top-0 z-50 bg-white shadow-md py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <div className="flex items-end space-x-1">
            <h1 className="text-3xl text-blue-700 font-bold tracking-tight">
              Quick
            </h1>
            <h1 className="text-3xl font-extrabold text-red-400 tracking-tight transform -rotate-12 origin-bottom-left">
              Lit
            </h1>
          </div>

          <nav>
            <ul className="flex space-x-8 items-center text-gray-700">
              <li>
                <Link href="/" passHref>
                  <RiHome2Line
                    className={`text-xl ${
                      pathname === "/" ? "text-red-500" : "hover:text-blue-700"
                    }`}
                  />
                </Link>
              </li>
              <li>
                <Link href="/reads" passHref>
                  <FaRegCommentAlt
                    className={`text-xl ${
                      pathname === "/reads"
                        ? "text-red-500"
                        : "hover:text-blue-700"
                    }`}
                  />
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link href="/post-a-read" passHref>
                    <FaRegPaperPlane
                      className={`text-xl ${
                        pathname === "/post-a-read"
                          ? "text-red-500"
                          : "hover:text-blue-700"
                      }`}
                    />
                  </Link>
                </li>
              )}

              <div className="flex flex-row space-x-4 justify-center items-center">

              <li>
                <Link
                  href="/about"
                  className="text-lg text-gray-500 hover:text-blue-700 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-lg text-gray-500 hover:text-blue-700 transition"
                >
                  Disclaimer
                </Link>
              </li>
              {/* {!isAuthenticated ? (
                <li>
                  <Link
                    href="/login"
                    className={`text-lg font-semibold ${
                      pathname === "/login"
                        ? "text-red-500"
                        : "hover:text-blue-500"
                    } transition`}
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => handleLogout(dispatch, router)}
                    className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition"
                  >
                    Logout
                  </button>
                </li>
              )} */}

              {!isAuthenticated ? (
                <button
                  onClick={() => router.push("/login")}
                  className={`text-lg px-4 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition duration-300 ${
                    pathname === "/login" ? "bg-red-500" : ""
                  }`}
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => handleLogout(dispatch, router)}
                  className="text-lg px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              )}
              </div>

            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

// "use client";

// import { clearPreferences } from "@/redux/features/preferenceSlice";
// import {
//   clearAuth,
//   fetchCurrentUser,
//   hideModal,
//   logoutUser,
//   selectIsAuthenticated,
// } from "@/redux/features/userAuth";
// import { FaRegPaperPlane, FaRegCommentAlt } from "react-icons/fa";
// import { FiLogIn, FiLogOut } from "react-icons/fi";
// import { RiHome2Line } from "react-icons/ri";
// import ModalComponent from "./ModalComponent";
// import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { redirect, useRouter } from "next/navigation";
// import { clearRecommendations } from "@/redux/features/recommendationsSlice";
// import { handleLogout } from "@/utils/helper";

// export default function Header() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
//   const { modalVisible, modalMessage, status } = useSelector(
//     (state) => state.auth
//   );

//   // const handleLogout = () => {
//   //   dispatch(logoutUser());
//   //   dispatch(clearPreferences());
//   //   dispatch(clearRecommendations());
//   //   localStorage.removeItem("q_exp");
//   //   router.push("/")
//   // };

//   useEffect(() => {
//     const checkExpiration = () => {
//       const expiration = localStorage.getItem("q_exp");
//       console.log("this hitting .....");
//       if (expiration) {
//         const expTime = new Date(expiration).getTime(); // Convert to milliseconds
//         const currentTime = Date.now();
//         console.log(expTime, currentTime, "exp time and curr time");
//         if (currentTime >= expTime) {
//           alert("state removed");
//           // If expired, clear the localStorage
//           dispatch(clearAuth());
//           localStorage.removeItem("q_exp");
//           // Optionally, handle logout or redirection
//         } else {
//           // Fetch current user if not expired
//           dispatch(fetchCurrentUser());
//         }
//       }
//     };

//     checkExpiration();

//     // Set an interval to check every minute (or adjust as necessary)

//     // const intervalId = setInterval(checkExpiration, 60000);

//     return () => {
//       console.log("unmount check expiration");
//     };
//     // return () => clearInterval(intervalId); // Cleanup on unmount
//   }, [dispatch, router]);

//   return (
//     <>
//       <ModalComponent
//         openModal={modalVisible}
//         setOpenModal={() => dispatch(hideModal())} // Hide modal when closed
//         message={modalMessage} // Pass the appropriate message
//       />
//       <header className="sticky top-0 z-50 bg-white shadow-md py-4">
//         <div className="container mx-auto flex justify-around items-center px-4">
//           {/* <h1 className="text-2xl font-bold text-blue-600">QuickLit</h1> */}
//           <div className="flex items-end space-x-1">
//             <h1 className="text-3xl text-blue-500 font-bold tracking-tight">Quick</h1>
//             <h1 className="text-3xl font-extrabold text-red-400 tracking-tight transform -rotate-12 origin-bottom-left">
//               Lit
//             </h1>
//           </div>

//           <nav className="">
//             <ul className="flex space-x-8 items-center">
//               <li>
//                 <Link href="/">
//                   <RiHome2Line className="text-gray-600 hover:text-blue-500 text-xl" />
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/reads">
//                   <FaRegCommentAlt className="text-gray-600 hover:text-blue-500 text-xl" />
//                 </Link>
//               </li>
//               {!isAuthenticated ? (
//                 <li>
//                   <Link href="/login">
//                     <FiLogIn className="text-gray-600 hover:text-blue-500 text-xl" />
//                   </Link>
//                 </li>
//               ) : (
//                 <>
//                   <li>
//                     <Link href="/post-a-read">
//                       <FaRegPaperPlane className="text-gray-600 hover:text-blue-500 text-xl" />
//                     </Link>
//                   </li>
//                   <li>
//                     <button onClick={() => handleLogout(dispatch, router)}>
//                       <FiLogOut className="text-gray-600 hover:text-blue-500 text-xl" />
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </nav>
//         </div>
//       </header>
//     </>
//   );
// }
