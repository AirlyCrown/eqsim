<script setup lang="ts">
import Menus from "./components/menus/Menus.vue";
import Simgrid from "./components/simulator/Simgrid.vue";
</script>

<template>
  <v-app theme="dark">
    <!-- 左側サイドナビ -->
    <menus />

    <!-- メインコンテンツ -->
    <v-main class="d-flex flex-column" style="height: 100vh">
      <!-- 入力エリア（上半分：スクロール可能） -->
      <div
        class="flex-grow-1 overflow-y-auto pa-4"
        style="background-color: #121212"
      >
        <!-- Routerの設定に基づいてここにコンポーネントが表示されます -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- シミュレーター結果エリア（下部固定） -->
      <simgrid />
    </v-main>
  </v-app>
</template>
<style scoped>
/* 画面切り替え時のふわっとしたアニメーション（任意） */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
