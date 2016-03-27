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
Vue.component('modal-video', require('./components/modal-video.vue'));
Vue.component('modal-exercise', require('./components/modal-exercise.vue'));
Vue.component('help', require('./components/help.vue'));
Vue.component('custom-audio', require('./components/custom-audio.vue'));
// Exercise components
Vue.component('typer', require('./components/exercise/typer.vue'));
Vue.component('type', require('./components/exercise/type.vue'));
Vue.component('checker', require('./components/exercise/checker.vue'));
Vue.component('picker', require('./components/exercise/picker.vue'));
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
