<template>
  <v-expansion-panel
    bg-color="grey-darken-4"
    class="mb-4 border border-grey-darken-2"
  >
    <v-expansion-panel-title class="text-h6 font-weight-bold">
      2. プリセット候補 (A / B / C)
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row class="pt-2">
        <v-col v-for="id in slotIds" :key="id" cols="12" md="4">
          <v-card variant="flat" border class="pa-4 bg-grey-darken-3">
            <div
              class="text-overline text-cyan-accent-2 mb-2 font-weight-black"
            >
              FIXA {{ id }}
            </div>
            <v-select
              label="プリセット名"
              :items="[
                'アタック',
                'フェタル',
                'テルミナ',
                'ウィクス',
                'アンウィクス',
                'ブラストル',
                'アバンダク',
              ]"
              variant="outlined"
              density="compact"
            ></v-select>
            <div class="mt-2">
              <div class="text-caption d-flex justify-space-between">
                <v-col>
                  レベル <span>Lv.{{ fixaLevels[id] }}</span>
                </v-col>
              </div>
              <v-slider
                v-model="fixaLevels[id]"
                min="1"
                max="5"
                step="1"
                color="cyan-accent-2"
                hide-details
              ></v-slider>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useSimulatorStore } from "@/stores/simulator";

const store = useSimulatorStore();
// 1. IDの型を定義
type SlotId = "A" | "B" | "C";
const slotIds: SlotId[] = ["A", "B", "C"];

// 2. reactiveの型を明示
const fixaLevels = reactive<Record<SlotId, number>>({
  A: 1,
  B: 1,
  C: 1,
});
</script>
