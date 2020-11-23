export const signup = async (username, first_name, last_name, email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, first_name, last_name, email, password })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const logout = async () => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/users/logout`, { credentials: 'include' });
    return window.location.replace('/');
  } catch (error) {
    console.log(error);
  }
};

export const me = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, { credentials: 'include' });
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};
