import { useCallback, useRef, useState } from 'react'
import { ClientEvent, InputPosition } from './types'

interface Props {
  onUserDraw: (event: InputPosition) => void
}

const useCanvas = ({ onUserDraw }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineSize = 3
  const [lastClient, setLastClient] = useState({
    x: 0,
    y: 0,
  })
  const [canDraw, setCanDraw] = useState(false)

  const [drawPreferences] = useState({
    strokeStyle: 'black',
    lineWidth: 2 * lineSize,
  })

  const [isDrawing, setIsDrawing] = useState(false)

  const afterDraw = useCallback((input: InputPosition) => onUserDraw(input), [])

  const getClientPosition = (event: ClientEvent): InputPosition => {
    if ('touches' in event) {
      const { touches } = event
      return {
        x: touches[0].clientX,
        y: touches[0].clientY,
      }
    }
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }

  const updateLastClient = (x: number, y: number) =>
    setLastClient({
      x,
      y,
    })

  const draw = ({ x, y }: InputPosition) => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    if (
      lastClient.x &&
      lastClient.y &&
      (x !== lastClient.x || y !== lastClient.y)
    ) {
      ctx.moveTo(lastClient.x, lastClient.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    ctx.arc(x, y, lineSize, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    updateLastClient(x, y)
  }

  const userDraw = (event: ClientEvent) => {
    const input = getClientPosition(event)
    draw(input)
    afterDraw(input)
  }

  const startDrawing = (event: ClientEvent) => {
    if (canDraw) {
      setIsDrawing(true)
      userDraw(event)
    }
  }

  const drawing = (event: ClientEvent) => {
    if (isDrawing) {
      userDraw(event)
    }
  }

  const finishDrawing = () => {
    setIsDrawing(false)
    updateLastClient(0, 0)
  }

  return {
    canvasProps: {
      drawPreferences,
      startDrawing,
      drawing,
      finishDrawing,
    },
    clearCanvas: () => {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.beginPath()
    },
    setCanUserDraw: setCanDraw,
    draw,
    canvasRef
  }
}

export default useCanvas
