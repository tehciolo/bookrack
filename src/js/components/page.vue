<template>
  <div class="page{{ id }} {{ type }}-page">
    <img :src="'./img/' + id + '.jpg'">

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
          <button :style="'top: ' + item.trigger.button.top" class="button button--scale button--animated button--trigger" type="button"><span class="wb-video"></span></button>

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
    }
  }
</script>
