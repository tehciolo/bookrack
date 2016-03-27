<template>
  <h1
    v-if="ex.title"
    v-text="ex.title"
    class="remodal__title"
  ></h1>

  <div class="exercise exercise--typer">
    <img :src="'./img/' + ex.image + '.jpg'">

    <form class="exercise__container">
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
        <help :help="ex.help"></help>
      </template>

      <div
        v-for="row in ex.data"
        class="typer__wrapper"
        :style="'top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width"
      >
        <input
          v-if="row.textarea === undefined"
          v-model="row.model"
          @keyup="checkSolution(row.model, row.solution)"
          type="text"
          name="{{ row.identifier }}"
          class="typer__input typer--{{ this.pageId }}-{{ this.index }}"
          maxlength="{{ row.solution.length }}"
        >

        <textarea
          v-if="row.textarea !== undefined"
          v-model="row.model"
          @keyup="checkSolution(row.model, row.solution)"
          name="{{ row.identifier }}"
          class="typer__input typer__textarea typer--{{ this.pageId }}-{{ this.index }}"
          maxlength="{{ row.solution.length }}"
          rows="{{ row.textareaRows }}"
        ></textarea>

        <span v-if="row.model.length === row.solution.length && row.model === row.solution" class="wb-checkmark"></span>

        <span v-if="row.model.length === row.solution.length && row.model !== row.solution" class="wb-cancel"></span>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: ['ex', 'pageId', 'index'],

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
      }
    }
  }
</script>
