import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Search from './Search';
import CreatePost from './CreatePost';
import Profile from './Profile';
import PostDetail from './PostDetail';
import Register from './Register';
import Login from './Login';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { addUser } from './features/appSlice';


function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((curr_user => {
      db.collection("users").onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          if (curr_user?.email === doc.data().email) {
            setUser({ id: doc.id, data: doc.data() });
            dispatch(addUser({ displayName: doc.data().displayName, email: doc.data().email }));
            return;
          }
        })
      });
    }));
  }, []);

  return (
    <div className="app">
      <Router>
        {user ? (<Redirect to="/" />) : (<Redirect to="/login" />)}
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          <Route exact path="/following">
            <h1>Following</h1>
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/view/:id">
            <PostDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
