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

      <img :src="'./img/' + ex.image + '.jpg'">

      <form class="exercise exercise--picker">
        <div
          v-for="row in ex.data"
          :style="'position: absolute; top: ' + row.position.top + '; left: ' + row.position.left + '; width: ' + row.position.width + '; height: ' + row.position.height"
          class="exercise__row"
        >
          <input
            v-model="row.model"
            @click="solutionTrue"
            id="{{ row.identifier }}true"
            class="radio-input picker--{{ $route.params.pageId }}-{{ $route.params.id }}"
            type="radio"
            name="{{ row.identifier }}"
            value="true"
          >

          <label
            :style="'top: ' + row.answer.top + ';left: ' + row.answer.left + ';
              width: ' + row.answer.width + ';height: ' + row.answer.height"
            class="labelPicker__answer labelPicker__answer--true"
            for="{{ row.identifier }}true"
          ></label>
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
    name: 'Picker',

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
