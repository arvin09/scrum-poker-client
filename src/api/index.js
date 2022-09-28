export const postData = (message) => {
    return fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      mode: "cors",
      cache: "no-cache",
    });
  };

export const getData = (roomId) => {
    fetch(`/users/${roomId}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          estimates: response.messages,
        });
      });
  };