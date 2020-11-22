import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center text-xl bg-green-600 shadow-lg">
      <h1 className="block ml-3"><Link to="/">Web Journal</Link></h1>

      <nav className="block ml-auto">
        <ul className="flex">
          <li>
            <NavLink exact to="/posts" className="block py-1 px-3" activeClassName="border-b-2 bg-green-700">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/posts/new" className="block py-1 px-3" activeClassName="border-b-2 bg-green-700">New</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
