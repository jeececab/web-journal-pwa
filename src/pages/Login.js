import React, { useEffect, useContext } from 'react';
import { login } from '../api/user';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace('/entries');
    }
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await login(email, password);
    console.log(result);
  }

  return (
    <>
      {!user && (
        <div>
          <h2 className="text-3xl my-4 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="mx-auto">
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
