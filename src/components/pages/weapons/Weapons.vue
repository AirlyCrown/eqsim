<template>
  <v-container fluid class="bg-grey-darken-4 min-vh-100 pa-4">
    <h1 class="text-h5 mb-6 font-weight-bold">
      <v-icon icon="mdi-sword-cross" class="mr-2"></v-icon>装備構成・比較設定
    </h1>

    <!-- 各セクションをアコーディオン形式に -->
    <v-expansion-panels multiple v-model="openedPanels">
      <!-- ■ 1. 武器選択セクション -->
      <weapons-select />

      <!-- ■ 2. プリセット選択セクション -->
      <weapons-Prs />

      <!-- ■ 3. 特殊能力(OP)セクション -->
      <v-expansion-panel
        bg-color="grey-darken-4"
        class="mb-4 border border-grey-darken-2"
      >
        <weapons-options />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import WeaponsSelect from "./Weapons-select.vue";
import WeaponsPrs from "./Weapons-prs.vue";
import WeaponsOptions from "./Weapons-options.vue";

const openedPanels = ref([0, 1, 2]);
</script>
