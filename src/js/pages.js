module.exports = function() {
  return {
    '15': {
      static: [
        {
          image: 'pg15static1',
          audio: {
            source: 'fundal1',
            state: 'stopped'
          },
          trigger: {
            button: {
              top: '10%'
            },
            zone: {
              top: '10%',
              right: '',
              bottom: '50%',
              left: '',
              width: '40%'
            }
          }
        },
        {
          image: 'pg15static2',
          trigger: {
            button: {
              top: '40%'
            },
            zone: {
              top: '60%',
              bottom: '10%'
            }
          }
        }
      ]
    }
  }
}
