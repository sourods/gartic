import css from 'styled-jsx/css'

export default css`
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.ranking {
  background: blue;
}
.answers {
  background: orange;
}
.chat {
  background: green;
}

.ranking, .answers, .chat {
  position: fixed;
  z-index: 3;
  width: 8rem;
}
`
