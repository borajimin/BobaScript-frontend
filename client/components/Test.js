import React from 'react';
import Boba from '../Boba/Boba';
import axios from 'axios';


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      direction: null,
      boba: null,
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    this.setState({
      boba: new Boba(ctx, 250, 125, 20, "cyan")
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
  }

  onSubmit() {
    console.log("Submitted code: ", this.state.code);
  }

  render() {
    return (
      <div>
        {this.props.match.params.number}
        Test
        <canvas ref="canvas" width="500" height="250"/>
        <textarea onChange={(e) => this.onCodeChange(e)} rows="10" cols="20" />
        <button onClick={() => this.onRun()}>Run Code</button>
        <button onClick={() => this.onSubmit()}>Submit Code</button>
        <button onClick={() => this.toRight()}>Right</button>
        <button onClick={() => this.toLeft()}>Left</button>
        <button onClick={() => this.toUp()}>Up</button>
        <button onClick={() => this.toDown()}>Down</button>
        <script>{this.state.code}</script>
      </div>
    );
  }
}

export default Test;
