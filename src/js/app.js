var Vue = require('vue');
var VueRouter = require('vue-router');


var siteData = require('./siteData.js');
// var pageData = require('./pageData.js');

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

// Define book component
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

// Main Vue Instance
// var App = new Vue({
//   el: '#app',
//
//   data: {
//     site: siteData()
//   }
// });

// Set up router
var App = Vue.extend({
  data: function() {
    return {
      site: siteData()
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
