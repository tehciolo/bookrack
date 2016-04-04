<template>
  <section class="book book--static">
    <div class="page{{ this.$route.params.pageId }} single-page single-page--static">
      <button
        @click="closeStatic"
        class="button button--close button--scale"
      >
        <span class="wb-cancel">
      </button>

      <img :src="'./img/' + item.image + '.jpg'">

      <audio
        :src="'./audio/' + item.audio.source + '.mp3'"
        v-el:player
        class="remodal__audio"
        loop
        preload
      ></audio>
    </div>
  </section>
</template>

<script>
  var $ = require('jquery');
  var pages = require('../pages.js');
  var resizeMixin = require('vue-resize-mixin');

  export default {
    name: 'StaticRoute',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

    data: function() {
      return {
        pages: pages()
      }
    },

    computed: {
      item: function() {
        return this.pages[this.$route.params.pageId].static[this.$route.params.id]
      }
    },

    methods: {
      closeStatic: function() {
        this.$els.player.pause()
        this.$els.player.load()
        this.$dispatch('return-to-page', this.$route.params.pageId)
      },

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
      this.$els.player.play()
    }
  }
</script>
