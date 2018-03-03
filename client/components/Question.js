import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: "You are making boba and you need all the ingredients. Write an algorithm that will allow you to get tapioca(black square), greenTea(green square), milk(grey square), jelly(yellow square) with shortest time.",
      2: "Hello, world",
      3: "This is the last question"
    }
  }

  render() {
    return (
      <div className="questionContainer">
        <h2>Question #{this.props.question}</h2>
        <div className="question" style={{"overflowY": "scroll", "maxHeight": "180px", "maxWidth": "400px"}}>{this.question[this.props.question]}</div>
      </div>
    );
  }
}

export default Question;
