<template>
  <!-- 
    app: レイアウトの一部として認識させる
    v-model: 開閉状態を同期 
  -->
  <!-- 左側サイドナビ -->
  <v-navigation-drawer v-model="drawer" permanent width="250">
    <!-- タイトル部分 -->
    <v-list-item class="pa-4">
      <v-list-item-title class="text-h6 font-weight-bold">
        シミュレーター
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav density="compact">
      <!-- ■ 装備選択 -->
      <v-list-subheader class="font-weight-black text-white"
        >■ 装備選択</v-list-subheader
      >
      <v-list-item prepend-icon="mdi-sword" title="武器" to="/weapons" />
      <v-list-item prepend-icon="mdi-shield-outline" title="防具" to="/units" />
      <v-list-item prepend-icon="mdi-ring" title="リング" to="/rings" />

      <!-- ■ キャラクター -->
      <v-list-subheader class="mt-4 font-weight-black text-white"
        >■ キャラクター</v-list-subheader
      >
      <v-list-item
        prepend-icon="mdi-account-settings"
        title="クラス・設定"
        to="/character"
      />

      <!-- ■ セーブデータ -->
      <v-list-subheader class="mt-4 font-weight-black text-white"
        >■ セーブデータ</v-list-subheader
      >
      <v-list-item
        prepend-icon="mdi-content-save-cog"
        title="セーブ＆ロード"
        to="/data"
      />

      <!-- その他 -->
      <v-divider class="my-2"></v-divider>
      <v-list-item
        prepend-icon="mdi-help-circle-outline"
        title="使い方"
        to="/howtouse"
      />
    </v-list>
  </v-navigation-drawer>
  <!-- スマホ時に表示するハンバーガーボタン（通常は v-app-bar 内に置きます） -->
  <v-app-bar scroll-behavior="elevate" flat>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>アプリ名</v-app-bar-title>
  </v-app-bar>
</template>
<script setup lang="ts">
import { ref } from "vue";

// メニューの開閉状態（初期値は true でも、スマホ幅なら Vuetify が自動で隠してくれます）
const drawer = ref(true);
</script>
