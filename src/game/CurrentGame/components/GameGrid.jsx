import React, { useEffect, useState } from "react";
import actionCable from "actioncable";
import { ActionCableProvider } from "react-actioncable-provider";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const GameGrid = ({ gameId, players }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [nbPlayers, setNbPlayers] = useState(players);
  const [categories, setCategories] = useState([]);
  const [channel, setChannel] = useState(null);
  const [answers, setAnswers] = useState({});
  const [id, setId] = useState(gameId);
  const auth = useSelector((state) => state.auth);
  const [letter, setLetter] = useState("");
  const [test, setTest] = useState(false);
  const cable = actionCable.createConsumer(
    process.env.REACT_APP_CABLE
  );

  useEffect(() => {
    const sub = cable.subscriptions.create(
      { channel: "GameChannel", game_id: gameId, user_id: currentUser.id },
      {
        initialized() {
          setChannel(this);
        },
        connected() {},
        received(data) {
          if (data["stop"]) {
            const test = document.getElementsByClassName("form-control");
            let tmp = {};
            for (let item of test) {
              tmp[item.name] = item.value;
            }
            this.perform("received", { answers: tmp, stop: false });
          } else {
            setTimeout(
              () =>
                history.push("/game_marking", {
                  gameId: id,
                  players: nbPlayers,
                }),
              1000
            );
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    const fetchGame = () => {
      setCategories([]);
      const API_URL = process.env.REACT_APP_BASE_URL;
      fetch(`${API_URL}games/${id}`, {
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
        .then((response) => {
          setCategories(response[1]);
          setLetter(response[0].letter);
        });
    };
    fetchGame();
  }, []);

  const handleReceivedAnswers = (response) => {
    if (response["stop"]) {
      channel.perform("received", answers);
    }
  };
  const handleClick = () => {
    channel.perform("stopping", { stop: true });
  };

  return (
    <ActionCableProvider cable={cable}>
      {!test && (
        <div className="container">
          <h1>Grille de jeu</h1>
          <p>Lettre : {letter}</p>
          <form>
            {categories.map((category) => (
              <div key={category.id}>
                <span>{category.name}</span>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) =>
                    setAnswers({ ...answers, [category.name]: e.target.value })
                  }
                  name={category.name}
                  value={answers[category.name]}
                  autocomplete="off"
                />
                <br />
              </div>
            ))}
            <Button onClick={handleClick} variant="warning">
              Stop
            </Button>
          </form>
        </div>
      )}
    </ActionCableProvider>
  );
};

export default GameGrid;
