import { Machine } from 'xstate'

const gameMachine = Machine(
  {
    id: 'game',
    initial: 'setup',
    states: {
      setup: {
        on: {
          READY: [
            {
              cond: 'drawer',
              target: 'game.draw.start',
            },
            {
              cond: 'guesser',
              target: 'game.guess.start',
            },
          ],
        },
      },
      draw: {
        on: {
          START: {
            actions: ['unlockCanvas'],
          },
          FINISH: {
            actions: ['lockCanvas'],
            target: 'setup',
          },
          BANNNED: {
            actions: ['lockCanvas'],
            invoke: {
              src: 'banPlayer',
              onDone: { target: 'setup' },
            },
          },
        },
      },
      guess: {
        on: {
          START: {
            actions: ['unlockGuess'],
          },
          SUCCESS: {
            actions: ['lockGuess'],
          },
        },
      },
      end: {
        type: 'final',
      },
    },
  },
  {
    guards: {
      drawer: (_, event) => event.role === 'drawer',
      guesser: (_, event) => event.role === 'guesser',
    },
  }
)
