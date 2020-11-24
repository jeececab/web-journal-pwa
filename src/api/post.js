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

export const fetchPost = async date_title => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${date_title}`, { credentials: 'include' });
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const fetchUserPosts = async ({ limit, skip, sort, month }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts?limit=${limit}&skip=${skip}&sort=${sort}${
        month ? '&month=' + month : ''
      }`,
      {
        credentials: 'include'
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
};

export const updatePost = async (_id, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${_id}`, {
      method: 'PATCH',
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
