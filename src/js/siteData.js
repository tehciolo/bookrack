module.exports = function() {
  return {
    menu: {
      name: "Meniu",
      next: "Inainte",
      prev: "Inapoi",
      jump: "Mergi la pagina",
      search: "Hai!",
      toc: "Cuprins",
      help: "Ajutor"
    },
    modal: {
      video: "Mergi la VIDEO",
      static: "Mergi la POZA(E)",
      exercise: "Mergi la EXERCITIU",
      exercise2: "Mergi la EXERCITIU 2"
    },
    pages: {
      toc: {
        title: 'Cuprins',
        chapters: [
          {
            title: 'Unit zero - Can you remember?',
            pageno: '6'
          },
          {
            title: 'Module 1',
            pageno: '8'
          },
          {
            title: 'Module 2',
            pageno: '20'
          },
          {
            title: 'Module 3',
            pageno: '36'
          },
          {
            title: 'Module 4',
            pageno: '52'
          },
          {
            title: 'Harvest Festivals',
            pageno: '68'
          },
          {
            title: 'New Year',
            pageno: '71'
          },
          {
            title: 'Progress check!',
            pageno: '74'
          },
          {
            title: 'Know-how!',
            pageno: '80'
          }
        ]
      },
      help: {
        title: 'Ai nevoie de ajutor?',
        introParagraphs: [
          {
            text: 'Pentru a parcurge lectiile manualului selecteaza din meniul din stanga "Cuprins" sau mergi direct la pagina pe care doresti sa o accesezi.'
          },
          {
            text: 'In aceasta carte poti gasi urmatoarele semne:'
          }
        ],
        outroParagraphs: [
          {
            text: 'Dand click pe aceste semne vei putea efectua activitati multimedia interactive si de invatare.'
          }
        ],
        defs: [
          {
            icon: 'static',
            helper: 'mareste imaginea'
          },
          {
            icon: 'audio',
            helper: 'asculta clipul audio'
          },
          {
            icon: 'ex',
            helper: 'rezolva exercitiul'
          },
          {
            icon: 'solve',
            helper: 'vezi solutia'
          },
          {
            icon: 'help',
            helper: 'cere ajutor'
          },
          {
            icon: 'reset',
            helper: 'ia exercitiul de la capat'
          },
          {
            icon: 'play',
            helper: 'asculta cerinta'
          },
          {
            icon: 'pause',
            helper: 'pune pauza cerintei'
          },
          {
            icon: 'stop',
            helper: 'opreste cerinta'
          }
        ]
      }
    }
  }
}
