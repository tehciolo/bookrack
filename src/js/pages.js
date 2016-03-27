module.exports = function() {
  return {
    '07': {
      static: [
        {
          image: 'pg7ex3',
          audio: {
            source: 'fundal1',
            state: 'stopped'
          },
          trigger: {
            button: {
              top: '12%'
            },
            zone: {
              top: '12%',
              bottom: '48%'
            }
          }
        }
      ]
    },
    '10': {
      static: [
        {
          image: 'pg10ichsage',
          audio: {
            source: 'fundal1',
            state: 'stopped'
          },
          trigger: {
            button: {
              top: '82%'
            },
            zone: {
              top: '82%',
              bottom: '4%'
            }
          }
        }
      ]
    },
    '11': {
      exercise: [
        {
          type: 'checker',
          title: 'Titlu provizoriu (lipsa excel)',
          image: 'pg11ex8',
          trigger: {
            button: {
              top: '8%'
            },
            zone: {
              top: '8%',
              bottom: '4%'
            }
          },
          help: {
            toggle: false,
            text: 'PRIVESTE IMAGINILE SI BIFEAZA ENUNTUL CORESPUNZATOR. Cand ai terminat apasa pe cheita si verifica. Succes!'
          },
          data: [
            {
              identifier: 'one',
              model: '',
              position: {
                top: '6.5%',
                left: '20%',
                width: '30%',
                height: '10.5%'
              },
              answerFalse: {
                left: '68%',
                top: '58%'
              },
              answerTrue: {
                left: '75.5%'
              }
            },
            {
              identifier: 'two',
              model: '',
              position: {
                top: '6.5%',
                left: '50%',
                width: '30%',
                height: '10.5%'
              },
              answerTrue: {
                left: '72%',
                top: '58%'
              },
              answerFalse: {
                left: '79.5%'
              }
            },
            {
              identifier: 'three',
              model: '',
              position: {
                top: '54.5%',
                left: '20%',
                width: '30%',
                height: '10.5%'
              },
              answerFalse: {
                left: '77%',
                top: '58%'
              },
              answerTrue: {
                left: '82.5%'
              }
            },
            {
              identifier: 'four',
              model: '',
              position: {
                top: '54.5%',
                left: '50%',
                width: '30%',
                height: '10.5%'
              },
              answerTrue: {
                left: '75%',
                top: '58%'
              },
              answerFalse: {
                left: '81.5%'
              }
            }
          ]
        }
      ]
    },
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
              bottom: '50%',
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
    '51': {
      exercise: [
        {
          type: 'picker',
          title: 'Ce nu se potriveste?',
          image: 'pg51ex2',
          trigger: {
            button: {
              top: '60%'
            },
            zone: {
              top: '60%',
              bottom: '4%'
            }
          },
          help: {
            toggle: false,
            text: '(lipsa excel)'
          },
          data: [
            {
              identifier: 'one',
              model: '',
              position: {
                top: '28%',
                left: '20%',
                width: '62%',
                height: '8.5%'
              },
              answer: {
                left: '83.5%'
              }
            },
            {
              identifier: 'two',
              model: '',
              position: {
                top: '41%',
                left: '13%',
                width: '77%',
                height: '8.5%'
              },
              answer: {
                left: '37.5%'
              }
            },
            {
              identifier: 'three',
              model: '',
              position: {
                top: '54%',
                left: '17%',
                width: '67%',
                height: '8.5%'
              },
              answer: {
                left: '34.5%'
              }
            },
            {
              identifier: 'four',
              model: '',
              position: {
                top: '67.5%',
                left: '25%',
                width: '52%',
                height: '8.5%'
              },
              answer: {
                left: '76.5%'
              }
            }
          ]
        }
      ]
    },
    '50': {
      video: [
        {
          video: {
            source: 'test'
          },
          trigger: {
            button: {
              top: '11%'
            },
            zone: {
              top: '11%',
              bottom: '5%'
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
              bottom: '42%'
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
              top: '59%'
            },
            zone: {
              top: '59%',
              bottom: '7%'
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
                top: '27%',
                left: '56.3%',
                width: '4.5%',
                height: '5.5%'
              },
              model: '',
              solution: '6'
            },
            {
              identifier: 'two',
              position: {
                top: '40%',
                left: '56.3%',
                width: '4.5%',
                height: '5.5%'
              },
              model: '',
              solution: '4'
            },
            {
              identifier: 'three',
              position: {
                top: '52.5%',
                left: '68.3%',
                width: '4.5%',
                height: '5.5%'
              },
              model: '',
              solution: '4'
            },
            {
              identifier: 'four',
              position: {
                top: '65.2%',
                left: '66.7%',
                width: '4.5%',
                height: '5.5%'
              },
              model: '',
              solution: '1'
            }
          ]
        }
      ]
    }
  }
}
