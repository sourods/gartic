import Canvas from './canvas'
import useCanvas from './canvas/hook'
import useRoomConnection from './hooks/useRoomConnection'
import matchStateMachine from './matchStateMachine'
import { useMachine } from '@xstate/react'
import { useEffect } from 'react'
import { InputPosition } from './canvas/types'


import css from './room.module.css'

const Room = () => {
  let connection

  //Screen hooks
  const { canvasProps, clearCanvas, setCanUserDraw, canvasRef, draw } = useCanvas({
    onUserDraw: (input: InputPosition) => connection.send('canvasUpdate', input)
  })

  //Handle state machine
  const [state, send] = useMachine(matchStateMachine, {
    actions: {
      clearCanvas
    }
  })
  const { context: { canDraw } } = state
  useEffect(() => {
    setCanUserDraw(canDraw)
  }, [canDraw])

  //Multiplayer connection
  const { connectToRoom } = useRoomConnection({
    onNetCanvasChange: (changes: InputPosition) => draw(changes)
  })

  useEffect(() => {
    const connect = async () => {
      connection = await connectToRoom()
    }
    connect()
    return () => connection && connection.leave()
  }, [])

  return (
    <div className={css.container}>
      <div className={css.ranking}></div>
      <Canvas  {...canvasProps} ref={canvasRef} />
      <div className={css.answers}></div>
      <div className={css.chat}></div>
    </div>
  )
}


export default Room
