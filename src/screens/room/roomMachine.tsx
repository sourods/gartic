import { Machine } from 'xstate';

const gameMachine = Machine({
  id: 'game',
  initial: 'setup',
  states: {
    setup: {
      on: {
        FINISH: [
          {
            cond: 'drawer',
            target: 'draw',
          },
          {
            cond: 'guesser',
            target: 'guess',
          },
          {
            cond: 'last',
            target: 'end',
          }
        ]
      }
    },
    draw: {
      on: {
        START: {
          actions: ['unlockCanvas'],
        },
        FINISH: {
          actions: ['lockCanvas'],
          target: 'play.setup',
        },
        BANNED: {
          actions: ['lockCanvas', 'ban'],
          target: 'play.setup',
        }
      }
    },
    guess: {
      on: {
        START: {
          actions: ['unlockGuess'],
        },
        SUCCESS: {
          actions: ['lockGuess'],
        },
      }
    },
    end: {
      type: 'final'
    }
  },
},
  {
    guards: {
      drawer: (_, event) => event.role === 'drawer',
      guesser: (_, event) => event.role === 'guesser',
      last: (_, event) => event.role === 'last'
    }
  })


const roomMachine = Machine({
  id: 'room',
  initial: 'start',
  type: 'parallel',
  states: {
    start: {
      on: {
        CONNECTED: {

        }
      }
    },
    end: {
      type: 'final'
    }
  }
});

export default roomMachine
