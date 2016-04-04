<template>
  <section class="book book--help">
    <div class="single-page single-page--help">
      <h1 v-text="site.pages.help.title" class="static__heading"></h1>

      <p v-for="paragraph in site.pages.help.introParagraphs" v-text="paragraph.text"></p>

      <ul class="static__help">
        <li
          v-for="def in site.pages.help.defs"
        >
          <span class="wb-{{ def.icon }}"></span> {{ def.helper }}
        </li>
      </ul>

      <p v-for="paragraph in site.pages.help.outroParagraphs" v-text="paragraph.text"></p>
  </section>
</template>

<script>
  var $ = require('jquery');
  var siteData = require('../siteData.js');
  var resizeMixin = require('vue-resize-mixin');


  export default {
    name: 'Help',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

    data: function() {
      return {
        site: siteData()
      }
    },

    methods: {
      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 100/100;
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
