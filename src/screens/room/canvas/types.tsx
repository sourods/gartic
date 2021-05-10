import { MouseEvent, TouchEvent } from 'react'
export interface CanvasProps {
  canDraw?: boolean
  imageData?: ImageData
}
export type ClientEvent = MouseEvent | TouchEvent
export interface InputPosition {
  readonly x: number
  readonly y: number
}
