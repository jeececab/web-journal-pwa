export const createPost = async payload => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const fetchPost = async _id => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${_id}`, { credentials: 'include' });
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};
