import React from 'react';
import {Route,  Router} from 'react-router-dom';
import './App.scss';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import history from './config/history';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route exact={true} path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    );
  }
}

export default App;


