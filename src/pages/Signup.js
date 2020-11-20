import React, { useEffect, useContext, useState } from 'react';
import { signup } from '../api/user';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Signup = () => {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      history.replace('/entries');
    }
    // eslint-disable-next-line
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const username = e.target.username.value.toLowerCase();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    const regex = /\s/g;

    if (password !== confirm_password) {
      setError("Passwords don't match");
    } else if (username.match(regex) || password.match(regex)) {
      setError("Username and password can't contain white spaces");
    } else {
      const result = await signup(username, first_name, last_name, email, password);

      if (!result.user) return setError(result.error);

      setUser(result.user);
    }
  }

  return (
    <>
      {!user && (
        <div>
          <h2 className="text-3xl my-4 text-center">Sign up</h2>
          <form onSubmit={handleSubmit} className="mx-auto w-11/12 max-w-md">
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="username"
              placeholder="Username"
              required
              maxLength="30"
              autoFocus
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="first_name"
              placeholder="First name"
              maxLength="30"
              required
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="last_name"
              placeholder="Last name"
              maxLength="30"
              required
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="email"
              name="email"
              placeholder="Email"
              required
              maxLength="100"
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="password"
              name="password"
              placeholder="Password"
              required
              maxLength="100"
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              required
              maxLength="100"
            />

            {error && <p className="text-red-600 my-3 text-center">{error}</p>}

            <button type="submit" className="block w-40 border-gray-50 border-2 my-4 mx-auto py-2">
              Submit
            </button>
          </form>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Signup;
