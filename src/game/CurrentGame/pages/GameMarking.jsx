import React, { useState, useEffect, useReducer } from "react";
import uniqid from "uniqid";
import history from "../../../history";
import { Link } from "react-router-dom";
import GameFinished from "./GameFinished";
import scoreReducer from "../../../scoreReducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import actionCable from "actioncable";
import {
  ActionCableProvider,
  ActionCableConsumer,
} from "react-actioncable-provider";

const GameMarking = () => {
  const location = useLocation();
  const history = useHistory();
  const [id, setId] = useState(location.state.gameId);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [channel, setChannel] = useState(null);
  const [responseSent, setResponseSent] = useState(false);
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [playerResponseLeft, setPlayerResponseLeft] = useState(
    location.state.players
  );

  const api_url = process.env.REACT_APP_BASE_URL;
  const cable = actionCable.createConsumer(
    "wss://api-petitbac.herokuapp.com/cable"
  );
  console.log(location.state.players);

  const dispatch = useDispatch();
  const osef = useSelector((state) => state.score);
  console.log(osef);

  console.log(playerResponseLeft);
  console.log(id, typeof id);

  useEffect(() => {
    const sub = cable.subscriptions.create(
      {
        channel: "MarkingChannel",
        game_id: id,
        user_id: currentUser.id,
        validator: location.state.players,
      },
      {
        initialized() {
          setChannel(this);
        },
        received(data) {
          if (data["stop"]) {
            console.log(data);
            history.push("/game_finished", {
              gameId: id,
            });
          } else {
            console.log(data);
          }
          // setSubmitted(true)
          // console.log(data)

          //this.perform('stop', {...data, count: data['osef'] + count})
        },
      }
    );
  }, []);

  useEffect(() => {
    async function fetchData() {
      let tmp = [];
      const response = await fetch(`${api_url}responses`);
      const array = await response.json();
      array.map((obj) => {
        if (obj.user_id != currentUser.id && obj.game_id == id) {
          tmp.push(obj);
        }
      });
      setAnswer(tmp);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${api_url}games/${id}`);
      const array = await response.json();
      setCategories(array[1]);
    }
    fetchData();
  }, []);

  // const sendGlobalScore = (score) => {
  //   dispatch({type: 'ADD_SCORE', score: score})
  // }
  console.log(answer);

  const handleclick = () => {
    let tmp = [];
    let score = 0;
    answer.map((response) => {
      score = 0;
      document.getElementsByName("inlineRadioOptions" + response.id)[0].checked
        ? (score = 1)
        : (score = -1);
      tmp.push({ ...response, score: score });
    });
    setAnswer(tmp);
    setResponseSent(true);
    setSubmitted(true);
    channel.perform("received", { answers: tmp });
  };
  console.log(answer);
  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <ActionCableProvider cable={cable}>
          <div className="container text-center">
            <h1 className="h3 pt-4">Ces mots sont-ils corrects ?</h1>
            <div className="row pt-5">
              {categories.map((category) => (
                <div className="col-3">
                  <div className="card">
                    <div className="card-header card-title">
                      <h6 className="text-dark">{category.name}</h6>
                    </div>
                    <div className="card-body text-dark">
                      <ul>
                        {answer
                          .filter((ans) => ans.category_id == category.id)
                          .map((rep) => (
                            <li key={rep.id}>
                              {rep.content} :
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={"inlineRadioOptions" + rep.id}
                                  id={"inlineRadio1" + rep.id}
                                  value={true}
                                  defaultCheched
                                />
                                <label
                                  class="form-check-label text-dark"
                                  for={"inlineRadio1" + rep.id}
                                >
                                  vrai
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name={"inlineRadioOptions" + rep.id}
                                  id={"inlineRadio2" + rep.id}
                                  value={false}
                                />
                                <label
                                  class="form-check-label text-dark"
                                  for={"inlineRadio2" + rep.id}
                                >
                                  faux
                                </label>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="card-footer"></div>
                  </div>
                </div>
              ))}
            </div>
            {!responseSent && (
              <button
                className="btn btn-warning btn-lg text-dark mt-5"
                onClick={handleclick}
              >
                Correction finie
              </button>
            )}
          </div>
        </ActionCableProvider>
      )}
    </>
  );
};

export default GameMarking;
