import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import { IoIosJournal } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../api/user';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="fixed top-0 left-0 w-full text-xl bg-green-600">
      <div className="flex justify-between items-center container mx-auto max-w-6xl">
        <Link to="/" className="flex items-center">
          <span className="text-2xl ml-2 py-1">
            <IoIosJournal />
          </span>
          <h1 className="block ml-1 journal-logo">Web Journal</h1>
        </Link>

        {user && (
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
              <li className="flex items-center cursor-pointer hover:bg-green-700">
                <button onClick={() => logout()} className="py-2 px-4"><FiLogOut /></button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
