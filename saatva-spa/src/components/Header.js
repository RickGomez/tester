import React, { Component } from 'react';
// import { withRouter, Link } from 'react-router-dom'

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nav">
        <div className="brand-logo">saatva</div>
        <div>
        <i class="fas fa-shopping-cart"></i>

        </div>
      </div>
    )
  }
}

export default Header;