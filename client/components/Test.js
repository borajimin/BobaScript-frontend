import React from 'react';
import Boba from '../Boba/Boba';
import axios from 'axios';
import Question from './Question'
import RaisedButton from 'material-ui/RaisedButton';


const BASE_URL="http://localhost:3000";


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
      boba: null,
      transpiled: null,
      windowHeight: 0,
      windowWidth: 0,
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    window.addEventListener("resize", () => this.updateDimensions());
    this.setState({
      boba: new Boba(ctx, 250, 125, 20, "cyan"),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => this.state.boba.update());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateDimensions());
  }

  updateDimensions() {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => this.state.boba.update());
  }

  onCodeChange(e) {
    e.preventDefault();
    this.setState({
      code: e.target.value,
    });
  }

  toRight() {
    this.state.boba.moveRight();
    this.state.boba.update();
  }

  toLeft() {
    this.state.boba.moveLeft();
    this.state.boba.update();
  }

  toUp() {
    this.state.boba.moveUp();
    this.state.boba.update();
  }

  toDown() {
    this.state.boba.moveDown();
    this.state.boba.update();
  }

  onRun() {
    console.log("Runnging code: ", this.state.code);
    axios.post(BASE_URL + "/submit", {
      code: this.state.code
    })
      .then(code => {
        this.setState({
          transpiled: code,
        })
        eval(code);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onSubmit() {
    console.log("Submitted code: ", this.state.code);
    axios.post(BASE_URL + "/submit", {
      code: this.state.code
    })
      .then(code => {
        console.log(code);
        this.setState({
          transpiled: code,
        })
        window.localStorage.setItem("test", this.props.match.params.number + 1);
        eval(code);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div style={{"marginTop": "80px"}}>
        <canvas ref="canvas" width={this.state.windowWidth * 0.9} height={this.state.windowHeight * 0.5}/>
        <div style={{"flexDirection": "row", "display": "flex", "justifyContent": "center"}}>
          <div style={{}}>
            <Question question={this.props.match.params.number}/>
          </div>
          <div style={{"marginLeft": "100px", "marginTop": "20px"}}>
            <textarea
              style={{"padding": "10px"}}
              onChange={(e) => this.onCodeChange(e)}
              rows={Math.floor(this.state.windowHeight * 0.02)}
              cols={Math.floor(this.state.windowWidth * 0.06)}/>
          </div>
          <div style={{"flexDirection": "column", "display": "flex", "justifyContent": "flex-end"}}>
            <RaisedButton style={{"margin": "10px"}} onClick={() => this.onRun()} label="Run Code" primary={true} />
            <RaisedButton style={{"margin": "10px"}} onClick={() => this.onSubmit()} label="Submit Code" secondary={true} />
          </div>
        </div>

        <div>{this.state.transpiled}</div>
      </div>
    );
  }
}

export default Test;
