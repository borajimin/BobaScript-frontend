import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{"color": "red", "margin": "20px"}}>
        {this.props.message}
      </div>
    );
  }
}

export default Error;
