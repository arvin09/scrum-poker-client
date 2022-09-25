import React, { Component } from "react";
import "./Card.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
  }

  handleClick() {
    this.setState({
      isActive: !this.state.isActive,
    });
    this.props.parentCallback(!this.state.isActive ? this.props.value : null);
  }

  resetSelection() {
    this.setState({
      isActive: false
    })
  }

  render() {
    return (
      <div
        className='card'
        id={`card-${this.props.itemId}`}
        // TODO: Check if this can be manged by dynamic classes with the hover turn off
        style={{
          backgroundColor: this.state.isActive ? "#282c34" : "",
          color: this.state.isActive ? "white" : "",
          borderColor: this.state.isActive ? "black" : "",
        }}
        onClick={this.handleClick}
      >
        <span className="text">{this.props.value}</span>
      </div>
    );
  }
}
