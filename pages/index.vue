<template>
  <div class="container">
    <textarea ref="text" v-model="text" class="text" />
    <span ref="hiddenText" class="hiddenText" hidden />
    <div ref="caret" class="caret" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      text:
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
    }
  },
  mounted() {
    document.addEventListener('selectionchange', this.onSelectionChange)
  },
  destroyed() {
    document.removeEventListener('selectionchange', this.onSelectionChange)
  },
  methods: {
    onSelectionChange() {
      const lines = this.text
        .substring(0, this.$refs.text.selectionStart)
        .split('\n')
      const numOfLines = lines.length
      this.$refs.hiddenText.textContent = lines.pop()
      // eslint-disable-next-line no-undef
      const fauxpos = $(this.$refs.hiddenText).outerWidth()
      this.$refs.caret.style.left = fauxpos + 2 + 'px'
      this.$refs.caret.style.top =
        (numOfLines - 1) * 19 + 2 - this.$refs.text.scrollTop + 'px'
      // eslint-disable-next-line no-console
      console.log(numOfLines + '行 ' + fauxpos + ' px')
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  position: relative;
  margin: 64px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.text {
  border: 0;
  width: 100%;
  height: calc(100vh - 64px);
  resize: none;
  outline: none;
}

.caret {
  width: 1px;
  background: orange;
  height: 19px;
  position: absolute;
  top: 1px;
  left: 107px;
}

.hiddenText {
  font-size: 13.3333px;
  font-family: monospace;
}
</style>
