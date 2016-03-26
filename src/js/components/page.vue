<template>
  <div class="{{ type }}-page">
    <img v-bind:src="'./img/' + id + '.jpg'">

    <div class="{{ type }}-page__content">
      <template v-if="hasStatic">
        <a
          v-for="item in data.static"
          data-remodal-target="modal-static--{{ $index }}"
          @click="openModalStatic($index)"
        >
          <button :style="'top: ' + item.trigger.button.top" class="button button--scale button--animated button--trigger" type="button"><span class="wb-static"></span></button>

          <div
            :style="'top: ' + item.trigger.zone.top + '; right: ' + item.trigger.zone.right + '; bottom: ' + item.trigger.zone.bottom + '; left: ' + item.trigger.zone.left + '; width: ' + item.trigger.zone.width"
            class="{{ type }}-page__actionable"
          ></div>
        </a>
      </template>
    </div>
    <template v-if="hasStatic">
      <template v-for="item in data.static">
        <modal-static
          :index="$index"
          :item="item"
        ></modal-static>
      </template>
    </template>
  </div>
</template>

<script>
  export default {
    props: ['data', 'type', 'id'],

    computed: {
      hasStatic: function() {
        if (this.data !== undefined) {
          if ("static" in this.data) {
            return true
          } else {
            return false
          }
        }
        return false
      }
    },

    methods: {
      openModalStatic: function(index) {
        this.$broadcast('open-modal-static', index)
      }
    }
  }
</script>
