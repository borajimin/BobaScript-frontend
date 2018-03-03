import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: "What is your name",
      2: "Hello, world",
      3: "This is the last question"
    }
  }

  render() {
    return (
      <div className="questionContainer">
        <h2>Question #{this.props.question}</h2>
        <div className="question">{this.question[this.props.question]}</div>
      </div>
    );
  }
}

export default Question;
