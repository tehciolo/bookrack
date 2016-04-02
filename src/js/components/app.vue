<script>
  var allowed = require('../allowed.js');
  var info = require('../info.js');

  export default {
    data: function() {
      return {
        allowed: allowed(),
        info: info()
      }
    },

    computed: {
      canGoBack: function() {
        var position = this.allowed.indexOf(this.$route.params.duo);
        if (position === -1) return false
        if (position > 0) {return true} else {return false}
      },

      canGoForward: function() {
        var position = this.allowed.indexOf(this.$route.params.duo);
        if (position === -1) return false
        if (position < this.allowed.length - 1) {return true} else {return false}
      },

      isCover: function() {
        if (this.$route.path === '/cover') return true
        return false
      },

      isDuo: function() {
        if (this.$route.params.duo) return true
        return false
      },

      isExercise: function() {
        if (this.$route.path.indexOf('exercise') > -1) {return true}
        return false
      }
    },

    events: {
      'menu-go-back': function() {
        this.goBack()
      },

      'menu-go-forward': function() {
        this.goForward()
      },

      'jump-to-page': function(page) {
        this.goToPage(page)
      },

      'solution-true': function() {
        this.$els.true.load()
        this.$els.true.play()
      },

      'solution-false': function() {
        this.$els.false.load()
        this.$els.false.play()
      },

      'return-to-page': function(pageNo) {
        this.goToPage(pageNo)
      }
    },

    methods: {
      goBack: function() {
        // get current route
        var current = this.$route.params.duo
        // get position of current route in allowed routes
        var position = this.allowed.indexOf(current)

        if (position > 0) this.$route.router.go(this.allowed[position - 1])
      },

      goForward: function() {
        // get current route
        var current = this.$route.params.duo
        // get position of current route in allowed routes
        var position = this.allowed.indexOf(current)

        if (position < this.allowed.length - 1) this.$route.router.go(this.allowed[position + 1])
      },

      goToPage: function(page) {
        if (isNaN(page)) {
          console.log('Please enter a page number.')
          return false
        }

        var destination = parseInt(page)
        var minPage = this.info.minPage
        var maxPage = this.info.maxPage

        if (destination < minPage || destination > maxPage) {
          console.log('Oops! No such page.')
          return false
        } else {
          var needle = destination;

          if (needle < 10) {
            needle = '0' + needle.toString()
          } else {
            needle = needle.toString()
          }

          for (var i = 0; i < this.allowed.length; i++) {
            if (this.allowed[i].indexOf(needle) > -1) {
              this.$route.router.go('/' + this.allowed[i])
            }
          }
        }
      }
    }
  }
</script>
