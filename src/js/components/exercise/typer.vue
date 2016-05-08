<template>
  <section class="book book--exercise">
    <div class="page{{ this.$route.params.pageId }} single-page single-page--exercise">
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

      <img :src="'./img/' + ex.image + '.jpg'">

      <form class="exercise exercise--typer">
        <div
          v-for="row in ex.data"
          class="typer__wrapper exercise__row"
          :style="'top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width"
        >
          <input
            v-if="row.textarea === undefined"
            v-model="row.model"
            @keyup="checkSolution(row.model, row.solution)"
            type="text"
            name="{{ row.identifier }}"
            class="typer__input typer--{{ $route.params.pageId }}-{{ $route.params.id }}"
            maxlength="{{ row.solution.length }}"
            autocomplete="off"
          >

          <textarea
            v-if="row.textarea !== undefined"
            v-model="row.model"
            @keyup="checkSolution(row.model, row.solution)"
            name="{{ row.identifier }}"
            class="typer__input typer__textarea typer--{{ $route.params.pageId }}-{{ $route.params.id }}"
            maxlength="{{ row.solution.length }}"
            rows="{{ row.textareaRows }}"
            autocomplete="off"
          ></textarea>

          <span v-if="row.model.length === row.solution.length && row.model === row.solution" class="wb-checkmark"></span>

          <span v-if="row.model.length === row.solution.length && row.model !== row.solution" class="wb-cancel"></span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
  var $ = require('jquery');
  var pages = require('../../../../../data/pages.js');
  var resizeMixin = require('vue-resize-mixin');

  export default {
    name: 'Typer',

    mixins: [resizeMixin],

    events: {
      'resize': 'onResize'
    },

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
      },

      onResize: function() {
        var scaled = $(".wrapper");
        scaled.css({ 'height': '100%', 'width': '100%' });
        var ratio = 79/100;
        var w = scaled.outerWidth();
        var h = scaled.outerHeight();

        if (w > ratio*h) {
          scaled.width(ratio*h);
        } else if (h > w/ratio) {
          var newHeight = w/ratio;
          scaled.height(newHeight);
          // for vertical centering
          scaled.css({marginTop: ($("body").height()-newHeight)/2 - 20});
        }
      }
    },

    ready: function() {
      this.onResize()
    }
  }
</script>
