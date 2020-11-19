import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import { me } from './api/user';

import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Entries from './pages/Entries';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
    <AuthContext.Provider value={{ user }}>
      {!loading && (
        <div className="container mx-auto h-screen">
          <Router>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <PrivateRoute path="/entries">
              <Entries />
            </PrivateRoute>
          </Router>
        </div>
      )}

      {loading && <p>loading...</p>}
    </AuthContext.Provider>
  );
};

export default App;
