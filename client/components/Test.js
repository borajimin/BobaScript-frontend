import React from 'react';
import Boba from '../Boba/Boba';
import Cup from '../Boba/Cup';
import axios from 'axios';
import Question from './Question';
import Error from './Error';
import RaisedButton from 'material-ui/RaisedButton';
import { CUPS, BOBAS } from '../Boba/QuizInfo';

const BASE_URL="http://localhost:3001";

class Test extends React.Component {
  constructor(props) {
    super(props);
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
    const cups = CUPS[this.props.match.params.number - 1].map(cup =>
      new Cup(this.ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value, cup.color));
    let { x, y, color } = BOBAS[this.props.match.params.number - 1];
    this.setState({
      cup: cups,
      boba: new Boba(this.ctx, x, y, 20, color, cups, this.makeGame()),
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    }, () => {
      this.state.cup.map(c => c.draw());
      this.state.boba.update();
    });
  }

  componentWillReceiveProps(nextProps) {
    location.reload();
  }

  onReset() {
    this.ctx.clear = () => {
      this.ctx.clearRect(0, 0, 3000, 3000);
    }
    const cups = CUPS[this.props.match.params.number - 1].map(cup =>
      new Cup(this.ctx, cup.top, cup.bottom, cup.left, cup.right, cup.value, cup.color));
    const boba = BOBAS[this.props.match.params.number - 1];
    this.setState({
      cup: cups,
      boba: new Boba(this.ctx, boba.x, boba.y, 20, boba.color, cups, this.props.match.params.number === 3 ? this.makeGame() : null),
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

  makeGame() {
    let cupsVisited = Array(CUPS[2]).fill(false);

    return (boba) => {
      this.state.cup.map((cup, index) => {
        if( (boba.xCoordinate < cup.right
          && boba.xCoordinate > cup.left)
          || (boba.yCoordinate > cup.bottom
          && boba.yCoordinate < cup.top)){
          cup.value += cupsVisited[index] ? 0 : (index + 2) ;
          if(!cupsVisited[index]) cupsVisited[index] = true;
        } else {
          cupsVisited[index] = false;
        }
      })
      return (this.state.cup[0].value - this.state.cup[1].value);
    }
  }

  onCodeChange(e) {
    e.preventDefault();
    this.setState({
      code: e.target.value,
    });
  }

  onRun() {
    axios.post(BASE_URL + "/api/parseBobaScript", {
      bobaScript: this.state.code
    })
      .then(code => {
        console.log(code.data);
        if(!code.data.success) {
          this.setState({
            error: `Error at line: ${code.data.error.hash.line};
            Expected: ${code.data.error.hash.expected}`,
          });
          console.log("here");
        } else {
          try{
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
              .replace(/\bgreen\b/g, 'this.state.cup[0]')
              .replace(/\btapioca\b/g, 'this.state.cup[0]')
              .replace(/\boolong\b/g, 'this.state.cup[1]')
              .replace(/\bmilk\b/g, 'this.state.cup[2]')
              .replace(/\bjelly\b/g, 'this.state.cup[3]'))
              this.state.boba.update();
              this.setState({
                error: null
              })
          } catch (e) {
            this.state.boba.update();
            console.log(e.message);
            this.setState({
              error: e.message
            })
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  onNext() {
    let num = parseInt(this.props.match.params.number, 10) + 1;
    let whereTo = (num > 3) ? "/finish" : `/test/${num}`;
    this.props.history.push(whereTo);
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
            <RaisedButton
              style={{"margin": "10px"}}
              onClick={() => this.onReset()}
              label="Reset"
              secondary={true} />
            <RaisedButton
              style={{"margin": "10px"}}
              onClick={() => this.onRun()}
              label="Run Code"
              primary={true} />
            <RaisedButton
              style={{"margin": "10px"}}
              onClick={() => this.onNext()}
              label="Next"
              secondary={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default Test;
