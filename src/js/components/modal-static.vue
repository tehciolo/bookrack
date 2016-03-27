<template>
  <div class="remodal page{{ pageId }}" data-remodal-id="modal-static--{{ index }}" data-remodal-options="hashTracking: false, closeOnOutsideClick: false">
    <button
      @click="closeModalStatic"
      data-remodal-action="close"
      class="remodal-close"
    >
    </button>

    <div class="static-asset static-asset--single">
      <img :src="'./img/' + item.image + '.jpg'">
    </div>

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
  export default {
    props: ['index', 'item'],

    events: {
      'open-modal-static': function(index) {
        if (index === this.index) {
          this.$els.player.play()
        }
      }
    },

    methods: {
      closeModalStatic: function() {
        this.$els.player.pause()
        this.$els.player.load()
      }
    }
  }
</script>
