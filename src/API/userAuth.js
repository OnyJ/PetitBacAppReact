import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../redux/UserAuth/userAuthActions";
import Cookies from "js-cookie";

export const UserRegister = (
  email,
  password,
  password_confirmation,
  username
) => {
  console.log(process.env.REACT_APP_BASE_URL);
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
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const UserLogin = async (email, password) => {
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
    console.log(user);
    const userToLog = { token, user };
    return userToLog;
  } catch (error) {
    console.log(error);
    alert("Aucun utilisateur correspondant");
  }
};

export const Logout = () => {
  const api_url = process.env.REACT_APP_BASE_URL;
  fetch(`${api_url}logout`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).then((response) => console.log(response));
};

export const GetProfile = (id) => {
  const api_url = process.env.REACT_APP_BASE_URL;
  // const select = useSelector((state) => state.auth);
  // console.log(select);
  // const { id, email } = Cookies.get("user");
  // console.log(state.auth);
  fetch(`${api_url}/users/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
};
