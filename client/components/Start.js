import React from 'react';


class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log(this.props.history);
  }


  render() {
    return (
      <div>
      
      hi graham
        Start
      </div>
    );
  }
}

export default Start;
