import { Machine, assign } from 'xstate'

export default Machine(
  {
    id: 'game',
    initial: 'start',
    context: {
      canDraw: true,
      canGuess: false,
      currentRole: 'guesser'
    },
    states: {
      start: {
        on: {
          RESOLVE: 'setup',
          REJECT: 'end'
        }
      },
      setup: {
        on: {
          READY: [
            {
              cond: 'isDrawer',
              target: 'draw',
            },
            {
              cond: 'isGuesser',
              target: 'guess',
            },
          ],
          FINAL: 'end',
        },
      },
      draw: {
        entry: ['unlockCanvas'],
        on: {
          FINISH: 'start',
          BANNED: {
            actions: ['banPlayer'],
            target: 'start',
          },
        },
        exit: ['lockCanvas'],
      },
      guess: {
        entry: ['unlockGuessChat'],
        on: {
          FINISH: 'start',
        },
        exit: ['lockGuessChat', 'clearCanvas'],
      },
      end: {
        type: 'final',
      },
    },
  },
  {
    guards: {
      isDrawer: ({ currentRole }) => currentRole === 'drawer',
      isGuesser: ({ currentRole }) => currentRole === 'guesser',
    },
    actions: {
      lockCanvas: () => {
        assign({
          canDraw: false
        })
      },
      unlockCanvas: () => {
        assign({
          canDraw: true
        })
      },
      lockGuessChat: () => {
        assign({
          canGuess: false
        })
      },
      unlockGuessChat: () => {
        assign({
          canGuess: true
        })
      }
    }
  }
)
