<template>
  <section class="static">
    <div class="static__inner">
      <h1 v-text="site.pages.help.title" class="static__heading"></h1>

      <p v-for="paragraph in site.pages.help.introParagraphs" v-text="paragraph.text"></p>

      <ul class="static__help">
        <li
          v-for="def in site.pages.help.defs"
        >
          <span class="wb-{{ def.icon }}"></span> {{ def.helper }}
        </li>
      </ul>

      <p v-for="paragraph in site.pages.help.outroParagraphs" v-text="paragraph.text"></p>
    </div>
  </section>
</template>

<script>
  var siteData = require('../siteData.js');

  export default {
    name: 'help',

    data: function() {
      return {
        site: siteData()
      }
    }
  }
</script>
