import React from 'react';
import Boba from '../Boba/Boba';
import axios from 'axios';
import Question from './Question'

const BASE_URL="https://e5cdf00d.ngrok.io";
axios.defaults.withCredentials = true;

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.textareaHeight = 0;
    this.textareaWidth = 0;
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

  onRun() {
    console.log("Runnging code: ", this.state.code);
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
    })
      .then(code => {
        console.log(code);
        console.log(code.data.javascript.replace(/\bboba\b/g, 'this.state.boba'));
        eval(code.data.javascript.replace(/\bboba\b/g, 'this.state.boba'));
        this.state.boba.update();
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
      <div>
        <canvas
          ref="canvas"
          width={this.state.windowWidth * 0.9}
          height={this.state.windowHeight * 0.5}/>
        <Question question={this.props.match.params.number}/>
        <textarea
          onChange={(e) => this.onCodeChange(e)}
          rows={Math.floor(this.state.windowHeight * 0.02)}
          cols={Math.floor(this.state.windowWidth * 0.06)}/>

        <button onClick={() => this.onRun()}>Run Code</button>
        <button onClick={() => this.onSubmit()}>Submit Code</button>

        <div>{this.state.transpiled}</div>
      </div>
    );
  }
}

export default Test;
