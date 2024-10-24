// components/Layout.jsx
import React from 'react';
import Profile from './Profile';
import { selectIsAuthenticated } from '@/redux/features/userAuth';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <main className="h-screen bg-gray-200 flex justify-center items-center">
    <div className="flex w-full max-w-[1000px]">
      {
        isAuthenticated && 
      <div className="w-1/4 mt-2 p-2 mb-2 rounded-md border-r border-gray-300">
        <Profile />
      </div>
      }
      <div className="flex-1 p-2 overflow-auto h-screen hide-scrollbar">
        {children}
      </div>
    </div>
  </main>
  
  
  );
};

export default Layout;
