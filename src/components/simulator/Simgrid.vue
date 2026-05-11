<template>
  <v-sheet height="250" elevation="24" class="pa-4 border-t-sm" color="#1E1E1E">
    <div class="d-flex justify-space-between align-center mb-2">
      <h3 class="text-subtitle-1 font-weight-bold">
        【シミュレーター結果エリア】
      </h3>
      <v-chip color="primary" size="small" label>Auto Calculating...</v-chip>
    </div>

    <!-- ここにPiniaから取得した計算結果を表示するコンポーネントを配置 -->
    <div class="text-body-2 text-grey-lighten-1">
      期待値や倍率がここにリアルタイムで表示されます。
    </div>
  </v-sheet>
</template>
