import React from 'react';
import { HEADER_TITLE, HEADER_EXPL } from '@constants/ui';
import logo from '@assets/logo.svg';
import { Icon } from '@iconify/react';

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-4 bg-transparent h-14">
      <img src={logo} alt="logo" />
      <Icon icon="ci:hamburger-md" width={30} />
    </header>
  );
};

export default Header;
