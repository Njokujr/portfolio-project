import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/aboutus/Aboutus";
import Profile from "./pages/profile/Profile";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">{<About />}</Route>
        <Route path="/register"> {user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings"> {user ? <Settings /> : <Register />} </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
