<template>
  <v-app-bar flat color="grey-darken-4">
    <!-- スマホ用：ハンバーガーアイコン -->
    <v-app-bar-nav-icon class="d-md-none" @click="$emit('toggle-menu')" />

    <!-- Containerを横幅いっぱい使い、中身を横並び(d-flex)に -->
    <v-container fluid class="d-flex align-center py-0">
      <v-avatar class="me-4" color="grey-darken-1" size="32"></v-avatar>

      <!-- 
        PC用メニュー：
        d-none（基本非表示）
        d-md-flex（mdサイズ以上でFlexboxとして表示）
        align-center（縦方向の中央揃え）
      -->
      <div class="d-none d-md-flex align-center">
        <v-btn
          v-for="item in items"
          :key="item.title"
          :to="item.value"
          :prepend-icon="item.icon"
          variant="text"
          width="150"
          class="text-white mx-1.5"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script setup>
const items = [
  { title: 'ホーム', icon: 'mdi-home', value: '/' },
  { title: '装備構成', icon: 'mdi-shield-outline', value: '/equips' },
  { title: 'キャラクター', icon: 'mdi-account', value: '/charactor' },
  { title: 'その他構成', icon: 'mdi-plus-box-outline', value: '/otherset' },
  { title: 'セーブ/ロード', icon: 'mdi-content-save', value: '/data' },
  { title: '使い方', icon: 'mdi-help-circle-outline', value: '/howtouse' },
]
</script>

<style scoped>
/* アクティブなページのボタンを強調する設定 */
.v-btn--active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #42b983 !important; /* Vueっぽい緑にしたり、お好みで */
}
</style>
