<template>
  <section class="book">
    <div class="cover-page">
      <a v-link="{ path: start }">
        <img v-bind:src="'./img/cover.jpg'">
      </a>
  </section>
</template>

<script>
  var allowed = require('../allowed.js');

  export default {
    name: 'cover',

    data: function() {
      return {
        start: allowed()[0]
      }
    }
  }
</script>
