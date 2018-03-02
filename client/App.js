
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Finish from './components/Finish';
import Start from './components/Start';
import Test from './components/Test';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>BobaScript</h1>
        </header>
        <Router>
          <div className="App-body">
            <Route exact path="/" component={Start}/>
            <Route path="/test/:number" component={Test}/>
            <Route path="/finish" component={Finish}/>
          </div>
        </Router>
        <footer className="App-footer">
          <h3>Copyrights to Fran & Friends</h3>
        </footer>
      </div>
    );
  }
}

export default App;
