import { Client, Room } from "colyseus.js";
import { useState } from "react";
const client = new Client("ws://localhost:2567");

const useRoomConnection = ({ onNetCanvasChange }) => {
  const [error, setError] = useState(false)
  const handleCanvasUpdates = (room: Room) =>  {
    room.state.players.onAdd = function (player, sessionId) {
      console.log(`o player ${sessionId} se conectou`)
      player.onChange = function () {
        console.log('changes', player)
        onNetCanvasChange({ x: player.x, y: player.y })
      }
    }
  }
  const connectToRoom = () => {
    return new Promise((resolve) => {
      client.joinOrCreate("CanvasRoom")
        .then((room: Room) => {
          resolve(room)
          handleCanvasUpdates(room)
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
