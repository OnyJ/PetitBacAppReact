// The GameGrid part is finished.
// Someone clicked on the stop button
// Each line is an answer from another player.
// There are checkboxes to say if the answer is a word corresponding to the category or not.
import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid'
import history from '../../../history'
import {Link} from 'react-router-dom'
import GameFinished from './GameFinished'



const GameMarking = ({dataResults}) => {

  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0)
  const [count, setCount] = useState(0)


  useEffect(() => {
    setResults(...results, dataResults)

  }, [])
  console.log(results)
  console.log(count)
  console.log(score)

  console.log(count + ' from outside')

  const addScore = (int) => {
    setCount(count + 1 )
    setScore(score + int)
    console.log(score)
    console.log(count)
  }

  return (
    <>

    {count !== Object.keys(results).length && 
    <div>
      <h1>GameMarking</h1>
      <ul style={{listStyle: "none"}}>
        {Object.keys(results).map(result => 
          <li>
            {results[result]}
            <button onClick={() => addScore(1)}>V</button>
            <button onClick={() => addScore(-1)}>X</button>
          </li>
          )}
      </ul>
    </div>
    }

    {count === Object.keys(results).length &&
      <GameFinished data={score}/>
    }

    
    </>
  )
}

export default GameMarking;