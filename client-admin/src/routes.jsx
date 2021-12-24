import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import Home from './screens/Home';
import AuthHome from './screens/AuthHome';
import Login from './screens/Login';
import Register from './screens/Register';
import AdminHome from './screens/pages/home/Home';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";



const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
          
        <Navbar />      
        <Route exact path='/' component={Home} />
        <Route exact path='/auth' component={AuthHome} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
          
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;