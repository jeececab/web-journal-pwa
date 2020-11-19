import React, { useEffect, useContext } from 'react';
import { signup } from '../api/user';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Signup = () => {
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

    const username = e.target.username.value;
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    if (password !== confirm_password) {
      console.log('Nope!');
      return;
    }

    const result = await signup(username, first_name, last_name, email, password);
    console.log(result);
  }

  return (
    <>
      {!user && (
        <div>
          <h2 className="text-3xl my-4 text-center">Sign up</h2>
          <form onSubmit={handleSubmit} className="mx-auto">
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="username"
              placeholder="Username"
              required
              autoFocus
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="first_name"
              placeholder="First name"
              required
              autoFocus
            />
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="text"
              name="last_name"
              placeholder="Last name"
              required
              autoFocus
            />
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
            <input
              className="block my-3 mx-auto px-2 py-1 text-gray-800"
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              required
            />
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
