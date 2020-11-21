import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PostsList from '../components/Posts/PostsList';
import PostForm from '../components/Posts/PostForm';

const Posts = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:postId`} component={PostForm} />
      <Route path={match.path} component={PostsList} />
    </Switch>
  );
};

export default Posts;
