import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

      {!loading && posts.length === 0 && (
        <div className="container mx-auto text-center text-xl mt-2">
          <p>You don't have any post yet</p>
          <Link
            className="block w-40 font-bold border-green-600 hover:border-green-500 border-2 my-4 mx-auto py-2 bg-green-600 hover:bg-green-500 text-gray-800"
            to="/posts/new"
          >
            Add post
          </Link>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <PostsContext.Provider value={{ posts, setPostsList, meta, options }}>
          <PostsListTable />
          <Pagination />
        </PostsContext.Provider>
      )}
    </>
  );
};

export default PostsList;
