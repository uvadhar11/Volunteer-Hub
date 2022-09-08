import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
