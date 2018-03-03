import React from 'react';
import Boba from '../Boba/Boba';
import Cup from '../Boba/Cup';
import axios from 'axios';
import Question from './Question';
import Error from './Error';
import RaisedButton from 'material-ui/RaisedButton';

const BASE_URL="https://e5cdf00d.ngrok.io";
const BOBAS = [{
  x: 250,
  y: 125,
  color: "lightpink"
}, {
  x: 22,
  y: 275,
  color: "lightpink"
}, {
  x: 250,
  y: 125,
  color: "lightpink"
}]
const CUPS = [[{
  top: 100,
  bottom: 200,
  right: 600,
  left: 500,
  value: 20
}], [{
  top: 400,
  bottom: 450,
  right: 100,
  left: 50,
  color: "#d0f0c0"
},  {
  top: 200,
  bottom: 250,
  right: 250,
  left: 200,
  color: "#d0f0c0"
}, {
  top: 30,
  bottom: 80,
  right: 100,
  left:50,
  color: "#d0ad90"
}, {
  top: 200,
  bottom: 250,
  right: 600,
  left: 550,
  color: "#d0ad90"
}, {
  top: 375,
  bottom: 425,
  right: 950,
  left: 900,
  color: "#d0ad90"
}, {
  top: 100,
  bottom: 150,
  right: 1150,
  left: 1100,
  color: "#d0ad90"
}, {
  top: 20,
  bottom: 70,
  right: 650,
  left: 600,
  color: "#5a2121"
}, {
  top: 400,
  bottom: 450,
  right: 1250,
  left: 1200,
  color: "black"
}], [{
  top: 200,
  bottom: 350,
  right: 600,
  left: 450,
  value: 5
}]];

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.canvasHeight = 0;
    this.canvasWidth = 0;
    this.textareaHeight = 0;
    this.textareaWidth = 0;
    this.canvas = null;
    this.ctx = null;
    this.state = {
      cup: null,
      code: null,
      boba: null,
      transpiled: null,
      windowHeight: 0,
      windowWidth: 0,
      error: null,
      codeRan: false
    };
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clear = () => {
      this.ctx.clearRect(0, 0, 3000, 3000);
    }
    window.addEventListener("resize", () => this.updateDimensions());
    const cups = CUPS[this.props.match.params.number - 1].map(cup => new Cup(this.ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value, cup.color));
    const boba = BOBAS[this.props.match.params.number - 1];
    this.setState({
      cup: cups,
      boba: new Boba(this.ctx, boba.x, boba.y, 20, boba.color, cups),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => {
      this.state.cup.map(c => c.draw());
      this.state.boba.update();
    });
  }

  onReset() {
    this.ctx.clear = () => {
      this.ctx.clearRect(0, 0, 3000, 3000);
    }
    const cups = CUPS[this.props.match.params.number - 1].map(cup => new Cup(this.ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value, cup.color));
    const boba = BOBAS[this.props.match.params.number - 1];
    this.setState({
      cup: cups,
      boba: new Boba(this.ctx, boba.x, boba.y, 20, boba.color, cups),
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
    console.log("Runnging code: ", this.state.code);
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
    })
      .then(code => {
        console.log(code);
        if(!code.data.success) {
          this.setState({
            error: `Error at line: ${code.data.error.hash.line};
            Expected: ${code.data.error.hash.expected}`,
          });
        } else {
          console.log(code.data.javascript.replace(/\bboba\b/g, 'this.state.boba'));
          eval(code.data.javascript
            .replace(/\bboba\b/g, 'this.state.boba')
            .replace(/\bjasmine1\b/g, 'this.state.cup[0]')
            .replace(/\bjasmine2\b/g, 'this.state.cup[1]')
            .replace(/\bchai1\b/g, 'this.state.cup[2]')
            .replace(/\bchai2\b/g, 'this.state.cup[3]')
            .replace(/\bchai3\b/g, 'this.state.cup[4]')
            .replace(/\bchai4\b/g, 'this.state.cup[5]')
            .replace(/\bearlgrey1\b/g, 'this.state.cup[6]')
            .replace(/\bfran\b/g, 'this.state.cup[7]')
            .replace(/\bred\b/g, 'this.state.cup[1]')
            .replace(/\bgreen\b/g, 'this.state.cup[0]'))
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
          <div>
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
            <RaisedButton style={{"margin": "10px"}} onClick={() => this.onReset()} label="Reset" secondary={true} />
            <RaisedButton style={{"margin": "10px"}} onClick={() => this.onRun()} label="Run Code" primary={true} />
            <RaisedButton style={{"margin": "10px"}} onClick={() => this.onSubmit()} label="Submit Code" secondary={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
