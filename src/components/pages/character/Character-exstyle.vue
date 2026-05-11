<template>
  <v-expansion-panel title="EXスタイル設定 (スキルツリー)">
    <v-expansion-panel-text class="bg-grey-darken-4">
      <!-- d-flex で左寄せ(align-start)にする -->
      <div class="ex-tree-container py-4 d-flex flex-column align-start">
        <!-- 1段目 -->
        <div class="skill-row">
          <div class="skill-cell"><SkillNode :s="getSkill('t1_1')" /></div>
          <div class="skill-cell"><SkillNode :s="getSkill('t1_2')" /></div>
          <div class="skill-cell"><SkillNode :s="getSkill('t1_3')" /></div>
        </div>

        <!-- 縦線 -->
        <div class="skill-row">
          <div class="skill-cell"><div class="line-v"></div></div>
          <div class="skill-cell"><div class="line-v"></div></div>
          <div class="skill-cell"><!-- 3列目は線なし --></div>
        </div>

        <!-- 2段目 -->
        <div class="skill-row">
          <div class="skill-cell"><SkillNode :s="getSkill('t2_1')" /></div>
          <div class="skill-cell"><SkillNode :s="getSkill('t2_2')" /></div>
          <div class="skill-cell"></div>
        </div>

        <!-- 段間のスペース（画像に合わせて調整） -->
        <div style="height: 20px"></div>

        <!-- 3段目 -->
        <div class="skill-row">
          <div class="skill-cell"><SkillNode :s="getSkill('t3_1')" /></div>
          <div class="skill-cell"><SkillNode :s="getSkill('t3_2')" /></div>
          <div class="skill-cell"><SkillNode :s="getSkill('t3_3')" /></div>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
import { useSimulatorStore } from "@/stores/simulator";
import SkillNode from "@/components/pages/character/SkillNode.vue";

const store = useSimulatorStore();

const getSkill = (id: string) => {
  return store.character.exStyles.find((s) => s.id === id);
};
</script>
<style scoped>
.ex-tree-container {
  /* 必要であれば左側に少し余白を作る */
  padding-left: 16px;
}

.skill-row {
  display: flex;
  justify-content: flex-start; /* 左寄せ */
  gap: 64px; /* ★ここを小さくするとボックス同士がもっとくっつきます */
}

.skill-cell {
  /* ボックスの横幅。SkillNodeのサイズに合わせて固定すると縦が揃います */
  width: 120px;
  display: flex;
  justify-content: center;
}

.line-v {
  width: 2px;
  height: 20px;
  background-color: #4db6ac;
}
</style>
