import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: "The nature series 'Life Story,' a collaboration between BBC and The Open University, shows how animals try to overcome the challenges they face throughout their lives to eventually continue their bloodlines by having offspring. The show, narrated by Sir David Attenborough, aims to give viewers an idea of what it is like for animals who face difficult choices in nature. Episodes document the journey of animals surviving the hazards of being young through learning how to survive as an adult, climbing the social ladder, getting a mate and becoming a parent.",
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
