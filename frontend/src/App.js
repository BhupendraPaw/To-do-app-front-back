import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import update from "./update";
import deletetask from "./components/deletetask";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/update/:id" component={update} />
        <Route path="/delete/:id" component={deletetask} />
      </Switch>
    </Router>
  );
}

export default App;
