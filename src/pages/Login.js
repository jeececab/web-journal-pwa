import React, { useState, useEffect, useContext } from 'react';
import { login } from '../api/user';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      history.replace('/posts');
    }
    // eslint-disable-next-line
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await login(email, password);

    if (!result.user) return setError(result.error);

    setUser(result.user);
  }

  return (
    <>
      {!user && (
        <div>
          <h2 className="text-3xl my-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="mx-auto w-11/12 max-w-md">
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="email"
              name="email"
              placeholder="Email"
              required
              autoFocus
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="password"
              name="password"
              placeholder="Password"
              required
            />

            {error && <p className="text-red-600 my-3 text-center">{error}</p>}

            <button type="submit" className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2">
              Submit
            </button>
          </form>
          <p className="text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
