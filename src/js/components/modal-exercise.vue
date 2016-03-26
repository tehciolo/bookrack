<template>
  <div class="remodal" data-remodal-id="modal-exercise--{{ index }}" data-remodal-options="hashTracking: false, closeOnOutsideClick: false">
    <button
      @click="closeModalExercise"
      data-remodal-action="close"
      class="remodal-close"
    >
    </button>

    <div class="remodal__exercise">
      <template v-if="item.type === 'typer'">
        <typer
          :ex="item"
          :page-id="pageId"
          :index="index"
        ></typer>
      </template>

      <template v-if="item.type === 'type'">
        <type
          :ex="item"
          :page-id="pageId"
          :index="index"
        ></type>
      </template>
      <!-- <div v-if="selectedPageObject.ex.name == 'bigselect'">
        @@include('./exercise--bigselect.html')
      </div>

      <div v-if="selectedPageObject.ex.name == 'mediumselect'">
        @@include('./exercise--mediumselect.html')
      </div>

      <div v-if="selectedPageObject.ex.name == 'dnd'">
        @@include('./exercise--dnd.html')
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: ['index', 'item', 'pageId'],

    events: {
      'open-modal-exercise': function(index) {
        if (index === this.index) {
          // this.$els.player.play()
        }
      }
    },

    methods: {
      closeModalExercise: function() {
        // this.$els.player.pause()
        // this.$els.player.load()
      }
    }
  }
</script>
