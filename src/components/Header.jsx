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
import { redirect, useRouter } from "next/navigation";
import { clearRecommendations } from "@/redux/features/recommendationsSlice";
import { handleLogout } from "@/utils/helper";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
  const { modalVisible, modalMessage, status } = useSelector((state) => state.auth);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   dispatch(clearPreferences());
  //   dispatch(clearRecommendations());
  //   localStorage.removeItem("q_exp");
  //   router.push("/")
  // };
  

  useEffect(() => {
    const checkExpiration = () => {
      const expiration = localStorage.getItem("q_exp");
      console.log("this hitting .....")
      if (expiration) {
        const expTime = new Date(expiration).getTime(); // Convert to milliseconds
        const currentTime = Date.now();
        console.log(expTime, currentTime, 'exp time and curr time')
        if (currentTime >= expTime) {
          alert("state removed")
          // If expired, clear the localStorage
          dispatch(clearAuth())
          localStorage.removeItem("q_exp");
          // Optionally, handle logout or redirection
        } else {
          // Fetch current user if not expired
          dispatch(fetchCurrentUser());
        }
      }
    };

    checkExpiration();

    // Set an interval to check every minute (or adjust as necessary)

    // const intervalId = setInterval(checkExpiration, 60000);

    return () => {

      console.log('unmount check expiration')

    }; 
    // return () => clearInterval(intervalId); // Cleanup on unmount
  }, [dispatch, router]);

  return (
    <>
      <ModalComponent
        openModal={modalVisible}
        setOpenModal={() => dispatch(hideModal())} // Hide modal when closed
        message={modalMessage} // Pass the appropriate message
      />
      <header className="sticky top-0 z-50 bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-around items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">QuickLit</h1>
          <nav className="">
            <ul className="flex space-x-8 items-center">
              <li>
                <Link href="/">
                  <RiHome2Line className="text-gray-600 hover:text-blue-500 text-xl" />
                </Link>
              </li>
              <li>
                <Link href="/reads">
                  <FaRegCommentAlt className="text-gray-600 hover:text-blue-500 text-xl" />
                </Link>
              </li>
              {!isAuthenticated ? (
                <li>
                  <Link href="/login">
                    <FiLogIn className="text-gray-600 hover:text-blue-500 text-xl" />
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/post-a-read">
                      <FaRegPaperPlane className="text-gray-600 hover:text-blue-500 text-xl" />
                    </Link>
                  </li>
                  <li>
                    <button onClick={()=>handleLogout(dispatch, router)}>
                      <FiLogOut className="text-gray-600 hover:text-blue-500 text-xl" />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

