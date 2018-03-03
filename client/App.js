import React from 'react';
import { Route } from 'react-router-dom';
import Finish from './components/Finish';
import Start from './components/Start';
import Instructions from './components/Instructions';
import Test from './components/Test';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';



class App extends React.Component {
  constructor(props) {
    super(props);
  }



  componentDidMount() {
  }


  render() {
    return (
      <div className="App">
        <AppBar
          iconElementLeft={
            <IconMenu
              iconStyle={{'color': 'white'}}
              iconButtonElement={<IconButton ><MoreVertIcon  /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem primaryText="Start"  onClick={() => this.props.history.push('/')} />
              <MenuItem primaryText="Test 1" onClick={() => this.props.history.push('/test/1')} />
              <MenuItem primaryText="Test 2" onClick={() => this.props.history.push('/test/2')} />
              <MenuItem primaryText="Test 3" onClick={() => this.props.history.push('/test/3')} />
              <MenuItem primaryText="Finish" onClick={() => this.props.history.push('/finish')} />
              <MenuItem primaryText="Instructions" onClick={() => this.props.history.push('/instructions')}/>
            </IconMenu>}
          title="BobaScript"
          className="App-header"
        />
        <div className="App-body">
          <Route exact path="/" component={Start}/>
          <Route path="/test/:number" component={Test}/>
          <Route path="/finish" component={Finish}/>
          <Route path="/instructions" component={Instructions}/>
        </div>
        <footer className="App-footer">
          <div>
            <FlatButton label="ABOUT US" style={{"color": 'white'}} />
            <FlatButton label="SUPPORT" style={{"color": 'white'}} />
            <FlatButton label="JOBS" style={{"color": 'white'}} />
          </div>
        </footer>
        </div>
        );
      }
    }

    export default App;
