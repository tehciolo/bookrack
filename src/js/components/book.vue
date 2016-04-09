<template>
  <section class="book">
    <page type="left" :id="left" :data="pages[left]"></page>
    <page type="right" :id="right" :data="pages[right]"></page>
  </section>
</template>

<script>
  var $ = require('jquery');
  var pages = require('../../../../data/pages.js');
  var resizeMixin = require('vue-resize-mixin');

  export default {
    name: 'Book',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

    computed: {
      left: function() {
        var playdoh = this.$route.params.duo;
        playdoh = playdoh.split('-');
        return playdoh[0];
      },

      right: function() {
        var playdoh = this.$route.params.duo;
        playdoh = playdoh.split('-');
        return playdoh[1];
      }
    },

    data: function() {
      return {
        pages: pages()
      }
    },

    methods: {
      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 157/100;
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
