import React, { Ref, forwardRef } from 'react'
import { ClientEvent } from '../../types'
import styles from './styles'

interface CanvasProps {
  className?: string
  startDrawing: (event: ClientEvent) => void
  drawing: (event: ClientEvent) => void
  finishDrawing: () => void
}

const Canvas = ({ className, startDrawing, drawing, finishDrawing }: CanvasProps, ref: Ref<HTMLCanvasElement>) => (
  <>
    <canvas
      className={`${className || ''} canvas`}
      ref={ref}
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

export default forwardRef(Canvas)
