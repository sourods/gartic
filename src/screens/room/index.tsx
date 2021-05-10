import Canvas from './canvas'
import useCanvas from './canvas/hook'
import css from './room.module.css'
import matchStateMachine from './matchStateMachine'
import { useMachine } from '@xstate/react'

const Room = () => {
  const [state, send] = useMachine(matchStateMachine)
  const { context: { canDraw } } = state
  const { canvasProps, clearCanvas, canvasRef } = useCanvas({
    canDraw
  })


  //Net code

  return (
    <div className={css.container}>
      <div className={css.ranking}></div>
      <Canvas {...canvasProps} ref={canvasRef} />
      <div className={css.answers}></div>
      <div className={css.chat}></div>
    </div>
  )
}

export default Room
