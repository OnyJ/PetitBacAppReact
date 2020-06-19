// new file
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { SelectCategories } from "../components/SelectCategories";
import Cookies from 'js-cookie'


export const CreateGame = () => {
  const currentUser = useSelector(state => state.auth.currentUser)
  const [maxPlayer, setMaxPlayer] = useState('')
    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
      if (categories.length) 
        CreateAGame(currentUser, maxPlayer);
    },[categories])
   
    const create = (e) => {
        e.preventDefault()
        setCategories( document.getElementsByClassName("categories")[0].innerText.split("\n") )
        
    }  
    
    const CreateAGame = (currentUser, maxGuests) => {
      const api_url = process.env.REACT_APP_BASE_URL;
      console.log(maxPlayer, currentUser, categories)
      const data = {
        game: {
          creator_id: currentUser.id, 
          winner_id: null,
          max_guests: maxGuests
        }
      }  
      
      fetch(`${api_url}games`, {
        method: 'post', 
        headers: {
          "Content-Type":"application/json", 
          Authorization: `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify(data),
      })
        
    };
    
    return(
    <>
    <h1>Game creation</h1>    
    <form onSubmit={create}>
      <input type='number' value={maxPlayer} onChange={(e) => setMaxPlayer(e.target.value)} placeholder="max player"></input>
      <SelectCategories />
      <input type="submit" value="Envoyer"/>
    </form>
    </>
  )
}

