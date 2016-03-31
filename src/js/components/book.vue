<template>
  <section class="book">
    <page type="left" :id="left" :data="pages[left]"></page>
    <page type="right" :id="right" :data="pages[right]"></page>
  </section>
</template>

<script>
  var pages = require('../pages.js');

  export default {
    name: 'Book',

    computed: {
      left: function() {
        var playdoh = this.$route.params.duo;
        playdoh = playdoh.split('-');
        return playdoh[0];
      },

      right: function() {
        var playdoh = this.$route.params.duo;
        playdoh = playdoh.split('-');
        return playdoh[1];
      }
    },

    data: function() {
      return {
        pages: pages()
      }
    }
  }
</script>
