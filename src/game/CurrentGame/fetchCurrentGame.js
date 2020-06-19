import React, { useState } from "react";

export const fetchGame = () => {
  const API_URL = process.env.REACT_APP_BASE_URL;
  // const [game, setGame] = useState([]);

  return (
    fetch(`${API_URL}/games/1`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      // .then((json) => {
      // this.setState({ items: json.data.map((child) => child) });
      // })
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => console.log(error))
  );
};

// let AuthUser = function (data) {
// return google.login(data.username, data.password).then((token) => {
// return token;
// });
// };
// let userToken = AuthUser(data);
// console.log(userToken); // Promise { <pending> }
// userToken.then(function (result) {
// console.log(result); // "Some User token"
// });
