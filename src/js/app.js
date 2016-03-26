var $ = require('jquery');
var Vue = require('vue');
var remodal = require('remodal');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
// Vue.config.debug = true;

// Components
Vue.component('menu', require('./components/menu.vue'));
Vue.component('page', require('./components/page.vue'));
Vue.component('modal-static', require('./components/modal-static.vue'));
// Route components
var book = Vue.extend(require('./components/book.vue'));

// Router = Main Vue Instance
var App = Vue.extend(require('./components/app.vue'));

var router = new VueRouter();
router.map({
  '/pages/*duo': {
    component: book
  }
});
router.start(App, '#app');
