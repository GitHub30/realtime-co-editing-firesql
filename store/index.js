import { vuexfiresqlActions, vuexfiresqlMutations } from 'vuexfiresql'

export const state = () => ({
  collaborators: []
})

export const mutations = {
  update(state, { text, name, color, numOfLines, left }) {
    state.text = text
    const index = state.collaborators
      // eslint-disable-next-line arrow-parens
      .map((c) => `${c.name}/${c.color}`)
      .indexOf(`${name}/${color}`)
    if (index !== -1) {
      state.collaborators.splice(index, 1, { name, color, numOfLines, left })
    } else {
      state.collaborators.push({ name, color, numOfLines, left })
    }
  },
  ...vuexfiresqlMutations
}

export const actions = {
  ...vuexfiresqlActions
}
