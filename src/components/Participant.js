import React, { Component } from "react";

export default class Participant extends Component {
  render() {
    return (
      <div className="flex justify-center items-center">
        <div className="sm:w-3/4 md:w-3/4 lg:w-1/2">
          <table className=" text-center min-w-full">
            <thead className="border-b bg-teal-500">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-white px-6 py-4"
                >
                  Story Point
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.participants.map((item, index) => (
                <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index+1}
                  </td>
                  <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                    {item.user}
                  </td>
                  <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                    {item.storyPoint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
