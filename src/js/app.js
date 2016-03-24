var $ = require('jquery');
var Vue = require('vue');
var remodal = require('remodal');
var VueRouter = require('vue-router');


var siteData = require('./siteData.js');
var allowed = require('./allowed.js');
var info = require('./info.js');
var pages = require('./pages.js');

Vue.use(VueRouter);
//Vue.config.debug = true;



// Define menu component
Vue.component('menu', {
  props: ['canGoBack', 'canGoForward', 'minPage', 'maxPage'],

  template: '#menu-template',

  data: function() {
    return {
      site: siteData(),
      page: ''
    }
  },

  methods: {
    goBack: function() {
      this.$dispatch('menu-go-back')
    },

    goForward: function() {
      this.$dispatch('menu-go-forward')
    },

    jumpToPage: function() {
      this.$dispatch('jump-to-page', this.page)
    }
  }
});

// Define book component (can be assigned to route)
var book = Vue.extend({
  name: 'book',

  template: '#book-template',

  props: ['duo'],

  computed: {
    left: function() {
      var playdoh = this.duo;
      playdoh = playdoh.split('-');
      return playdoh[0];
    },

    right: function() {
      var playdoh = this.duo;
      playdoh = playdoh.split('-');
      return playdoh[1];
    }
  },

  data: function() {
    return {
      pages: pages()
    }
  }
});

// Define page component
Vue.component('page', {
  template: '#page-template',

  props: ['data', 'type', 'id'],

  computed: {
    hasStatic: function() {
      if (this.data !== undefined) {
        if ("static" in this.data) {
          return true
        } else {
          return false
        }
      }
      return false
    }
  },

  methods: {
    openModalStatic: function(index) {
      this.$broadcast('open-modal-static', index)
    }
  }
});

// Define static modal component
Vue.component('modal-static', {
  template: '#modal-static-template',

  props: ['index', 'item'],

  events: {
    'open-modal-static': function(index) {
      if (index === this.index) {
        this.$els.player.play()
      }
    }
  },

  methods: {
    closeModalStatic: function() {
      this.$els.player.pause()
      this.$els.player.load()
    }
  }
});

// Set up router
var App = Vue.extend({
  data: function() {
    return {
      allowed: allowed(),
      info: info()
    }
  },

  computed: {
    canGoBack: function() {
      var position = this.allowed.indexOf(this.$route.params.duo);
      if (position > 0) {return true} else {return false}
    },

    canGoForward: function() {
      var position = this.allowed.indexOf(this.$route.params.duo);
      if (position < this.allowed.length - 1) {return true} else {return false}
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
    }
  },

  methods: {
    goBack: function() {
      // get current route
      var current = this.$route.params.duo
      // get position of current route in allowed routes
      var position = this.allowed.indexOf(current)

      if (position > 0) router.go(this.allowed[position - 1])
    },

    goForward: function() {
      // get current route
      var current = this.$route.params.duo
      // get position of current route in allowed routes
      var position = this.allowed.indexOf(current)

      if (position < this.allowed.length - 1) router.go(this.allowed[position + 1])
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
            router.go(this.allowed[i])
          }
        }
      }
    }
  }
});
var router = new VueRouter();
router.map({
  '/pages/*duo': {
    component: book
  }
});
router.start(App, '#app');
