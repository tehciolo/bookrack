<template>
  <section class="main-menu">
    <input type="checkbox" id="js--main-menu__toggle">

    <label for="js--main-menu__toggle">
      <span>m<br>e<br>n<br>i<br>u</span><br>&nbsp;
      <span class="wb-chevron-right"></span>
    </label>

    <div class="main-menu__content">
      <div class="page-buttons">
        <div>
          <span v-show="! canGoBack">&nbsp;</span>
          <span v-show="canGoBack" v-text="site.menu.prev"></span>
          <button @click="goBack" v-show="canGoBack" class="button button--menunav button--scale" type="button"><span class="wb-arrow-left"></span></button>
        </div>
        <div>
          <span v-show="canGoForward" v-text="site.menu.next"></span>
          <button @click="goForward" v-show="canGoForward" class="button button--menunav button--scale" type="button"><span class="wb-arrow-right"></span></button>
        </div>
      </div>
      <div class="navigator">
        <form @submit.prevent="jumpToPage">
          <label v-text="site.menu.jump" class="navigator__label" for="goToPage"></label>
          <input v-model="page" id="goToPage" class="navigator__input" type="text" >&#8195;<button v-text="site.menu.search" class="button button--default" type="submit"></button>
        </form>
      </div>
      <div class="info-pages">
        <button @click="tableOfContents" v-text="site.menu.toc" class="button button--block button--default"  type="button"></button>
        <button @click="help" v-text="site.menu.help" class="button button--block button--default" type="button"></button>
      </div>
    </div>
  </section>
</template>

<script>
  var siteData = require('../siteData.js');

  export default {
    props: ['canGoBack', 'canGoForward', 'minPage', 'maxPage'],

    data: function() {
      return {
        site: siteData(),
        page: ''
      }
    },

    methods: {
      goBack: function() {
        this.$dispatch('menu-go-back')
      },

      goForward: function() {
        this.$dispatch('menu-go-forward')
      },

      jumpToPage: function() {
        this.$dispatch('jump-to-page', this.page)
        this.page = ''
      },

      tableOfContents: function() {
        this.$route.router.go('/04-05')
      },

      help: function() {
        this.$route.router.go('/help')
      }
    }
  }
</script>
