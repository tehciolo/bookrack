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
          <button @click="goBack" v-show="canGoBack" class="button button--menunav button--scale"><span class="wb-arrow-left"></span></button>
        </div>
        <div>
          <span v-show="canGoForward" v-text="site.menu.next"></span>
          <button @click="goForward" v-show="canGoForward" class="button button--menunav button--scale"><span class="wb-arrow-right"></span></button>
        </div>
      </div>
      <div class="navigator">
        <form @submit.prevent="jumpToPage">
          <label class="navigator__label" for="goToPage" v-text="site.menu.jump"></label>
          <input class="navigator__input" id="goToPage" type="text" v-model="page">&#8195;<button class="button button--default" type="submit" v-text="site.menu.search"></button>
        </form>
      </div>
      <div class="info-pages">
        <button @click="tableOfContents" class="button button--block button--default" v-text="site.menu.toc"></button>
        <button @click="help" class="button button--block button--default" v-text="site.menu.help"></button>
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
