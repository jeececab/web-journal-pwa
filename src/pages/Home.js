import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1 className="font-sans text-4xl py-4 text-center">Web journal</h1>

      <div className="container mx-auto text-center text-xl">
      <p className="w-10/12 mx-auto mt-2 mb-8">A productivity app to log your progress as a web developer</p>

        {!user && (
          <>
            <Link
              className="block w-40 font-bold border-green-600 border-2 my-4 mx-auto py-2 bg-green-600 text-gray-800"
              to="/signup"
            >
              Sign up
            </Link>
            <Link className="block w-40 font-bold border-green-600 text-green-600 border-2 my-4 mx-auto py-2" to="/login">
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              className="block w-40 font-bold border-green-600 border-2 my-4 mx-auto py-2 bg-green-600 text-gray-800"
              to="/posts/new"
            >
              Add post
            </Link>
            <Link className="block w-40 font-bold border-green-600 text-green-600 border-2 my-4 mx-auto py-2" to="/posts">
              Posts
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
