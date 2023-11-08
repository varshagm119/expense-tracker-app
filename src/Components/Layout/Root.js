import React from 'react';
import Profile from '../Profile/Profile';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
        <Profile />
        <Outlet />
    </div>
  )
}

export default RootLayout;