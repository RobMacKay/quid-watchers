import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/header/header.component';
import SheetCreationPage from './pages/sheet-creation-page/sheet-creation-page.component';
import HomePage from './pages/home-page/home-page.component';
import Footer from './components/footer/footer.component';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <SheetCreationPage />
          </Route>
          <Route exact path="/:id">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;