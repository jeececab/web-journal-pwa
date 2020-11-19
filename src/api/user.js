export const signup = async (username, first_name, last_name, email, password) => {
  try {
    const response = await fetch(`http://localhost:5000/users`, {
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
    const response = await fetch(`http://localhost:5000/users/login`, {
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

export const me = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/me`, { credentials: 'include' });
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};
