
import React from 'react';
import { Route } from 'react-router-dom';
import Finish from './components/Finish';
import Start from './components/Start';
import Test from './components/Test';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props.history);
  }


  render() {
    return (
      <div className="App">
        <AppBar
          iconElementLeft={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem primaryText="Start"  onClick={() => this.props.history.push('/')} />
              <MenuItem primaryText="Test 1" onClick={() => this.props.history.push('/test1')} />
              <MenuItem primaryText="Finish" onClick={() => this.props.history.push('/finish')} />
            </IconMenu>}
          title="BobaScript"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          className="App-header"
        />
        <div className="App-body">
          <Route exact path="/" component={Start}/>
          <Route path="/test/:number" component={Test}/>
          <Route path="/finish" component={Finish}/>
        </div>
        <footer className="App-footer">
          <h4>Copyrights to Fran & Friends</h4>
        </footer>
      </div>
    );
  }
}

export default App;
