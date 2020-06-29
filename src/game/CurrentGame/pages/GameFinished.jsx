import React, { useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const GameFinished = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const finalScore = useSelector((state) => state.score.score);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [gameId, setGameId] = useState(location.state.gameId);
  const [responses, setResponses] = useState([]);
  const [score, setScore] = useState(data);
  const [goToScore, setGoToScore] = useState(false);
  const api_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchScore = () => {
      fetch(`${api_url}responses`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((response) =>
          setResponses(
            response.filter(
              (res) => res.game_id === gameId && res.user_id === currentUser.id
            )
          )
        );
    };
    fetchScore();
  }, []);

  const scoreCalc = () => {
    let score = 0;
    responses.forEach((res) => {
      if (res.status === true) {
        score += 1;
      }
    });
    //sendGlobalScore(score)
    return score;
  };

  const sendGlobalScore = (score) => {
    dispatch({ type: "ADD_SCORE", score: score });
  };

  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <div
          className="container"
          style={{ textAlign: "center", paddingTop: "100px" }}
        >
          <ul style={{ listStyle: "none" }}>
            {responses.map((res) => (
              <li key={res.id}>
                {res.content}: {res.status === true ? "vrai" : "faux"}
              </li>
            ))}
          </ul>

          <p>Ton score pour cette partie est de {scoreCalc()}</p>
          <div className="pt-5">
            <Link to="/create_game">
              <button className="btn btn-warning btn-lg text-dark center mr-5">
                {" "}
                REJOUER
              </button>
            </Link>
            <Link to="/">
              {/* This link in the future can be a "Voir les scores finaux" button */}
              <button className="btn btn-warning btn-lg text-dark center ml-5">
                {" "}
                MENU
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default GameFinished;
