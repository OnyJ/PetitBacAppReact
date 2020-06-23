import React, { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';


export const SelectCategories = ({tg}) => {
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const api_url = process.env.REACT_APP_BASE_URL;

  useEffect(()=>{
    async function fetchData() {

      const response = await fetch(`${api_url}categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }

        });
        const text = await response.json();
        setCategories(text);
    }
    fetchData();

  },[])

  const transfer = (category) => {
    setCategories( categories.filter(element => element.id !== category.id) );
    setSelectCategories([...selectCategories, category])
  };

  useEffect(() => {
    tg(selectCategories)
  }, [selectCategories])

  return (
    <>
    <div className="container">
      <div className="row">
        <h1>Catégories de jeu :</h1>
        <ul className="categories">
          {categories.map(category =>
            <Button variant="btn btn-sm btn-warning" key={category.id} onClick={() => transfer(category)}>
              {category.name}
            </Button>
          )}
        </ul>
        <h1>  Catégories choisies :</h1>
        <ul className="categories">
          {selectCategories.map(selectCategory =>
            <Button variant="btn btn-sm btn-warning" key={selectCategory.id}>
              {selectCategory.name}
            </Button>
          )}
        </ul>
        </div>
      </div>
    </>
  );
};


