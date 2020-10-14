import React from 'react';
import Login from './components/authentication/Login';
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/authentication/Authentications';
import Register from './components/authentication/Register';
import Dashboard from './components/Dashboard/Dashboard';
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import AddMarket from './components/Dashboard/AddMarket';


const store = configureStore();
const token = localStorage.getItem("token")
if (token) {
  const decoded = jwt_decode(token);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    localStorage.clear();
    //Clear current profile
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} render={() => (
              <Redirect to="/login" />
            )} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <ProtectedRoute path='/dashboard' component={Dashboard} />
            <ProtectedRoute path='/addMarket' component={AddMarket} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
