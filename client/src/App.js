import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//auth actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

//Route Protection Script
import ProtectedRoute from "./components/comp/ProtectedRoute";
//Protected Routes
import CreateProfile from "./components/create-profile/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-profile-information/AddExperience";
import AddEducation from "./components/add-profile-information/AddEducation";

//deverloper profile(s) viewing
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

//token
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";

//redux
import { Provider } from "react-redux";

//store
import store from "./store";

//Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

//authentication
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//posts
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

//no page found
import NotFound from "./components/not-found/NotFound";

//token verification
if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //else decode user data from token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //token expiration check
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    store.dispatch(logoutUser());
    //then clear
    store.dispatch(clearCurrentProfile());
    //and redirect
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
              </Switch>

              <Switch>
                <ProtectedRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>

              <Switch>
                <ProtectedRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>

              <Switch>
                <ProtectedRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>

              <Switch>
                <ProtectedRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>

              <Switch>
                <ProtectedRoute exact path="/posts" component={Posts} />
              </Switch>

              <Switch>
                <ProtectedRoute exact path="/post/:id" component={Post} />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
