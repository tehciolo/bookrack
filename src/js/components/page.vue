<template>
  <div class="page{{ id }} {{ type }}-page">
    <img v-bind:src="'./img/' + id + '.jpg'">

    <div class="{{ type }}-page__content">
      <template v-if="hasStatic">
        <a
          v-for="item in data.static"
          v-link="{ path: '/' + id + '/static/' + $index }"
        >
          <button :style="'top: ' + item.trigger.button.top" class="button button--scale button--animated button--trigger" type="button"><span class="wb-static"></span></button>

          <div
            :style="'top: ' + item.trigger.zone.top + '; right: ' + item.trigger.zone.right + '; bottom: ' + item.trigger.zone.bottom + '; left: ' + item.trigger.zone.left + '; width: ' + item.trigger.zone.width"
            class="{{ type }}-page__actionable"
          ></div>
        </a>
      </template>

      <template v-if="hasVideo">
        <a
          v-for="item in data.video"
          v-link="{ path: '/' + id + '/video/' + $index }"
        >
          <button :style="'top: ' + item.trigger.button.top" class="button button--scale button--animated button--trigger" type="button"><span class="wb-audio"></span></button>

          <div
            :style="'top: ' + item.trigger.zone.top + '; right: ' + item.trigger.zone.right + '; bottom: ' + item.trigger.zone.bottom + '; left: ' + item.trigger.zone.left + '; width: ' + item.trigger.zone.width"
            class="{{ type }}-page__actionable"
          ></div>
        </a>
      </template>

      <template v-if="hasExercise">
        <a
          v-for="item in data.exercise"
          v-link="{ path: '/' + id + '/exercise/' + $index + '/' + item.type }"
        >
          <button :style="'top: ' + item.trigger.button.top" class="button button--scale button--animated button--trigger" type="button"><span class="wb-ex"></span></button>

          <div
            :style="'top: ' + item.trigger.zone.top + '; right: ' + item.trigger.zone.right + '; bottom: ' + item.trigger.zone.bottom + '; left: ' + item.trigger.zone.left + '; width: ' + item.trigger.zone.width"
            class="{{ type }}-page__actionable"
          ></div>
        </a>
      </template>
    </div>

    <!-- <template v-if="hasStatic">
      <template v-for="item in data.static">
        <modal-static
          :index="$index"
          :item="item"
          :page-id="id"
        ></modal-static>
      </template>
    </template>

    <template v-if="hasVideo">
      <template v-for="item in data.video">
        <modal-video
          :index="$index"
          :item="item"
          :page-id="id"
        ></modal-video>
      </template>
    </template> -->

    <!-- <template v-if="hasExercise">
      <template v-for="item in data.exercise">
        <modal-exercise
          :index="$index"
          :item="item"
          :page-id="id"
        ></modal-exercise>
      </template>
    </template> -->
  </div>
</template>

<script>
  export default {
    props: ['data', 'type', 'id'],

    computed: {
      hasStatic: function() {
        if (this.data !== undefined) {
          if ('static' in this.data) {return true}
        }
        return false
      },
      hasVideo: function() {
        if (this.data !== undefined) {
          if ('video' in this.data) {return true}
        }
        return false
      },
      hasExercise: function() {
        if (this.data !== undefined) {
          if ('exercise' in this.data) {return true}
        }
        return false
      }
    },

    methods: {
      openModalExercise: function(index) {
        this.$broadcast('open-modal-exercise', index)
      }
    }
  }
</script>
