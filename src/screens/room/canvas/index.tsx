import React, { useLayoutEffect, useState, useRef, forwardRef } from 'react'
import { ClientEvent } from '../types'
import styles from './styles'

const Canvas = () => {
  const canvasRef = useRef(null),
    contextRef = useRef(null),
    lineSize = 3
  const [lastClient, setLastClient] = useState({
    x: 0,
    y: 0,
  })
  const [drawPreferences, setDrawPreferences] = useState({
    strokeStyle: 'black',
    lineWidth: 2 * lineSize,
  })
  const [isDrawing, setIsDrawing] = useState(false)

  const getClientPosition = (event: ClientEvent) => {
    let x = 0,
      y = 0
    if ('touches' in event) {
      const { touches } = event
      console.log(touches)
      ;(x = touches[0].clientX), (y = touches[0].clientY)
    } else {
      ;(x = event.clientX), (y = event.clientY)
    }
    return {
      x,
      y,
    }
  }

  const updateLastClient = (x: number, y: number) =>
    setLastClient({
      x,
      y,
    })

  const draw = ({ x, y }: { x: number; y: number }) => {
    contextRef.current.beginPath()
    if (
      lastClient.x &&
      lastClient.y &&
      (x !== lastClient.x || y !== lastClient.y)
    ) {
      contextRef.current.moveTo(lastClient.x, lastClient.y)
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
    }

    contextRef.current.arc(x, y, lineSize, 0, Math.PI * 2, true)
    contextRef.current.closePath()
    contextRef.current.fill()
    updateLastClient(x, y)
  }

  const startDrawing = (event: ClientEvent) => {
    setIsDrawing(true)
    draw(getClientPosition(event))
  }

  const drawing = (event: ClientEvent) =>
    isDrawing && draw(getClientPosition(event))

  const finishDrawing = () => {
    setIsDrawing(false)
    updateLastClient(0, 0)
  }

  function resizeCanvas() {
    const canvas = canvasRef.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.strokeStyle = drawPreferences.strokeStyle
    context.lineWidth = drawPreferences.lineWidth
    contextRef.current = context
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', resizeCanvas, false)
    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas, false)
  }, [])
  return (
    <>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onTouchStart={startDrawing}
        onTouchMove={drawing}
        onTouchEnd={finishDrawing}
      />
      <style jsx>{styles}</style>
    </>
  )
}

export default forwardRef(Canvas)
