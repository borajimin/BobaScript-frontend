import React from 'react';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = {
      1: "The nature series 'Life Story,' a collaboration between BBC and The Open University, shows how animals try to overcome the challenges they face throughout their lives to eventually continue their bloodlines by having offspring. The show, narrated by Sir David Attenborough, aims to give viewers an idea of what it is like for animals who face difficult choices in nature. Episodes document the journey of animals surviving the hazards of being young through learning how to survive as an adult, climbing the social ladder, getting a mate and becoming a parent.",
      2: "Hello, world",
      3: "This is the last question, the ultimate challenge, the final boss. Your task is simple... You see those two squares? They both have an unknown value associated with them. Upon touching the green square, it's value will increase by 2, while the red sqaure's value will increase by 3. Devise an algorithm in BobaScript to modify the values of both respective squares so that they equal each other. "
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
