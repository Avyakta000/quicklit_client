"use client";

import { clearPreferences } from "@/redux/features/preferenceSlice";
import {
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
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
  const { modalVisible, modalMessage } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearPreferences());
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

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
                    <button onClick={handleLogout}>
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
