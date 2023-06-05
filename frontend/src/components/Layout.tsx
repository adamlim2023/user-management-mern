import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: FC = () => {
  interface RouteProp {
    id: number;
    label: string;
    path: string;
  };

  const routes: RouteProp[] = [
    {
      id: 1,
      label: "Users",
      path: "/"
    },
    {
      id: 2,
      label: "Books",
      path: "/books"
    },
    {
      id: 3,
      label: "Cards",
      path: "/cards"
    },
  ];

  return <div className='text-gray-700'>
    <div className='h-20 shadow px-5'>
      <div className='h-full flex items-center justify-between max-w-7xl mx-auto'>
        <h3 className='font-bold text-2xl'>Logo</h3>
        <ul className='flex -mx-4'>
          {
            routes.map((route: RouteProp) => <li
              className="font-medium text-base mx-4"
              key={route.id}
            >
              <Link to={route.path}>{route.label}</Link>
            </li>)
          }
        </ul>
      </div>
    </div>
    <div className='px-5'>
      <div className='max-w-7xl mx-auto py-10'>
        <Outlet />
      </div>
    </div>
  </div>
}

export default Layout;