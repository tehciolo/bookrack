<template>
  <section class="book book--video">
    <div class="page{{ $route.params.pageId }} single-page single-page--video">
      <button
        @click="closeVideo"
        class="button button--close button--scale"
      >
        <span class="wb-cancel">
      </button>

      <video
        :src="'./video/' + item.video.source + '.mp4'"
        v-el:player
        width="100%"
        controls
        preload
      ></video>
    </div>
  </section>
</template>

<script>
  var $ = require('jquery');
  var pages = require('../pages.js');
  var resizeMixin = require('vue-resize-mixin');

  export default {
    name: 'VideoRoute',

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
        return this.pages[this.$route.params.pageId].video[this.$route.params.id]
      }
    },

    methods: {
      closeVideo: function() {
        this.$els.player.pause()
        this.$els.player.load()
        this.$dispatch('return-to-page', this.$route.params.pageId)
      },

      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 172/100;
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
