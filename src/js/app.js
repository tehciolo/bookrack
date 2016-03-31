var $ = require('jquery');
var Vue = require('vue');
var remodal = require('remodal');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
Vue.config.debug = true;

// Components
Vue.component('menu', require('./components/menu.vue'));
Vue.component('page', require('./components/page.vue'));
Vue.component('modal-exercise', require('./components/modal-exercise.vue'));
Vue.component('exercise-help', require('./components/exercise-help.vue'));
Vue.component('custom-audio', require('./components/custom-audio.vue'));
// Exercise components
// Vue.component('typer', require('./components/exercise/typer.vue'));
// Vue.component('type', require('./components/exercise/type.vue'));
// Vue.component('checker', require('./components/exercise/checker.vue'));
// Vue.component('picker', require('./components/exercise/picker.vue'));
Vue.component('linker', require('./components/exercise/linker.vue'));
// Route components
var Cover = Vue.extend(require('./components/cover.vue'));
var Help = Vue.extend(require('./components/help.vue'));
var Book = Vue.extend(require('./components/book.vue'));
var StaticRoute = Vue.extend(require('./components/static.vue'));
var VideoRoute = Vue.extend(require('./components/video.vue'));
var Typer = Vue.extend(require('./components/exercise/typer.vue'));
var Type = Vue.extend(require('./components/exercise/type.vue'));
var Checker = Vue.extend(require('./components/exercise/checker.vue'));
var Picker = Vue.extend(require('./components/exercise/picker.vue'));

// Router = Main Vue Instance
var App = Vue.extend(require('./components/app.vue'));

var router = new VueRouter();
router.redirect({
  '*': '/cover'
});
router.map({
  '/cover': {
    component: Cover
  },

  '/:duo': {
    component: Book
  },

  '/help': {
    component: Help
  },

  '/:pageId/static/:id': {
    component: StaticRoute
  },

  '/:pageId/video/:id': {
    component: VideoRoute
  },

  '/:pageId/exercise/:id/typer': {
    component: Typer
  },

  '/:pageId/exercise/:id/type': {
    component: Type
  },

  '/:pageId/exercise/:id/checker': {
    component: Checker
  },

  '/:pageId/exercise/:id/picker': {
    component: Picker
  }
});
router.start(App, '#app');
