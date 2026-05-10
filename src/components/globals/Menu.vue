<template>
  <v-list>
    <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="item.value"
      :prepend-icon="item.icon"
      :title="item.title"
    />
  </v-list>
</template>

<script setup>
import { useRoute } from 'vue-router'

const drawer = defineModel()
const route = useRoute()

const items = [
  { title: 'ホーム', icon: 'mdi-home', value: '/' },
  { title: '装備構成', icon: 'mdi-shield-outline', value: '/equips' },
  { title: 'キャラクター', icon: 'mdi-account', value: '/charactor' },
  { title: 'その他構成', icon: 'mdi-plus-box-outline', value: '/otherset' },
  { title: 'セーブ/ロード', icon: 'mdi-content-save', value: '/data' },
  { title: '使い方', icon: 'mdi-help-circle-outline', value: '/howtouse' },
]
</script>
