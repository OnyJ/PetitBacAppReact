export const fetchGame = () => {
  const API_URL = process.env.REACT_APP_BASE_URL;

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
        return response;
      })
      .catch((error) => console.error(error))
  );
};
