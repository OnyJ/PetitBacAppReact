// First part of a game
// We see the random chosen Letter
// Everyone is filling the categories form
// There is a "Stop" button for the first player who finishes
// import React, { useState } from "react";
// import { fetchGame } from "../fetchCurrentGame";
// import { createPortal } from "react-dom";
// import { useEffect } from "react";
import React, { useEffect, useState } from "react";

//
// const GameGrid = () => {
// const [categories, setCategories] = useState([]);
//
// useEffect(() => {
// async function fetchGame() {
// const API_URL = process.env.REACT_APP_BASE_URL;
// const response = await fetch(`${API_URL}/games/1`, {
// method: "get",
// headers: {
// "Content-Type": "application/json",
// },
// });
// const categoriesObject = await response.json();
// setCategories(categoriesObject);
// }
//
// fetchGame();
// }, []);
//
// console.log();
//
// const showInputs = () => {};
// return (
// <>
{
  /* <h1>Game Grid</h1> */
}
{
  /* {categories.map((value) => ( */
}
// <p>{value.name}</p>
// ))}
{
  /* </> */
}
// );
// };
//
// export default GameGrid;

const GameGrid = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const api_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api_url}categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.json();
      setCategories(text);
    }
    fetchData();
  }, []);
  const transfer = (category) => {
    setCategories(categories.filter((element) => element.id !== category.id));
    setSelectCategories([...selectCategories, category]);
  };
  return (
    <>
      <div>
        <h1> All Catégories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id} onClick={() => transfer(category)}>
              {category.name}
            </li>
          ))}
        </ul>
        <h1> Selected Catégories</h1>
        <ul className="categories">
          {selectCategories.map((selectCategory) => (
            <li key={selectCategory.id}>{selectCategory.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GameGrid;
