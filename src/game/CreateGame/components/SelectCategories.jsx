import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export const SelectCategories = ({ tg }) => {
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

  useEffect(() => {
    tg(selectCategories);
  }, [selectCategories]);

  const isComputerScreen = () => {
    return window.screen.availWidth > 375;
  };

  const renderCategories = () => {
    return (
      <ul className="">
        {/* Do we need this ? : <div class="row"> */}
        {categories.map((category) => (
          <Button
            variant="btn btn-sm btn-warning text-dark"
            key={category.id}
            onClick={() => transfer(category)}
          >
            {category.name}
          </Button>
        ))}
        {/* </div> */}
      </ul>
    );
  };

  const renderSelectedCategories = () => {
    return (
      <ul className="">
        {/* Do i need this ? : <div class="row"> */}
        {selectCategories.map((selectCategory) => (
          <Button
            variant="btn btn-sm btn-warning text-dark"
            key={selectCategory.id}
          >
            {selectCategory.name}
          </Button>
        ))}
        {/* </div> */}
      </ul>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="categories-container">
            <div className="categories-title">
              <h2>Catégories</h2>
              <p class="h4">de mots à trouver :</p>
            </div>
            {/* Responsive rendering */}
            {isComputerScreen() ? (
              <div>{renderCategories()}</div>
            ) : (
              <center>{renderCategories()}</center>
            )}
          </div>

          <div className="categories-container">
            <div className="categories-title">
              <h2>Catégories</h2>
              <p class="h4">selectionnées :</p>
            </div>
            {/* Responsive rendering */}
            {isComputerScreen() ? (
              <div>{renderSelectedCategories()}</div>
            ) : (
              <center>{renderSelectedCategories()}</center>
            )}

            {/* 3 times not my divs */}
          </div>
        </div>
      </div>
    </>
  );
};
