var $ = require('jquery');
var Vue = require('vue');
var remodal = require('remodal');
var VueRouter = require('vue-router');
var jsPlumb = require('jsplumb');

Vue.use(VueRouter);
// Vue.config.debug = true;

// Components
Vue.component('menu', require('./components/menu.vue'));
Vue.component('page', require('./components/page.vue'));
Vue.component('modal-static', require('./components/modal-static.vue'));
Vue.component('modal-video', require('./components/modal-video.vue'));
Vue.component('modal-exercise', require('./components/modal-exercise.vue'));
Vue.component('exercise-help', require('./components/exercise-help.vue'));
Vue.component('custom-audio', require('./components/custom-audio.vue'));
// Exercise components
Vue.component('typer', require('./components/exercise/typer.vue'));
Vue.component('type', require('./components/exercise/type.vue'));
Vue.component('checker', require('./components/exercise/checker.vue'));
Vue.component('picker', require('./components/exercise/picker.vue'));
Vue.component('linker', require('./components/exercise/linker.vue'));
// Route components
var book = Vue.extend(require('./components/book.vue'));
var cover = Vue.extend(require('./components/cover.vue'));
var help = Vue.extend(require('./components/help.vue'));

// Router = Main Vue Instance
var App = Vue.extend(require('./components/app.vue'));

var router = new VueRouter();
router.redirect({
  '*': '/cover'
});
router.map({
  '/cover': {
    component: cover
  },

  '/:duo': {
    component: book
  },

  '/help': {
    component: help
  }
});
router.start(App, '#app');
