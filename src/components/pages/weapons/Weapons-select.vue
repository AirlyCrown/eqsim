<template>
  <v-expansion-panel
    bg-color="grey-darken-4"
    class="mb-4 border border-grey-darken-2"
  >
    <v-expansion-panel-title class="text-h6 font-weight-bold">
      1. 武器候補 (A / B / C)
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row class="pt-2">
        <v-col v-for="id in ['A', 'B', 'C']" :key="id" cols="12" md="4">
          <v-card variant="flat" border class="pa-4 bg-grey-darken-3">
            <div
              class="text-overline text-cyan-accent-2 mb-2 font-weight-black"
            >
              WEAPON {{ id }}
            </div>
            <v-autocomplete
              label="武器種/シリーズを選択"
              :items="weaponMasterList"
              variant="outlined"
              density="compact"
            ></v-autocomplete>
            <v-divider class="my-3"></v-divider>
            <div class="text-caption text-grey-lighten-1">
              <div>強化値: <span class="text-white">+100</span></div>
              <div>潜在: <span class="text-white">（選択時に表示）</span></div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { useSimulatorStore } from "@/stores/simulator";

const store = useSimulatorStore();
const weaponMasterList = ["スプラディオ", "レクシオ"];
</script>
