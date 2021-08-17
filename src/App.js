import React, {useState, useEffect} from 'react'
import './App.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ResetPassword from './Pages/ResetPassword';
import Home from './Pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [validUser, setValidUser] = useState(false)

  
  // useEffect( () => {
  //   let user = localStorage.getItem("user")
  //   if(typeof(user) == 'string')
  //     setValidUser(true)
  // },[])

  const setUserValid = () => {
    alert("ping")
    // setValidUser(true)
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <SignIn setUserValid={setUserValid}/>
        </Route>
        <Route path="/register">
          <SignUp/>
        </Route>
        <Route path="/ResetPassword">
          <ResetPassword/>
        </Route>
        <Route exact path="/home">
          {/* {validUser ? <Home/> : <SignIn/>} */}
          <Home/>
        </Route>
        <Route path="/">
          {/* {validUser ? <Home/> : <SignIn/>} */}
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
