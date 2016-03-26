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
    },
    '52': {
      exercise: [
        {
          type: 'typer',
          title: 'Titlu provizoriu (lipsa excel)',
          image: 'pg52ex3',
          trigger: {
            button: {
              top: '13%'
            },
            zone: {
              top: '13%',
              right: '',
              bottom: '42%',
              left: '',
              width: ''
            }
          },
          help: {
            toggle: false,
            text: 'LITERELE S-AU AMESTECAT. GASESTE CUVANTUL CORESPUNZATOR UNEI CULORI SI COLOREAZA IMAGINEA POTRIVITA. Cand ai terminat apasa pe cheita si verifica. Succes!'
          },
          // audio: {
          //   source: 'fundal1',
          //   state: 'stopped'
          // },
          data: [
            {
              identifier: 'one',
              position: {
                top: '26%',
                left: '48%',
                width: '26%'
              },
              model: '',
              solution: 'GELB'
            },
            {
              identifier: 'two',
              position: {
                top: '38.5%',
                left: '48%',
                width: '26%'
              },
              model: '',
              solution: 'BLAU'
            },
            {
              identifier: 'three',
              position: {
                top: '51.5%',
                left: '48%',
                width: '26%'
              },
              model: '',
              solution: 'GRÜN'
            },
            {
              identifier: 'four',
              position: {
                top: '64%',
                left: '48%',
                width: '26%'
              },
              model: '',
              solution: 'ROSA'
            }
          ]
        },
        {
          type: 'type',
          title: 'Titlu provizoriu (lipsa excel)',
          image: 'pg52ex4',
          trigger: {
            button: {
              top: '53%'
            },
            zone: {
              top: '53%',
              right: '',
              bottom: '12%',
              left: '',
              width: ''
            }
          },
          help: {
            toggle: false,
            text: 'INLOCUIESTE CUVANTUL CU NUMARUL CORESPUNZATOR SI CALCULEAZA. SCRIE REZULTATUL. Cand ai terminat apasa pe cheita si verifica. Succes!'
          },
          data: [
            {
              identifier: 'one',
              position: {
                top: '26%',
                left: '48%',
                width: '2.5%',
                height: '3.5%'
              },
              model: '',
              solution: '3'
            }
          ]
        }
      ]
    }
  }
}
