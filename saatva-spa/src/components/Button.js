import React, { Component } from 'react';
// import { withRouter, Link } from 'react-router-dom'

export class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, key } = this.props;
    console.log(item)
    return item;
  }
}

export default Button;