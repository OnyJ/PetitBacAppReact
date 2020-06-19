import React, {useEffect, useState} from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider'
import { Router } from 'react-router-dom';

const Room = () => {
  const [rooms, setRooms] = useState([])
  useEffect(()=> {
    const test = {
      room: {
        name: 'nouvelleRoom'
      }
    }
    fetch('http://localhost:3000/rooms', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(test)
    })
    .then(res => res.json())
    .then(roomsArr => setRooms(roomsArr))

  }, [])

  const handleReceivedRoom = (response) => {
    console.log(response);
    setRooms([...rooms, response.room])
  }

  console.log(rooms)
  return(
    <div>
      <ActionCableConsumer
      channel={{channel: 'RoomsChannel'}}
      onReceived={() => handleReceivedRoom}/>
    </div>
  )
}

export default Room