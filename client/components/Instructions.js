import React from 'react';
// import BobaScript from '../../public/bobaScriptlogo.png';
const instruction = {
  width: "80%",
  // height: "500px",
  alignItem: "left",
  margin: "auto",
  // border: "2px solid black",
  textAlign: "left"
}

const tab = { display: "inline-block", marginLeft: "40px"};


class Instructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <div style={{"marginTop": "80px", "flexDirection": "column", "display": "flex", "justifyContent": "center", "flex": "1"}}>
        <div style = {instruction}>
          {/* <img src={BobaScript} alt="logo"></img> */}
          <h1>BobaScript Documentations</h1>
          <p><b>BobaScript (BS)</b> is a lightweight interpreted or JIT-compiled programming language.
        While it is most well-known as the scripting language for Horizons tests, many
        non-browser environments might not use it. BobaScript is a prototype-based,
        multi-paradigm, dynamic language, supporting object-oriented programming.
        It does absolutely nothing other than move a boba around the canvas.<br/>

          <br/>

          BobaScript has two classes, <b>Boba</b> and <b>Cups</b>. Each class has <b>properties</b> and <b>methods</b>.</p><br/>
          <b>Properties</b> can be accessed through the keyword <b>of</b>.<br/>
          <b>Methods</b> can be accessed through the keyword <b>will</b>.
          <div>
            <div>
              <h1>Boba Class</h1>
              <div><h3>Properties:</h3>
                value: value of Boba, it can be color, number, ingredients, flavors, etc.<br/>
                xCoordinate: xCoordinate of Boba<br/>
                yCoordinate: yCoordinate of Boba<br/>
              </div><br/>
              <div><h3>Methods:</h3>
                move: Boba will move one unit.<br/>
                turnLeft: Boba will turn to the left, it will not move the Boba.<br/>
                turnRight: Boba will turn to the right, it will not move the Boba.<br/>
              </div>
            </div>
            <div>
              <h1>Cup Class</h1>
              <div><h3>Properties:</h3>
                value: the value of the cup, it can be color, number, ingredients, flavors, etc.
                left: left coordinate of the cup.<br/>
                right: right coordinate of the cup.<br/>
                top: top coordinate of the cup.<br/>
                bottom: bottom coordinate of the cup.<br/>
              </div>
            </div>
            <div>
              <h1>If statement </h1>
              <div><h3>Syntax: if condition do statement end</h3>
              Conditional statements are used to perform different actions based on different conditions.
              </div>
            </div>
            <div>
              <h1>While loop</h1>
              <div><h3>Syntax: while condition do statement end</h3>
              The while loop loops through a block of code as long as a specified condition is true.
              </div>
            </div>
            <div>
              <h1>Example BobaScript</h1>
              <pre>
                if xCoordinate of boba > yCoordinate of boba do <br/>
                <span style = {tab}/>boba will turnLeft<br/>
                <span style = {tab}/>end<br/>
                <br/>
                while xCoordinate of boba > yCoordinate of boba do <br/>
                <span style = {tab}/>boba will move<br/>
                <span style = {tab}/>end<br/>
                <br/>
                finish
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;
