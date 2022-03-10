import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const events = <DashboardButton name={'رویدادها'} to={'/events'} />;
  const articles = <DashboardButton name={'مقاله‌ها'} to={'/articles'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [events, articles],
    mobileLeftItems: [Avatar],
    mobileRightItems: [events, articles],
    mobileMenuListItems: [logoutButton],
  };
};

export default DashboardItems;
