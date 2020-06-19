import React, { useEffect, useState } from "react";


export const SelectCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  
  useEffect(()=>{
    async function fetchData() {
      const response = await fetch('https://api-petitbac.herokuapp.com/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
          
        });
        const text = await response.json();
        setCategories(text);
        console.log(text);
    }
    fetchData();
      
  },[])
  
  const transfer = (category) => {
    setCategories( categories.filter(element => element.id !== category.id) );
    setSelectCategories([...selectCategories, category])
  };

  return (
    <>
      <div>
          <h1> All Catégories</h1>
          <ul>
      {categories.map(category =>
        
          <li key={category.id} onClick={() => transfer(category)}>{category.name}</li>
        
      )}
      </ul>
      <h1> Selected Catégories</h1>
          <ul>
      {selectCategories.map(selectCategory =>
        
          <li key={selectCategory.id} >{selectCategory.name}</li>
        
      )}
      </ul>
      </div>
    </>
  );
};


