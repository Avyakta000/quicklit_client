// src/app/components/Header.js
"use client";

import { logoutUser, selectIsAuthenticated } from "@/redux/features/userAuth";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated); // Get authentication state

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-around items-center">
        <h1 className="text-xl font-bold">My Website</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/reads">Reads</Link>
            </li>
            {!isAuthenticated ? (
              <li>
                <Link href="/login">Login</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/post-a-read">Post</Link>
                </li>
                
                <li>
                  <button onClick={() => dispatch(logoutUser())}>Logout</button>
                </li>

              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
