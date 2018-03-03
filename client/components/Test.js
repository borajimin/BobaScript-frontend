import React from 'react';
import Boba from '../Boba/Boba';
import Cup from '../Boba/Cup';
import axios from 'axios';
import Question from './Question';
import Error from './Error';
import RaisedButton from 'material-ui/RaisedButton';


const BASE_URL="https://e5cdf00d.ngrok.io";


const CUPS = [[{
  top: 30,
  bottom: 80,
  right: 200,
  left: 150,
  value: 10,
  color: "black"
  //bobas
}, {
  top: 200,
  bottom: 250,
  right: 350,
  left: 300,
  value: 10,
  color: "lightgreen"
  //greentea
}, {
  top: 200,
  bottom: 250,
  right: 500,
  left: 450,
  value: 10,
  color: "lightgrey"
  //milk
}, {
  top: 100,
  bottom: 150,
  right: 650,
  left: 600,
  value: 10,
  color: "yellow"
  //jelly
}]];

const BOBAS = [
  {x: 100, y: 100, radius: 20, color: "grey"},
  {}, {}];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.textareaHeight = 0;
    this.textareaWidth = 0;
    this.state = {
      cup: {},
      code: null,
      boba: null,
      transpiled: null,
      windowHeight: 0,
      windowWidth: 0,
      error: null
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clear = () => {
      ctx.clearRect(0, 0, 3000, 3000);
    }
    window.addEventListener("resize", () => this.updateDimensions());
    const cups = CUPS[this.props.match.params.number - 1].map(cup => new Cup(ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value, cup.color));
    this.setState({
      cup: cups,
      boba: new Boba(ctx, 50, 50, 20, "cyan", cups),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => {
      this.state.cup.map(c => c.draw());
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
    // let boba = this.state.boba;
    // console.log(boba);
    console.log("Runnging code: ", this.state.code);
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
    })
      .then(code => {
        console.log(code);
        if(!code.data.success) {
          this.setState({
            error: `Error at line: ${code.data.error.hash.line}; Expected: ${code.data.error.hash.expected}`
          });
        } else {
          console.log(code.data.javascript.replace(/\bboba\b/g, 'this.state.boba'));
          eval(code.data.javascript.replace(
            /\bboba\b/g, 'this.state.boba').replace(
            /\bcup\b/g, 'this.state.cup').replace(
            /\btapioca\b/g, 'this.state.cup[0]').replace(
            /\bgreenTea\b/g, 'this.state.cup[1]').replace(
            /\bmilk\b/g, 'this.state.cup[2]').replace(
            /\bjelly\b/g, 'this.state.cup[3]')
          );
          console.log("tapioca", this.state.cup[0]);
          console.log("x", this.state.boba.yCoordinate);
          this.state.boba.update();
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  onSubmit() {
    console.log("Submitted code: ", this.state.code);
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
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
            {(this.state.error) ? <Error message={this.state.error}/> : <div></div>}
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

        {/* <div>{this.state.transpiled}</div> */}
      </div>
    );
  }
}

export default Test;
