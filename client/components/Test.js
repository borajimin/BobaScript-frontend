import React from 'react';
import Boba from '../Boba/Boba';
import Cup from '../Boba/Cup';
import axios from 'axios';
import Question from './Question'
import RaisedButton from 'material-ui/RaisedButton';


const BASE_URL="https://e5cdf00d.ngrok.io";
axios.defaults.withCredentials = true;

const cups = [{
  top: 100,
  bottom: 200,
  right: 200,
  left: 100,
  value: 10
}];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.textareaHeight = 0;
    this.textareaWidth = 0;
    this.state = {
      errorMessage: "",
      cup: {},
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
    const cup = cups[this.props.match.params.number - 1];
    this.setState({
      cup: new Cup(ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value),
      // cup: new Cup(ctx, 100,200,200,100,10),
      boba: new Boba(ctx, 250, 125, 20, "cyan"),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => {
      this.state.cup.draw();
      this.state.boba.update();
    });
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

  onRun() {
    console.log("Runnging code: ", this.state.code);
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
    })
      .then(code => {
        console.log("code in onRun", code);
        // console.log("code data", code.data.javascript.replace(/\bboba\b/g, 'this.state.boba'));
        if(code.data.success){
          eval(code.data.javascript.replace(/\bboba\b/g, 'this.state.boba').replace(/\bcup\b/g, 'this.state.cup'));
          this.state.boba.update();
          this.setState({errorMessage: ""});
        } else {
          this.setState({errorMessage: `Error on line ${code.data.error.hash.line}`});
        }
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
        <canvas
          ref="canvas"
          width={this.state.windowWidth * 0.9}
          height={this.state.windowHeight * 0.5}/>
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
            {this.state.errorMessage.length > 0 ?
              <div style={{"color": "red", "border": "2px solid red", "backgroundColor": "pink"}}>
              Error Message:{this.state.errorMessage}
              </div> : <div/>}
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
