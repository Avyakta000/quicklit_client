"use client";

import { clearPreferences } from "@/redux/features/preferenceSlice";
import {
  fetchCurrentUser,
  hideModal,
  logoutUser,
  selectIsAuthenticated,
} from "@/redux/features/userAuth";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { MdOutlineContactSupport } from "react-icons/md";
import ModalComponent from "./ModalComponent";
import { RiHome2Line } from "react-icons/ri";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state
  const { modalVisible, modalMessage } = useSelector((state) => state.auth);

  const handleLogout = () => {
    console.log("clearing state preferences");
    dispatch(logoutUser());
    dispatch(clearPreferences());
    router.push("/")
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
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-around items-center">
          <h1 className="text-xl font-bold">QuickLit</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/">
                  <RiHome2Line />
                </Link>
              </li>
              <li>
                <Link href="/reads">
                  <FaRegCommentAlt />
                </Link>
              </li>
              {!isAuthenticated ? (
                <li>
                  <Link href="/login">
                    <FiLogIn />
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/post-a-read">
                      <FaRegPaperPlane />
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>
                      <FiLogOut />
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
