import React , {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './components/layout/header'
import Home from './components/pages/home/home';
import Login from './components/auth/Login/login';
import Register from './components/auth/Register/register';
import Profile from './components/pages/profile/profile';
import QuestionsIntro from './components/pages/questions/questionsIntro/questionsIntro';
import Questions from './components/pages/questions/questions/questions'
import {UserContext} from './context/userContext';
import store from './redux/store'
import { Provider } from 'react-redux';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token", "");
        token = ""
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/users",
          { headers: { "x-auth-token": token } },
        )
        setUserData({
          token,
          user: userRes.data
        })
      }
      console.log(tokenRes.data)
    }; 

    isLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value = {{userData, setUserData}}>
        <Header />
        <Provider store = {store} >
          <Switch>
            <Route path = "/"  exact component = {Home} />
            <Route path = "/login" exact component = {Login} />
            <Route path = "/register" exact component = {Register} />
            <Route path = "/profile" exact component = {Profile} />
            <Route path = "/questions/introduction"  exact component = {QuestionsIntro} />
            <Route path = "/questions/main" component = {Questions} />
          </Switch>
        </Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
