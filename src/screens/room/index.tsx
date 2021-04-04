import React from 'react'
import Canvas from './canvas'
import styles from './styles'

const Room = () => {
  return (
    <div className="container">
      <div className="ranking"></div>
      <Canvas />
      <div className="answers"></div>
      <div className="chat"></div>
      <style jsx>{styles}</style>
    </div>
  )
}

export default Room
