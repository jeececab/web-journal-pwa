import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import { me } from './api/user';

import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Posts from './pages/Posts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stats from './pages/Stats';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const result = await me();

      if (result.user) {
        setUser(result.user);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && (
        <div className="container mx-auto max-w-6xl">
          <Router>
            <Header />
            <div className="pt-12">
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <PrivateRoute path="/posts">
                <Posts />
              </PrivateRoute>
              <PrivateRoute path="/stats">
                <Stats />
              </PrivateRoute>
            </div>
          </Router>
        </div>
      )}

      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};

export default App;
