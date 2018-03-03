import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: "You are making boba and you need all the ingredients. Write an algorithm that will allow you to get tapioca(black square), greenTea(green square), milk(grey square), jelly(yellow square) with shortest time.",
      2: `Our dear friend Boba wants to visit each tea shops once on the way to Fran's house.
       Each boxes represents a tea shop
       and each color of the boxes represent the types of tea.
       Jasmine tea shops are light green, chai tea shops are chai,
       earlgrey tea shops are brown, Fran's house is black.
       Jasmine tea shop: light green;
       Chai tea shop: chai;
       Earlgrey tea shop: brown;
       Fran's house: black;`,
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
