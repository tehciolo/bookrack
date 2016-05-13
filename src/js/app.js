var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);
// Vue.config.debug = true;

// Components
Vue.component('menu', require('./components/menu.vue'));
Vue.component('page', require('./components/page.vue'));
Vue.component('exercise-help', require('./components/exercise-help.vue'));
Vue.component('custom-audio', require('./components/custom-audio.vue'));
Vue.component('fabric', require('./components/fabric.vue'));

// Route components
var Cover = Vue.extend(require('./components/cover.vue'));
var Help = Vue.extend(require('./components/help.vue'));
var Book = Vue.extend(require('./components/book.vue'));
var StaticRoute = Vue.extend(require('./components/static.vue'));
var VideoRoute = Vue.extend(require('./components/video.vue'));
  // Exercise components
  var Typer = Vue.extend(require('./components/exercise/typer.vue'));
  var Type = Vue.extend(require('./components/exercise/type.vue'));
  var Checker = Vue.extend(require('./components/exercise/checker.vue'));
  var Picker = Vue.extend(require('./components/exercise/picker.vue'));
  var Painter = Vue.extend(require('./components/exercise/painter.vue'));
  var Linker = Vue.extend(require('./components/exercise/linker.vue'));

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
  },

  '/:pageId/exercise/:id/painter': {
    component: Painter
  },

  '/:pageId/exercise/:id/linker': {
    component: Linker
  }
});

router.start(App, '#app');
