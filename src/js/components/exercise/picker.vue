<template>
  <h1
    v-if="ex.title"
    v-text="ex.title"
    class="remodal__title"
  ></h1>

  <div class="exercise exercise--picker">
    <img :src="'./img/' + ex.image + '.jpg'">

    <form class="exercise__container">
      <button class="button button--solve button--scale" type="button" @click="solveCheck">
        <span class="wb-solve"></span>
      </button>

      <button class="button button--reset button--scale" type="reset" @click="resetForm">
        <span class="wb-reset"></span>
      </button>

      <template v-if="ex.audio">
        <custom-audio :audio="ex.audio"></custom-audio>
      </template>

      <template v-if="ex.help">
        <exercise-help :help="ex.help"></exercise-help>
      </template>

      <div
        v-for="row in ex.data"
        :style="'position: absolute; top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width + '; height: ' + row.position.height"
        class="exercise__row"
      >
        <input
          v-model="row.model"
          @click="solutionTrue"
          id="{{ row.identifier }}true"
          class="radio-input picker--{{ pageId }}-{{ index }}"
          type="radio"
          name="{{ row.identifier }}"
          value="true"
        >

        <label
          :style="'top: ' + row.answer.top + ';left: ' + row.answer.left"
          class="labelPicker__answer labelPicker__answer--true"
          for="{{ row.identifier }}true"
        ></label>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['ex', 'pageId', 'index'],

    methods: {
      solutionTrue: function() {
        this.$dispatch('solution-true')
      },

      solveCheck: function() {
        for (var i = 0; i < this.ex.data.length; i++) {
          this.ex.data[i].model = 'true';
        }
      },

      resetForm: function() {
        for (var i = 0; i < this.ex.data.length; i++) {
          this.ex.data[i].model = ''
        }
      }
    }
  }
</script>
