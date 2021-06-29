import React, { useEffect, RefObject, forwardRef, memo } from 'react'
import css from './canvas.module.css'
import { ClientEvent } from './types'

interface Props {
  drawPreferences: {
    strokeStyle: string
    lineWidth: number
  },
  startDrawing: (event: ClientEvent) => void,
  drawing: (event: ClientEvent) => void,
  finishDrawing: (event: ClientEvent) => void,
}

const Canvas = (
  {
    drawPreferences,
    startDrawing,
    drawing,
    finishDrawing,
  }: Props, ref: RefObject<HTMLCanvasElement>) => {
  function resizeCanvas() {
    const { width, height } = ref.current.getBoundingClientRect()

    if (ref.current.width !== width || ref.current.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window
      ref.current.width = width * ratio
      ref.current.height = height * ratio
      const ctx = ref.current.getContext('2d')
      ctx.scale(ratio, ratio)
    }
  }

  const setPreferences = () => {
    const ctx = ref.current.getContext('2d')
    ctx.lineCap = 'round'
    ctx.strokeStyle = drawPreferences.strokeStyle
    ctx.lineWidth = drawPreferences.lineWidth
  }

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas, false)
    ref.current.width = window.innerWidth
    ref.current.height = window.innerHeight
    setPreferences()
    return () => window.removeEventListener('resize', resizeCanvas, false)
  }, [])

  return (
    <>
      <canvas
        className={css.canvas}
        ref={ref}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onTouchStart={startDrawing}
        onTouchMove={drawing}
        onTouchEnd={finishDrawing}
      />
    </>
  )
}

export default memo(forwardRef(Canvas))
