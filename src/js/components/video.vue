<template>
  <div class="page{{ pageId }} single-page single-page--video">
    <button
      @click="closeVideo"
      class="button button--close button--scale"
    >
      <span class="wb-cancel">
    </button>

    <video
      :src="'./video/' + item.video.source + '.mp4'"
      v-el:player
      width="630"
      controls
      preload
    ></video>
  </div>
</template>

<script>
  var pages = require('../pages.js');

  export default {
    name: 'VideoRoute',

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
      }
    }
  }
</script>
