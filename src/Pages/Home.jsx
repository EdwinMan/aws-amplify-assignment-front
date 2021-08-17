import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

  import EditPost from '../Components/HomeComponents/EditPost';
  import CreatePost from '../Components/HomeComponents/CreatePost';
  import ViewPosts from '../Components/HomeComponents/ViewPosts';
  import NavBar from '../Components/HomeComponents/NavBar'
  import SignIn from './SignIn';
  import SignUp from './SignUp';

export default function Home() {
  return (
    <Router>
        <Switch>
            <Route path="/login">
              <SignIn/>
            </Route>
            <Route path="/register">
              <SignUp/>
            </Route>
            <Route path="/home/edit">
              <NavBar />
              <EditPost/>
            </Route>
            <Route path="/home/create">
              <NavBar />
              <CreatePost/>
            </Route>
            <Route path="/">
              <NavBar />
              <ViewPosts/>
            </Route>
            <Route path="/home">
              <NavBar />
              <ViewPosts/>
            </Route>
        </Switch>
    </Router>
  );
}
