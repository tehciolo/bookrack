var Vue = require('vue');
var VueRouter = require('vue-router');


var siteData = require('./siteData.js');
var allowed = require('./allowed.js');

Vue.use(VueRouter);
//Vue.config.debug = true;



// Define menu component
Vue.component('menu', {
  //props: ['data'],

  template: '#menu-template',

  data: function() {
    return {
      site: siteData()
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

    }
  }
});

// Define page component
Vue.component('page', {
  template: '#page-template',

  props: ['data', 'type', 'src']
});

// Set up router
var App = Vue.extend({
  data: function() {
    return {
      site: siteData(),
      allowed: allowed()
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

  methods: {
    goBack: function() {
      // get current route
      var current = this.$route.params.duo;
      // get position of current route in allowed routes
      var position = this.allowed.indexOf(current);

      if (position > 0) router.go(this.allowed[position - 1]);
    },

    goForward: function() {
      // get current route
      var current = this.$route.params.duo;
      // get position of current route in allowed routes
      var position = this.allowed.indexOf(current);

      if (position < this.allowed.length - 1) router.go(this.allowed[position + 1]);
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
