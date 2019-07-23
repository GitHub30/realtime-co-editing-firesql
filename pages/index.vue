<template>
  <div class="container">
    <textarea ref="textarea" :value="$store.state.text" class="text fontSize" />
    <span ref="hiddenText" class="hiddenText fontSize" hidden />
    <span
      v-for="(c, i) in $store.state.collaborators"
      :key="i"
      ref="name"
      :style="{
        left: c.left - 1 + 'px',
        top:
          (c.numOfLines - 1) * caretHeight -
          16 -
          $refs.textarea.scrollTop +
          'px',
        backgroundColor: c.color
      }"
      class="name"
      :hidden="c.name === name"
    >{{ name }}</span><!-- eslint-disable-line prettier/prettier -->
    <div
      v-for="(c, i) in $store.state.collaborators"
      :key="10000 + i"
      ref="caret"
      :style="{
        left: c.left - 1 + 'px',
        top: (c.numOfLines - 1) * caretHeight - $refs.textarea.scrollTop + 'px',
        height: caretHeight + 'px',
        backgroundColor: c.color
      }"
      class="caret"
      :hidden="c.name === name"
    />
  </div>
</template>

<script>
const collaborators = [
  { name: '日本太郎', color: 'blue' },
  { name: '坂本龍馬', color: 'brown' },
  { name: '聖徳太子', color: 'orange' },
  { name: '織田信長', color: 'green' },
  { name: '豊臣秀吉', color: 'purple' }
]

function choose(choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

export default {
  components: {},
  data() {
    const collaborator = choose(collaborators)
    return {
      val: '',
      name: collaborator.name,
      color: collaborator.color,
      selectionStart: null,
      isComposing: false,
      caretHeight: 35
    }
  },
  async mounted() {
    await this.$db.query(
      `CREATE TABLE IF NOT EXISTS co_editor (id INT NOT NULL AUTO_INCREMENT,json JSON NULL,PRIMARY KEY (id))`
    )
    this.$store.dispatch('SYNC_STATE', {
      table: 'co_editor',
      pkColumnName: 'id',
      pk: 1,
      jsonColumnName: 'json'
    })
    // eslint-disable-next-line no-console
    console.log(
      this.$refs.textarea,
      document.querySelector('#text2'),
      process.browser
    )
    this.selectionStart = this.$refs.textarea.selectionStart
    this.$refs.textarea.addEventListener(
      'compositionstart',
      () => (this.isComposing = true)
    )
    this.$refs.textarea.addEventListener(
      'compositionend',
      () => (this.isComposing = false)
    )
    requestAnimationFrame(this.onSelectionChange)
  },
  methods: {
    onSelectionChange() {
      requestAnimationFrame(this.onSelectionChange)
      if (this.isComposing) return
      const selectionStart = this.$refs.textarea.selectionStart
      const selectionChange = selectionStart !== this.selectionStart
      this.selectionStart = selectionStart
      if (!selectionChange) return
      const value = this.$refs.textarea.value
      if (value.length === selectionStart && value.includes('\n')) return
      const lines = value.substring(0, selectionStart).split('\n')
      const numOfLines = lines.length
      this.$refs.hiddenText.textContent = lines.pop()
      // eslint-disable-next-line no-undef
      const left = $(this.$refs.hiddenText).outerWidth()
      this.$store.commit('update', {
        text: value,
        name: this.name,
        color: this.color,
        numOfLines,
        left
      })
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
