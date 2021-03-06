import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './views/Home';
import NotComing from './views/NotComing';
import NotFound from './views/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/success">Success!</Route>
        <Route path="/not-coming">
          <NotComing></NotComing>
        </Route>
        <Route path="/:recordId">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
