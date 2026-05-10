<template>
  <v-app theme="dark">
    <!-- 左側サイドナビ -->
    <v-navigation-drawer permanent width="250">
      <!-- タイトル部分 -->
      <v-list-item class="pa-4">
        <v-list-item-title class="text-h6 font-weight-bold"> シミュレーター </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav density="compact">
        <!-- ■ 装備選択 -->
        <v-list-subheader class="font-weight-black text-white">■ 装備選択</v-list-subheader>
        <v-list-item prepend-icon="mdi-sword" title="武器" to="/weapons" />
        <v-list-item prepend-icon="mdi-shield-outline" title="防具" to="/units" />
        <v-list-item prepend-icon="mdi-ring" title="リング" to="/rings" />

        <!-- ■ キャラクター -->
        <v-list-subheader class="mt-4 font-weight-black text-white"
          >■ キャラクター</v-list-subheader
        >
        <v-list-item prepend-icon="mdi-account-settings" title="クラス・設定" to="/character" />

        <!-- ■ セーブデータ -->
        <v-list-subheader class="mt-4 font-weight-black text-white"
          >■ セーブデータ</v-list-subheader
        >
        <v-list-item prepend-icon="mdi-content-save-cog" title="セーブ＆ロード" to="/data" />

        <!-- その他 -->
        <v-divider class="my-2"></v-divider>
        <v-list-item prepend-icon="mdi-help-circle-outline" title="使い方" to="/howtouse" />
      </v-list>
    </v-navigation-drawer>

    <!-- メインコンテンツ -->
    <v-main class="d-flex flex-column" style="height: 100vh">
      <!-- 入力エリア（上半分：スクロール可能） -->
      <div class="flex-grow-1 overflow-y-auto pa-4" style="background-color: #121212">
        <!-- Routerの設定に基づいてここにコンポーネントが表示されます -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>

      <!-- シミュレーター結果エリア（下部固定） -->
      <v-sheet height="250" elevation="24" class="pa-4 border-t-sm" color="#1E1E1E">
        <div class="d-flex justify-space-between align-center mb-2">
          <h3 class="text-subtitle-1 font-weight-bold">【シミュレーター結果エリア】</h3>
          <v-chip color="primary" size="small" label>Auto Calculating...</v-chip>
        </div>

        <!-- ここにPiniaから取得した計算結果を表示するコンポーネントを配置 -->
        <div class="text-body-2 text-grey-lighten-1">
          期待値や倍率がここにリアルタイムで表示されます。
        </div>
      </v-sheet>
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
