import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const dashboard = <DashboardButton name={'رویدادها'} to={'/events'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [dashboard],
    mobileLeftItems: [Avatar],
    mobileRightItems: [dashboard],
    mobileMenuListItems: [logoutButton],
  };
};

export default DashboardItems;
