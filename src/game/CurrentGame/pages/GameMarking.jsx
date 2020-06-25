// The GameGrid part is finished.
// Someone clicked on the stop button
// Each line is an answer from another player.
// There are checkboxes to say if the answer is a word corresponding to the category or not.
import React, {useState, useEffect, useReducer} from 'react';
import uniqid from 'uniqid'
import history from '../../../history'
import {Link} from 'react-router-dom'
//import GameFinished from '../components/GameFinished'
import scoreReducer from '../../../scoreReducer'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";

const GameMarking = () => {

  let location = useLocation();
  const [id, setId] = useState(location.state.gameId)
  const currentUser = useSelector(state => state.auth.currentUser)
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState([])
  const api_url = process.env.REACT_APP_BASE_URL
  console.log(id)

  const dispatch = useDispatch()
  const osef = useSelector(state => state.score)

  useEffect(() => {
    const fetchResponses = () => {
    
    let tmp = []
    fetch(`${api_url}responses`, {
      method: 'get',  
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    .then(responses => {console.log(responses);
      responses.map(obj => {
      if (obj.game_id == id) {
        tmp.push(obj)
        console.log(obj)
      }
     })
    })
    setAnswer( tmp )
    console.log(tmp)
     
  }
  fetchResponses();
  }, [])
  
  useEffect( () => {
    async function fetchData() {
      const response = await fetch(`${api_url}games/${id}`)
      const array = await response.json()
      setCategories(array[1])

    }
    fetchData();
    
  },[])


  // const submitScore = (answer) => {
  //   setIsReady(true)
  //   let tmp = 0
  //   for (const [key, value] of Object.entries(answer)) {
  //     if (value === true) {
  //       tmp += 1
  //     }
  //   }
  //   setScore(tmp)
  //   sendGlobalScore(tmp + osef.score) 
  // }

  // const sendGlobalScore = (score) => {
  //   dispatch({type: 'ADD_SCORE', score: score})
  // }
  console.log(answer.filter(ans => ans.user_id != currentUser.id))
  const handleclick = () => {
    let tmp = []
    let score = 0
    answer.filter(ans => ans.user_id != currentUser.id).map(response => {
     score = 0 
     document.getElementsByName("inlineRadioOptions" + response.id )[0].checked ?
     (score = 1) : (score = -1)
     tmp.push({...response, score: score}) 
    })
    setAnswer(tmp)
  }
  console.log(answer)
  return (
    <>

      
        <div className="container">
          <div className="row">
            {categories.map(category => (
            <div className="col-3">
              <div className="card">
                <div className="card-header card-title">
                  <h6 className="text-dark">{category.name}</h6>
                </div>
                <div className="card-body text-dark">
                  <ul>
                      {answer.filter(ans => (ans.user_id != currentUser.id) && ans.category_id == category.id).map(rep=> (
                        <li key={rep.id}> 
                          {rep.content} : 
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name={"inlineRadioOptions" + rep.id} id={"inlineRadio1" + rep.id}  value={true} defaultCheched/>
                            <label class="form-check-label text-dark" for={"inlineRadio1"+rep.id}>true</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name={"inlineRadioOptions" + rep.id} id={"inlineRadio2" + rep.id} value={false} />
                            <label class="form-check-label text-dark" for={"inlineRadio2"+rep.id}>false</label>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <button onClick={handleclick}>Send correction</button>
                </div>
                
              </div>
            </div>
              ))}
          </div>
          
        </div>
        

    {/* {(Object.keys(results).length && !isReady) && 
    <div>
      <h1>GameMarking</h1>
      <ul style={{listStyle: "none"}}>
        {Object.keys(results).map(result => 
          <li>
            {results[result]}
            <button onClick={() => setAnswer({...answer, [results[result]]: true})}>V</button>
            <button onClick={() => setAnswer({...answer, [results[result]]: false})}>X</button>
          </li>
          )}          
      </ul>
      <button onClick={() =>submitScore(answer)}>Valider réponses</button>
    </div>
    } */}

   {/* {isReady && 
      <GameFinished data={score}/>

   } */}

    
    </>
  )
}

export default GameMarking;