<template>
  <button
    v-if="audio.state === 'playing' || audio.state === 'paused'"
    @click="stop"
    class="button button--stop button--scale"
    type="button"
  >
    <span class="wb-stop"></span>
  </button>

  <button
    v-if="audio.state === 'playing'"
    @click="pause"
    class="button button--pause button--scale"
    type="button"
  >
    <span class="wb-pause"></span>
  </button>

  <button
    v-if="audio.state === 'stopped' || audio.state === 'paused'"
    @click="play"
    class="button button--play button--scale"
    type="button"
  >
    <span class="wb-play"></span>
  </button>

  <audio
    :src="'./audio/' + audio.source + '.mp3'"
    v-el:player
    class="remodal__audio"
    preload
  ></audio>
</template>

<script>
  export default {
    props: ['audio'],

    methods: {
      play: function() {
        this.$els.player.play()
        this.audio.state = 'playing'
      },

      pause: function() {
        this.$els.player.pause()
        this.audio.state = 'paused'
      },

      stop: function() {
        this.$els.player.pause()
        this.$els.player.load()
        this.audio.state = 'stopped'
      }
    }
  }
</script>
