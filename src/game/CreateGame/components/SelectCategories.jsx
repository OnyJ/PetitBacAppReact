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
      <div>
        {categories.map((category) => (
          <Button
            variant="btn btn-sm btn-warning text-dark"
            key={category.id}
            onClick={() => transfer(category)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    );
  };

  const renderSelectedCategories = () => {
    return (
      <div>
        {selectCategories.map((selectCategory) => (
          <Button
            variant="btn btn-sm btn-warning text-dark"
            key={selectCategory.id}
          >
            {selectCategory.name}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="categories-container">
            <div className="categories-title">
              <h2>
                Catégories
                {!isComputerScreen() && (
                  <span class="h5"> de mots à trouver :</span>
                )}
              </h2>
              {isComputerScreen() && <p class="h4"> de mots à trouver :</p>}
            </div>
            {/* Responsive rendering */}
            <div className="card border-secondary row">
              {isComputerScreen() ? (
                <div>{renderCategories()}</div>
              ) : (
                <center>{renderCategories()}</center>
              )}
            </div>
          </div>

          <div className="categories-container ml-5">
            <div className="categories-title">
              {isComputerScreen() ? (
                <h2>Catégories</h2>
              ) : (
                <div className="pt-3"></div>
              )}
              <p class="h4">selectionnées :</p>
            </div>
            {/* Responsive rendering */}
            <div className="card border-secondary row">
              {isComputerScreen() ? (
                <div>{renderSelectedCategories()}</div>
              ) : (
                <center>{renderSelectedCategories()}</center>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
