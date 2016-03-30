<template>
  <div class="page{{ this.$route.params.pageId }} single-page">
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
</template>

<script>
  var pages = require('../pages.js');

  export default {
    name: 'Static',

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
        this.$dispatch('close-static', this.$route.params.pageId)
      }
    },

    ready: function() {
      this.$els.player.play()
    }
  }
</script>
