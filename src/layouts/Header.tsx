import logo from '@assets/logo.svg';
import { Icon } from '@iconify/react';
import { LL_COLOR } from '@constants/ui';

const Header = () => {
  return (
    <header className="mx-10 flex h-[60px] items-center justify-between bg-transparent px-4">
      <img src={logo} alt="logo" />
      <Icon icon="ci:hamburger-md" width={30} color={LL_COLOR.subBlack} />
    </header>
  );
};

export default Header;
