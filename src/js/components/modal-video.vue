<template>
  <div class="remodal page{{ pageId }}" data-remodal-id="modal-video--{{ index }}" data-remodal-options="hashTracking: false, closeOnOutsideClick: false">
    <button
      @click="closeModal"
      data-remodal-action="close"
      class="remodal-close"
    >
    </button>

    <div class="remodal__video">
      <video
        :src="'./video/' + item.video.source + '.mp4'"
        v-el:player
        width="630"
        controls
        preload
      ></video>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['index', 'item', 'pageId'],

    methods: {
      closeModal: function() {
        this.$els.player.pause()
        this.$els.player.load()
      }
    }
  }
</script>
