import { Client, Room } from "colyseus.js";
import { useState } from "react";
const client = new Client("ws://localhost:2567");

const useRoomConnection = ({ onNetCanvasChange }) => {
  const [error, setError] = useState(false)
  const listenCanvasChanges = (room: Room) => {
    room.onMessage("CanvasUpdate", ({ x, y }) => {
      onNetCanvasChange({ x, y })
    })
    room.onMessage("CanvasHistory", (history) => {
      history.forEach(coordinate => {
        onNetCanvasChange(coordinate)
      });
    })
  }
  const handlePlayersUpdates = (room: Room) =>  {
    room.state.players.onAdd = function (player, sessionId) {
      console.log(`o player ${sessionId} se conectou`)
      player.onChange = function () {
        console.log('changes', player)
      }
    }
  }
  const connectToRoom = () => {
    return new Promise((resolve) => {
      client.joinOrCreate("CanvasRoom")
        .then((room: Room) => {
          resolve(room)
          handlePlayersUpdates(room)
          listenCanvasChanges(room)
        })
        .catch(error => {
          console.log('Connection failed !!!', error)
          setError(error)
        })
    })
  }
  return {
    connectToRoom,
    error
  }
}
export default useRoomConnection
