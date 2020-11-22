import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosJournal } from 'react-icons/io';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full text-xl bg-green-600 shadow-lg">
      <div className="flex justify-between items-center container mx-auto max-w-6xl">
        <Link to="/" className="flex items-center">
          <span className="text-2xl ml-2">
            <IoIosJournal />
          </span>
          <h1 className="block ml-1">Web Journal</h1>
        </Link>

        <nav className="block ml-auto">
          <ul className="flex">
            <li>
              <NavLink
                exact
                to="/posts"
                className="block py-1 px-4 hover:bg-green-700"
                activeClassName="border-b-2 bg-green-700 shadow-inner"
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/new"
                className="block py-1 px-4 hover:bg-green-700"
                activeClassName="border-b-2 bg-green-700 shaddow-inner"
              >
                New
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stats"
                className="block py-1 px-4 hover:bg-green-700"
                activeClassName="border-b-2 bg-green-700 shaddow-inner"
              >
                Stats
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
