import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Home from "./pages/home/Home";
import Notification from "./services/NotificationService";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import GotoPage from "./pages/gotoPage/GotoPage";
import MoviePage from "./pages/movies-page/MoviesPage";
import Profile from "./pages/profile/Profile";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import AuthProvider from './context/auth/authState';
import MovieProvider from './context/movies/movieState'
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  
  return (
    <Router>
      <Notification />
      <AuthProvider>
        <MovieProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <GuestRoute path="/signin" component={SignIn} />
            <GuestRoute path="/signup" component={ SignUp } />
            <GuestRoute path="/forgot-password" component={ForgetPassword} />
            <ProtectedRoute path="/profile" component={ Profile } />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/mostpopular" component={ GotoPage } />
            <Route path="/latestmovies" component={ GotoPage } />
            <Route path="/toprated" component={ GotoPage } />
            <Redirect to="/"></Redirect>
          </Switch>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
