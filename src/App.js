import React, { Component, createRef } from "react";
import Cards from "./components/Card/Cards";
import Form from "./components/Form";
import Header from "./components/Header";
import Participant from "./components/Participant";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: null,
      estimates: [],
      name: null,
      roomId: null,
      isLoggedIn: false,
    };
    this.cardsRef = createRef();
    this.items = ["?", "0", "0.5", "1", "3", "5", "8", "13", "20", "40", "100"];
  }

  handleCallback = (childData) => {
    this.setState({ selectedCard: childData });
  };

  handleMessage = (data) => {
    console.log("MESSAGES", data);
    const filtered = this.state.estimates.filter(
      (item) => item.user !== data.user
    );
    this.setState({
      estimates: [data, ...filtered],
    });
  };

  renderPoker = () => {
    if (this.state.isLoggedIn) {
      return (
        <>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center max-w-screen-md">
              <Cards
                name={this.state.name}
                roomId={this.state.roomId}
                ref={this.cardsRef}
                items={this.items}
                parentCallback={this.handleCallback}
                messageCallback={this.handleMessage}
              ></Cards>
            </div>
          </div>
          <div className="my-10">
            <Participant participants={this.state.estimates} />
          </div>
        </>
      );
    }
    return null;
  };

  postData = (message) => {
    return fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      mode: "cors",
      cache: "no-cache",
    });
  };

  getData = (roomId) => {
    fetch(`http://localhost:3001/users/${roomId}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          estimates: response.messages,
        });
      });
  };

  setDetails = (details) => {
    const name = details.name.current.value;
    const roomId = details.roomId.current.value;

    this.setState({
      name,
      roomId,
      isLoggedIn: true,
    });
    if (name && roomId) {
      this.postData({
        roomId,
        user: name,
        storyPoint: "-",
      }).then(() => {
        this.getData(roomId);
      });
    }
  };

  render() {
    return (
      <div>
        <Header user={this.state.name} roomId={this.state.roomId}></Header>
        {!this.state.isLoggedIn ? (
          <Form parentCallback={this.setDetails} />
        ) : (
          this.renderPoker()
        )}
      </div>
    );
  }
}
