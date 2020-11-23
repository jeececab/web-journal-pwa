import React, { useEffect, useState } from 'react';
import { fetchUserPosts } from '../../../api/post';
import PostsContext from '../../../contexts/PostsContext';
import LoadingSpinner from '../../LoadingSpinner';
import PostsListTable from './PostsListTable';
import Pagination from './Pagination';

const PostsList = () => {
  const [posts, setPosts] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({ limit: 7, skip: 0, sort: 'desc' });

  async function setPostsList(options) {
    setOptions(options);
    const result = await fetchUserPosts(options);

    if (!result.posts) {
      setError('Failed to fetch posts');
    } else {
      setPosts(result.posts);
      setMeta(result.meta);
      setError(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    setPostsList(options);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}

      {!loading && error && <p>{error}</p>}

      {!loading && (
        <PostsContext.Provider value={{ posts, setPostsList, meta, options }}>
          <PostsListTable />
          <Pagination />
        </PostsContext.Provider>
      )}
    </>
  );
};

export default PostsList;
