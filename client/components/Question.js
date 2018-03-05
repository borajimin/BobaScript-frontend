import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: `You are making boba and you need all the ingredients.
       Write an algorithm that will allow you to get tapioca(black square),
       greenTea(green square), milk(grey square), jelly(yellow square) with shortest time.`,
      2: `Our dear friend Boba wants to visit each tea shops once on the way to Fran's house.
       Each boxes represents a tea shop
       and each color of the boxes represent the types of tea.
       Jasmine tea shops are light green, chai tea shops are chai,
       earlgrey tea shops are brown, Fran's house is black.
       From the left side of the canvas to right, each shops are named with
       with the type and the instance of it. For example, the chai shop in
       upper left corner is named 'chai1'.`,
      3: `This is the last question, the ultimate challenge, the final boss.
       Your task is simple... You see those two squares?
       They both have an unknown value associated with them.
       Upon touching the green square, it's value will increase by 2,
       while the red sqaure's value will increase by 3.
       Devise an algorithm in BobaScript to modify the values
       of both respective squares so that they equal each other.`
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
