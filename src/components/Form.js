import React, { Component, createRef } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.roomIdRef = createRef();
    this.nameRef = createRef();
    this.submitDetails = this.submitDetails.bind(this);
  }

  submitDetails(event) {
    event.preventDefault();
    this.props.parentCallback({
      name: this.nameRef,
      roomId: this.roomIdRef
    })
  }

  render() {
    return (
      <div className="overflow-hidden border-t border-l border-r border-gray-400 px-3 py-10 bg-gray-200 flex justify-center">
        <div className="w-full max-w-xs">
          <form
            onSubmit={this.submitDetails}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="roomId"
              >
                Room Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="roomId"
                required
                minLength={3}
                ref={this.roomIdRef}
                type="Number"
                placeholder="Room Id"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="displayName"
              >
                Display Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="displayName"
                required
                minLength={3}
                ref={this.nameRef}
                type="text"
                placeholder="Display Name"
              />
            </div>
            <div className="flex items-center justify-start">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
