import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';

import { makeServer } from './server';

import './App.css';

import Home from './views/Home';
// import NotComing from './views/NotComing';
import NotFound from './views/NotFound';

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

function App() {
  return (
    <SimpleReactLightbox>
      <Router>
        {/* <Home /> */}
        <Switch>
          <Route path="/:recordId">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </SimpleReactLightbox>
  );
}

export default App;
