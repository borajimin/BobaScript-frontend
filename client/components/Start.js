import React from 'react';
import BobaScript from '../../public/bobaScriptlogo.png'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }

  componentDidMount() {
  }

  onChange(e) {
    e.preventDefault()
    this.setState({name: e.target.value})
  }

  saveName() {
    window.localStorage.setItem('name', this.state.name)
    console.log(window.localStorage.getItem('name'));
    this.props.history.push('/test/1')
  }

  render() {
    return (
      <div className="App">
        <div>
          <img  className="startPageLogo" src={BobaScript} />
        </div>
        <TextField
          floatingLabelText="Username"
          onChange={(e) => this.onChange(e)}
        /><br />
        <RaisedButton
          onClick={() => this.saveName()}
          label="Start Quiz"
          primary={true}
          style={{"marginTop": '10px'}} />
      </div>
    );
  }
}

export default Start;
