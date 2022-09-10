import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Features from "./components/features";
import Home from "./components/home";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Features} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/log-in" component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
