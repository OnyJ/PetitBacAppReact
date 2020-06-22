import Cookies from "js-cookie";

export const fetchUserRegister = (
  email,
  password,
  password_confirmation,
  username
) => {
  const api_url = process.env.REACT_APP_BASE_URL;
  const data = {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      username: username,
    },
  };

  fetch(`${api_url}signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const fetchUserLogin = async (email, password) => {
  const api_url = process.env.REACT_APP_BASE_URL;
  const data = {
    user: {
      email: email,
      password: password,
    },
  };

  const response = await fetch(`${api_url}login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const token = await response.headers.get("authorization").split(" ")[1];
    const user = await response.json();
    console.log(user)
    const userToLog = { token, user };
    return userToLog;
  } catch (error) {
    console.error(error);
    alert("Aucun utilisateur correspondant");
    throw 'erreur'
  }
};

export const fetchUserLogout = () => {
  const api_url = process.env.REACT_APP_BASE_URL;
  fetch(`${api_url}logout`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
};

export const fetchGetProfile = (id) => {
  const api_url = process.env.REACT_APP_BASE_URL;
  fetch(`${api_url}/users/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).then((response) => response.json());
};
