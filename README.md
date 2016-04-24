# bookrack

[![Join the chat at https://gitter.im/tehciolo/bookrack](https://badges.gitter.im/tehciolo/bookrack.svg)](https://gitter.im/tehciolo/bookrack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

An interactive book template meant to be used as a subrepo. Yay.

------------

Installation instructions:

1. Clone the repo
2. ```npm install```
3. ```gulp```

------------

Page
```
'05': {
  // static / video / exercise
}
```

Static
```
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
```

Video
```
video: [
  {
    video: {
      source: 'p5_v1'
    },
    trigger: {
      button: {
        top: '18%'
      },
      zone: {
        top: '18%',
        bottom: '2%'
      }
    }
  }
]
```

Exercise
```
exercise: [
  {
    type: 'picker',
    title: 'WER SPRICHT? HÖR ZU UND KREIS EIN!',
    image: 'pg08ex5',
    trigger: {
      button: {
        top: '11%'
      },
      zone: {
        top: '11%',
        bottom: '4%'
      }
    },
    // audio: {
    //   source: 'fundal1',
    //   state: 'stopped'
    // },
    help: {
      toggle: false,
      text: 'helptext'
    },
    data: [
      // type / typer / picker / checker / linker / painter
    ]
  }
]
```

------------

Type
```
{
  identifier: 'one',
  position: {
    top: '73%',
    left: '24%',
    width: '6.6%',
    height: '5.5%'
  },
  model: '',
  solution: '4'
}
```

Typer
```
{
  identifier: 'one',
  position: {
    top: '36%',
    left: '48%',
    width: '25%'
  },
  model: '',
  solution: 'GELB'
}
```

Checker
```
{
  identifier: 'one',
  model: '',
  position: {
    top: '19%',
    left: '17.7%',
    width: '30%',
    height: '8.3%'
  },
  answerFalse: {
    top: '62%',
    left: '68%'
  },
  answerTrue: {
    top: '3%',
    left: '77%'
  }
}
```

Picker
```
{
  identifier: 'one',
  model: '',
  position: {
    top: '67.3%',
    left: '35.5%',
    width: '60%',
    height: '15.5%'
  },
  answer: {
    left: '27%'
  }
}
```

Linker
```
{
  identifier: 'creion',
  style: {
    top: '15%',
    left: '8%',
    width: '10%',
    height: 'auto'
  },
  image: {
    src: '19-creion.png'
  },
  sourceAnchors: ["BottomCenter"],
  targetAnchors: []
},
{
  identifier: 'nick',
  style: {
    top: '57%',
    left: '60%',
    width: '15%',
    height: 'auto'
  },
  image: {
    src: '19-nick.png'
  },
  solution: ["pix, guma-sters, creion-ceara"],
  sourceAnchors: [],
  targetAnchors: ["RightMiddle"]
}
```

Painter
```
{
  identifier: 'one',
  position: {
    top: '36.5%',
    left: '59%',
    width: '30%',
    height: '13.5%'
  },
  solution: 'pg23ex1one'
}
```

------------

## Image processing

This assumes that:
- you have imagemagick installed
- you have two folders: src with images in it, dist empty (both at the same level in your folder structure)

From inside src folder:
```
for file in *.jpg; do convert $file -resize 1200 -quality 70 ../dist/$file; done
```

