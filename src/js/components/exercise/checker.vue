<template>
  <div class="exercise__ratio">
    <div class="exercise__position">
      <h1
        v-if="ex.title"
        v-text="ex.title"
      ></h1>

      <div class="exercise__controls">
        <button
          @click="closeExercise"
          class="button button--close button--scale"
        >
          <span class="wb-cancel">
        </button>

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
      </div>

      <div class="exercise exercise--checker">
        <img :src="'./img/' + ex.image + '.jpg'">

        <form class="exercise__container">
          <div
            v-for="row in ex.data"
            :style="'position: absolute; top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width + '; height: ' + row.position.height"
            class="exercise__row"
          >
            <input
              v-model="row.model"
              @click="solutionTrue"
              id="{{ row.identifier }}true"
              class="radio-input checker--{{ $route.params.pageId }}-{{ $route.params.id }}"
              type="radio"
              name="{{ row.identifier }}"
              value="true"
            >

            <label
              :style="'top: ' + row.answerTrue.top + ';left: ' + row.answerTrue.left"
              class="labelChecker__answer labelChecker__answer--true"
              for="{{ row.identifier }}true"
            ></label>

            <input
              id="{{ row.identifier }}false"
              v-model="row.model"
              @click="solutionFalse"
              class="radio-input checker--{{ $route.params.pageId }}-{{ $route.params.id }}"
              type="radio"
              name="{{ row.identifier }}"
              value="false"
            >

            <label
              :style="'top: ' + row.answerFalse.top + ';left: ' + row.answerFalse.left"
              class="labelChecker__answer labelChecker__answer--false"
              for="{{ row.identifier }}false"
            ></label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  var pages = require('../../pages.js');

  export default {
    name: 'Checker',

    data: function() {
      return {
        pages: pages()
      }
    },

    computed: {
      ex: function() {
        return this.pages[this.$route.params.pageId].exercise[this.$route.params.id]
      }
    },

    methods: {
      solutionTrue: function() {
        this.$dispatch('solution-true')
      },

      solutionFalse: function() {
        this.$dispatch('solution-false')
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
      },

      closeExercise: function() {
        this.$dispatch('return-to-page', this.$route.params.pageId)
      }
    }
  }
</script>
