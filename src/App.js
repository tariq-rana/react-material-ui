import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css";
import "fontsource-roboto";

import Layout from './comp/Layout';
import Notes from './pages/Notes';
import Create from './pages/Create';

function App() {
  return (

    <Router>
      <Layout>
        <Switch>
            <Route exact path="/">
              <Notes/>
            </Route>
            <Route path="/create">
              <Create/>
            </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
