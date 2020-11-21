import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1 className="font-sans text-4xl py-4 text-center">Web journal</h1>

      <div className="container mx-auto text-center text-xl">
        {!user && (
          <>
            <Link
              className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2 bg-gray-50 text-gray-800"
              to="/signup"
            >
              Sign up
            </Link>
            <Link className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2" to="/login">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2 bg-gray-50 text-gray-800"
              to="/posts/new"
            >
              Add post
            </Link>
            <Link className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2" to="/posts">
              Posts
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
