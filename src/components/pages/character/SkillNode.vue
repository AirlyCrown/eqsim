<!-- components/SkillNode.vue のイメージ -->
<template>
  <v-card v-if="s" color="#1a3d34" border width="120" class="mx-auto">
    <div class="text-center pa-1">
      <v-icon icon="mdi-shield-star" color="amber-lighten-2" size="small"></v-icon>
      <div class="d-flex align-center justify-center">
        <v-btn
          icon="mdi-chevron-left"
          @click="s.currentLv--"
          :disabled="s.currentLv <= 0"
          size="x-small"
          variant="text"
          density="compact"
        />
        <span class="text-caption font-weight-bold" style="color: #d4a373; min-width: 35px">
          {{ s.currentLv }} / {{ s.maxLv }}
        </span>
        <v-btn
          icon="mdi-chevron-right"
          @click="s.currentLv++"
          :disabled="s.currentLv >= s.maxLv"
          size="x-small"
          variant="text"
          density="compact"
        />
      </div>
    </div>
    <div
      class="bg-black pa-1 text-center d-flex align-center justify-center"
      style="font-size: 0.65rem; line-height: 1.2; min-height: 34px"
    >
      {{ s.name }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
// 親からスキルオブジェクトを受け取る
defineProps<{ s: any }>()
</script>
