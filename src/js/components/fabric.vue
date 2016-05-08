<style scoped>
  .foil {
    position: absolute;
    background-color: white;
  }

  .start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .drawing .start {
    display: none;
  }

  .solve,
  .reset {
    position: absolute;
    font-size: 1rem;
    color: #667D9C;
  }

  .solve {
    left: -1.5rem;
    top: 1rem;
  }

  .reset {
    left: -1.5rem;
    bottom: 1rem;
  }

  .solution {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: none;
  }

  .checking .solution {
    display: block;
  }

  .easel {
    position: absolute;
    background-color: white;
  }

  .color {
    border: 0;
    width: 6%;
    height: 50%;
    margin-right: 5px;
    margin-top: 2.5%;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
</style>

<template>
  <div
    :style="'top: ' + data.position.top + '; left: ' + data.position.left + '; width: ' + data.position.width + '; height: ' + data.position.height"
    :class="{ 'drawing': status, 'checking': solved }"
    v-el:wrapper
    class="foil"
  >
    <div
      v-if="data.colors"
      :style="'top: ' + data.easel.top + '; left: ' + data.easel.left + '; width: ' + data.easel.width + '; height: ' + data.easel.height"
      class="easel"
    >
      <button
        v-for="color in data.colors"
        :style="'background-color: #' + color + ';'"
        @click="setColor(color)"
        type="button"
        class="color"
      >
      </button>
    </div>

    <button
      @click="start"
      v-text="'Start'"
      class="button button--reversed start"
      type="button"
    >
    </button>

    <button class="button button--scale solve" type="button" @click="solve">
      <span class="wb-solve"></span>
    </button>

    <button class="button button--scale reset" type="button" @click="reset">
      <span class="wb-reset"></span>
    </button>

    <canvas
      id="{{ data.identifier }}"
      width="{{ width }}"
      height="{{ height }}"
    ></canvas>

    <img
    :src="'./img/' + data.solution + '.jpg'"
    class="solution"
    >
  </div>
</template>

<script>
  export default {
    props: ['data'],

    data: function() {
      return {
        status: false,
        solved: false,
        width: '',
        height: '',
        canvas: ''
      }
    },

    ready: function() {
      var self = this
      setTimeout(function(){
        var style = window.getComputedStyle(self.$els.wrapper, null)
        self.width = style.width
        self.height = style.height
      }, 100)
    },

    methods: {
      start: function() {
        this.status = !this.status
        this.canvas = new fabric.Canvas(this.data.identifier)
        this.canvas.isDrawingMode = true
        this.canvas.freeDrawingBrush.width = 2
        this.canvas.freeDrawingBrush.color = '#000000'
        this.canvas.freeDrawingCursor = 'url(./img/pencil.png), crosshair'
      },

      setColor: function(color) {
        this.canvas.freeDrawingBrush.color = '#' + color
      },

      reset: function() {
        this.canvas.clear()
      },

      solve: function() {
        this.solved = !this.solved
      }
    }
  }
</script>
