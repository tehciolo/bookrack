<template>
  <button class="button button--help button--scale" type="button" @click="help.toggle = !help.toggle">
    <span class="wb-help"></span>
  </button>

  <section v-show="help.toggle" class="help">
    <span v-text="help.text"></span>
  </section>
</template>

<script>
  export default {
    props: ['help']
  }
</script>
