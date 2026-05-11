<template>
  <v-container fluid>
    <!-- 全体を一つのカードでまとめる -->
    <v-card border elevation="0" class="pa-4">
      <v-card-title class="text-h5 mb-4">キャラクター設定</v-card-title>

      <v-row>
        <!-- ① クラス設定 (ドロップダウン) -->
        <v-col cols="12" md="2">
          <v-autocomplete
            v-model="store.character.mainClass"
            label="メインクラス"
            :items="store.classList"
            variant="outlined"
            density="compact"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-expansion-panels variant="accordion">
            <!-- ② EXスタイル (展開カード) -->
            <CharacterExstyle />

            <!-- ③ アドオンスキル (展開カード) -->
            <CharacterAddon />

            <!-- ④ クイックフード (合計10個制限) -->
            <CharacterFood />

            <!-- ⑤ チームマグ -->
            <CharacterTeammag />
          </v-expansion-panels>
        </v-col>
      </v-row>

      <!-- 保存ボタン -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          variant="elevated"
          @click="store.saveToLocalStorage"
        >
          設定を保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSimulatorStore } from "@/stores/simulator";
import CharacterExstyle from "./Character-exstyle.vue";
import CharacterAddon from "./Character-addon.vue";
import CharacterFood from "./Character-food.vue";
import CharacterTeammag from "./Character-teammag.vue";

const store = useSimulatorStore();

// IDを指定して対象のスキルオブジェクトを返す関数
const getSkill = (id: string) => {
  return store.character.exStyles.find((s) => s.id === id);
};
</script>
