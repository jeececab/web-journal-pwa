import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1 className="font-sans text-4xl py-4 text-center">Web journal</h1>

      <div className="container mx-auto text-center text-xl">
        <Link className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2 bg-gray-50 text-gray-800" to="/signup">
          Sign up
        </Link>
        <Link className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Home;
