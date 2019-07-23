<template>
  <div class="container">
    <textarea ref="text" v-model="text" class="text fontSize" />
    <span ref="hiddenText" class="hiddenText fontSize" hidden />
    <span ref="name" class="name">たろう</span>
    <div ref="caret" class="caret" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      text: 'あいにできることはまだある会',
      selectionStart: null,
      isComposing: false
    }
  },
  mounted() {
    this.selectionStart = this.$refs.text.selectionStart
    this.$refs.text.addEventListener(
      'compositionstart',
      () => (this.isComposing = true)
    )
    this.$refs.text.addEventListener(
      'compositionend',
      () => (this.isComposing = false)
    )
    requestAnimationFrame(this.onSelectionChange)
  },
  methods: {
    onSelectionChange() {
      requestAnimationFrame(this.onSelectionChange)
      if (this.isComposing) return
      const selectionStart = this.$refs.text.selectionStart
      const selectionChange = selectionStart !== this.selectionStart
      this.selectionStart = selectionStart
      if (!selectionChange) return
      const lines = this.text.substring(0, selectionStart).split('\n')
      const numOfLines = lines.length
      this.$refs.hiddenText.textContent = lines.pop()
      // eslint-disable-next-line no-undef
      const fauxpos = $(this.$refs.hiddenText).outerWidth()
      const caretHeight = 35
      this.$refs.caret.style.left = fauxpos - 1 + 'px'
      this.$refs.caret.style.top =
        (numOfLines - 1) * caretHeight - this.$refs.text.scrollTop + 'px'
      this.$refs.caret.style.height = caretHeight + 'px'
      this.$refs.caret.style.background = 'orange'
      this.$refs.name.style.left = fauxpos - 1 + 'px'
      this.$refs.name.style.top =
        (numOfLines - 1) * caretHeight - 16 - this.$refs.text.scrollTop + 'px'
      this.$refs.name.style.background = 'orange'
      // eslint-disable-next-line no-console
      // console.log(numOfLines + '行 ' + fauxpos + ' px')
      // eslint-disable-next-line no-console
      console.log(selectionChange)
    }
  }
}
</script>

<style>
.container {
  position: relative;
  margin: 64px 64px 0;
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
  padding: 0;
  width: 100%;
  height: calc(100vh - 128px);
  resize: none;
  outline: none;
}

.name {
  position: absolute;
  padding: 0px 4px;
  color: white;
  font-size: 14px;
}

.caret {
  width: 2px;
  position: absolute;
}

.hiddenText {
  font-size: 13.3333px;
  font-family: monospace;
}

.fontSize {
  font-size: 24px;
}
</style>
