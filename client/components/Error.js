import React from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{"color": "red", "margin": "20px", "border": "1px solid red"}}>
        {this.props.message}
      </div>
    );
  }
}

export default Error;
