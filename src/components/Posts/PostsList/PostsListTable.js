import React, { useContext } from 'react';
import PostsContext from '../../../contexts/PostsContext';
import PostsListTaleItem from './PostsListTableItem';

const PostsListTable = () => {
  const { posts } = useContext(PostsContext);

  return (
    <ul>
      {posts.map(post => (
        <PostsListTaleItem key={post.date_title} post={post}>
          {post.date_title}
        </PostsListTaleItem>
      ))}
    </ul>
  );
};

export default PostsListTable;
