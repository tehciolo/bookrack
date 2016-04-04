<template>
  <section class="book book--cover">
    <div class="cover-page">
      <a v-link="{ path: start }">
        <img :src="'./img/cover.jpg'">
      </a>
  </section>
</template>

<script>
  var $ = require('jquery');
  var allowed = require('../allowed.js');
  var resizeMixin = require('vue-resize-mixin');

  export default {
    name: 'Cover',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

    data: function() {
      return {
        start: allowed()[0]
      }
    },

    methods: {
      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 79/100;
        var w = scaled.outerWidth();
        var h = scaled.outerHeight();

        if (w > ratio*h) {
          scaled.width(ratio*h);
        } else if (h > w/ratio) {
          var newHeight = w/ratio;
          scaled.height(newHeight);
          // for vertical centering
          scaled.css({marginTop: ($("body").height()-newHeight)/2 - 20});
        }
      }
    },

    ready: function() {
      this.onResize()
    }
  }
</script>
