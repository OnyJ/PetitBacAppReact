import React, { useEffect, useState } from "react";
import actionCable from "actioncable";
import {
  ActionCableProvider,
  ActionCableConsumer,
} from "react-actioncable-provider";
import { useSelector } from "react-redux";
import useSelection from "antd/lib/table/hooks/useSelection";
import { useLocation, useHistory, Redirect } from "react-router-dom";

const WaitingRoom = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  let location = useLocation();
  let history = useHistory();
  const [gameId, setGameId] = useState(location.testId);
  const [categories, setCategories] = useState(location.categories);
  const [channel, setChannel] = useState(null);
  //const [test, setTest] = useState("rien");
  const [data, setData] = useState("kedal");
  const [stop, setStop] = useState(false);
  const [start, setStart] = useState(false);
  const [players, setPlayers] = useState([]);
  const [admin, setAdmin] = useState("");
  const cable = actionCable.createConsumer(
    "wss://api-petitbac.herokuapp.com/cable"
  );
  console.log(location);

  useEffect(() => {
    const sub = cable.subscriptions.create(
      { channel: "RoomChannel", game_id: gameId, user_id: currentUser.id },
      {
        initialized() {
          setChannel(this);
          console.log("subscriptions", currentUser);
        },
        connected() {
          console.log("test");
          this.perform("received", { game_id: gameId });
        },
        received(data) {
          if (!Array.isArray(data)) {
            console.log(data);
            console.log(players);
            console.log(players.length);
            history.push("/current_game", {
              categories: categories,
              gameId: gameId,
              players: data["players"].length,
            });
          } else {
            setPlayers(data);
            setAdmin(data[0]);
          }
        },
      }
    );
  }, []);

  console.log(players);

  return (
    <>
      {currentUser === null ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <ActionCableProvider cable={cable}>
          <div className="container pt-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Numéro de la partie : </h5>
                <center>
                  <p class="h3 text-success">{gameId}</p>
                </center>
              </div>
            </div>

            {admin && <p> Admin: {admin.username}</p>}
            {players && (
              <ul className="p-4">
                {players.slice(1).map((player, i) => (
                  <li key={i}>{player.username} a rejoint la partie</li>
                ))}
                En attente d'autres joueurs...
              </ul>
            )}

            {currentUser.id == admin.id && (
              <button
                class="btn btn-warning btn-lg text-dark"
                onClick={() =>
                  channel.perform("starting", { start: true, players: players })
                }
              >
                C'est parti !
              </button>
            )}
          </div>
        </ActionCableProvider>
      )}
    </>
  );
};
export default WaitingRoom;
