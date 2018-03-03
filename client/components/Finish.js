import React from 'react';
import BobaScript from '../../public/bobaScriptlogo.png'


class Finish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="App">
        <img  className="startPageLogo" src={BobaScript} />
        Finish
      </div>
    );
  }
}

export default Finish;
