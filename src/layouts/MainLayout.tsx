import { Outlet } from 'react-router-dom';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="max-screen-sm mx-auto w-full flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
