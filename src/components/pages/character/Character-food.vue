<template>
  <v-expansion-panel title="クイックフード (最大合計10個)">
    <v-expansion-panel-text>
      <!-- 合計表示チップ -->
      <div class="d-flex align-center mb-4">
        <span class="mr-2 text-body-2">現在の合計数量:</span>
        <v-chip
          :color="store.isFoodOverLimit ? 'error' : 'primary'"
          variant="flat"
        >
          {{ store.foodTotalCount }} / 10
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn size="x-small" variant="outlined" @click="clearFood"
          >リセット</v-btn
        >
      </div>

      <!-- 5行の入力エリア -->
      <v-row
        v-for="(f, index) in store.character.food"
        :key="index"
        align="center"
        dense
        class="mb-2 border-b-sm pb-2"
      >
        <template v-if="f">
          <v-col cols="12" sm="4">
            <v-select
              v-model="f.name"
              :items="['マッタ', 'サッパ', 'シャッキ', 'ガッツ']"
              label="種類"
              density="compact"
              variant="outlined"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" sm="3">
            <v-select
              v-model="f.type"
              :items="['野菜', '果実', '魚介', '肉']"
              label="種別"
              density="compact"
              variant="outlined"
              hide-details
            ></v-select>
          </v-col>

          <v-col cols="12" sm="5" class="d-flex align-center">
            <div class="flex-grow-1 mr-4">
              <v-slider
                v-model="f.count"
                min="0"
                max="10"
                step="1"
                density="compact"
                hide-details
                :color="store.isFoodOverLimit ? 'error' : 'primary'"
                thumb-label
              ></v-slider>
            </div>
            <span class="text-body-2 font-weight-bold" style="width: 20px">
              {{ f.count }}
            </span>
          </v-col>
        </template>
      </v-row>

      <!-- 警告メッセージ -->
      <v-alert
        v-if="store.isFoodOverLimit"
        type="error"
        density="compact"
        variant="tonal"
        class="mt-4"
      >
        合計数量が10個を超えています。調整してください。
      </v-alert>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup>
const clearFood = () => {
  if (!store.character.food) return;
  store.character.food.forEach((f) => {
    if (f) {
      f.name = "";
      f.type = "";
      f.count = 0;
    }
  });
};
</script>
