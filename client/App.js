
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>BoboScript</h1>
        </header>
        <div className="App-body">
          <button className="btn btn-default">
            Join the Party Place
          </button>
        </div>
        <footer className="App-footer">
          <h3>Copyrights to Fran & Friends</h3>
        </footer>
      </div>
    );
  }
}

export default App;
