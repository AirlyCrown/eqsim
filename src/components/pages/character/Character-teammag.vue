<template>
  <v-expansion-panel title="チームマグブースト">
    <v-expansion-panel-text>
      <div
        v-for="stat in ['HPアップ', 'PPアップ', '威力アップ']"
        :key="stat"
        class="mb-4"
      >
        <div class="text-caption">{{ stat }}</div>
        <v-slider
          v-model="store.character.teamMag[stat]"
          min="0"
          max="10"
          step="1"
          show-ticks="always"
          thumb-label
        ></v-slider>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { useSimulatorStore } from "@/stores/simulator";

const store = useSimulatorStore();

// IDを指定して対象のスキルオブジェクトを返す関数
const getSkill = (id: string) => {
  return store.character.exStyles.find((s) => s.id === id);
};
</script>
