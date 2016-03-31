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

        <button class="button button--solve button--scale" type="button" @click="solveForm">
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

      <div class="exercise exercise--typer">
        <img :src="'./img/' + ex.image + '.jpg'">

        <form class="exercise__container">
          <div
            v-for="row in ex.data"
            class="typer__wrapper"
            :style="'top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width + '; height: ' + row.position.height"
          >
            <input
              v-model="row.model"
              :class="['typer--' + $route.params.pageId + '-' + $route.params.id, {
                correct: row.model.length == row.solution.length && row.model.toLowerCase() == row.solution,
                incorrect: row.model.length == row.solution.length && row.model.toLowerCase() != row.solution
              }]"
              @keyup="checkSolution(row.model, row.solution)"
              type="text"
              name="{{ row.identifier }}"
              class="typer__input"
              maxlength="{{ row.solution.length }}"
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  var pages = require('../../pages.js');

  export default {
    name: 'Type',

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
      checkSolution: function(model, solution) {
        if (model.length === solution.length && model === solution) {
          this.$dispatch('solution-true')
        }
        if (model.length === solution.length && model !== solution) {
          this.$dispatch('solution-false')
        }
      },

      solveForm: function() {
        for (var i = 0; i < this.ex.data.length; i++) {
          this.ex.data[i].model = this.ex.data[i].solution;
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
