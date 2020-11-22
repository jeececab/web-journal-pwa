import React, { useEffect, useState } from 'react';
import { fetchUserPosts } from '../../../api/post';
import PostsContext from '../../../contexts/PostsContext';
import LoadingSpinner from '../../LoadingSpinner';
import PostsListTable from './PostsListTable';

const PostsList = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function setPostsList(options) {
    const result = await fetchUserPosts(options);

    if (!result.posts) {
      setError('Failed to fetch posts');
    } else {
      setPosts(result.posts);
      setError(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    const limit = 10;
    const skip = 0;
    const sort = 'desc';

    setPostsList({ limit, skip, sort });
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && error && <p>{error}</p>}

      {!loading && (
        <PostsContext.Provider value={{ posts, setPostsList }}>
          <PostsListTable />
        </PostsContext.Provider>
      )}
    </>
  );
};

export default PostsList;
