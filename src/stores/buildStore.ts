import { defineStore } from 'pinia'

export const useBuildStore = defineStore('build', {
  state: () => ({
    values: {} as Record<string, any>,
  }),

  actions: {
    setValue(id: string, value: any) {
      this.values[id] = value
    },
  },
})
