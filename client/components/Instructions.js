import React from 'react';


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
      <div style={{"flexDirection": "column", "display": "flex", "justifyContent": "center", "flex": "1"}}>
        <div style = {instruction}>
          <h1>BobaScript Documentations</h1>
          <p>BobaScript (BS) is a lightweight interpreted or JIT-compiled programming language.
        While it is most well-known as the scripting language for Horizons tests, many
        non-browser environments might not use it. BobaScript is a prototype-based,
        multi-paradigm, dynamic language, supporting object-oriented programming.
        It does absolutely nothing other than move a boba around the canvas.<br/>

          <br/>

          BobaScript has two classes, <b>Boba</b> and <b>Cups</b>. Each class has <b>properties</b> and <b>methods</b>.</p>

          <b>Properties</b> can be accessed through the keyword <b>of</b>.<br/>
          <b>Methods</b> can be accessed through the keyword <b>will</b>.
          <div>
            <div>
              <h1>Boba Class</h1>
              <div><h3>Properties:</h3>
                value: value of Boba<br/>
                xCoordinate: xCoordinate of Boba<br/>
                yCoordinate: yCoordinate of Boba<br/>
              </div><br/>
              <div><h3>Methods:</h3>
                move: Boba will move one unit.<br/>
                turnLeft: Boba will turn to the left.<br/>
                turnRight: Boba will turn to the right.<br/>
              </div>
            </div>
            <div>
              <h1>Cup Class</h1>
              <div><h3>Properties:</h3>
                left: left coordinate of the cup.<br/>
                right: right coordinate of the cup.<br/>
                top: top coordinate of the cup.<br/>
                bottom: bottom coordinate of the cup.<br/>
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
