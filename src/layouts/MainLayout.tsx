import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen max-w-container flex-col">
      <Header />
      <main className="m-10 flex-1">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
