import React, { Component, createRef } from "react";
import Card from "./Card";
import io from "socket.io-client";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      selectedRoom: null,
      estimates: null
    };
    this.socket = io.connect("http://localhost:3001");
    this.cardRefs = createRef();
    this.cardRefs.current = [];

    // This binding is necessary to make `this` work in the callback
    this.handleCallback = this.handleCallback.bind(this);
    this.addToRefs = this.addToRefs.bind(this);
  }

  handleCallback = (childData) => {
    this.props.parentCallback(childData);
    this.setState({ selectedCard: childData });
    const message = {
      storyPoint: childData,
      user: this.props.name,
      roomId: this.props.roomId,
    }
    this.socket.emit("send_message", message);
    this.updateData(message)
  };

  updateData = (message) => {
    fetch('http://localhost:3001/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
      mode: 'cors',
      cache: 'no-cache'
    })
  }

  componentDidMount() {
    this.socket.emit("join_room", this.props.roomId);
    this.socket.on("receive_message", (data) => {
      console.log("RECEIVED", data);
      this.props.messageCallback(data);
    });
  }

  componentDidUpdate() {
    this.cardRefs.current.forEach((elem) => {
      if (elem.props.value !== this.state.selectedCard) {
        elem.resetSelection();
      }
    });
  }

  addToRefs(el) {
    if (el && !this.cardRefs.current.includes(el)) {
      this.cardRefs.current.push(el);
    }
  }

  render() {
    const cardList = this.props.items.map((item, index) => (
      <Card
        itemId={index}
        key={index}
        value={item}
        parentCallback={this.handleCallback}
        ref={this.addToRefs}
      />
    ));
    return cardList;
  }
}
