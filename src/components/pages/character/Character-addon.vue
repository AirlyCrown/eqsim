<template>
  <v-expansion-panel title="アドオンスキル設定">
    <v-expansion-panel-text>
      <v-row>
        <v-col
          v-for="cls in store.classList"
          :key="cls"
          cols="12"
          sm="6"
          lg="4"
        >
          <v-card variant="outlined" class="pa-2" height="100%">
            <v-card-subtitle class="font-weight-bold">{{
              cls
            }}</v-card-subtitle>
            <v-divider class="my-2"></v-divider>

            <!-- ここで 0〜3 までループを回す -->
            <div v-for="(_, i) in 4" :key="i" class="d-flex align-start mb-2">
              <!-- データが存在する場合のみ表示 -->
              <template
                v-if="
                  store.character.addonChecked[cls] &&
                  store.character.addonLevels[cls]
                "
              >
                <!-- 先頭のチェックボックス -->
                <div class="me-4" style="width: 40px">
                  <v-checkbox
                    v-model="store.character.addonChecked[cls][i]"
                    :disabled="
                      i === 0 ||
                      (!store.character.addonChecked[cls][i] &&
                        store.getCheckedCount(cls) >= 3)
                    "
                    density="compact"
                    hide-details
                    class="mt-n1"
                  ></v-checkbox>
                </div>

                <!-- スキル名とスライダーのセット -->
                <div class="flex-grow-1 pe-4">
                  <div
                    class="text-caption d-flex justify-space-between align-center mb-1"
                  >
                    <span
                      class="font-weight-medium text-truncate"
                      style="max-width: 200px"
                    >
                      <!-- クラス名(cls)とインデックス(i)に基づいて名称を表示 -->
                      {{
                        store.character.addonSkillNames[cls]
                          ? store.character.addonSkillNames[cls][i]
                          : `スキル ${i}`
                      }}
                    </span>
                    <span class="text-primary font-weight-bold ml-2"
                      >Lv.{{ store.character.addonLevels[cls][i] }}</span
                    >
                  </div>

                  <v-slider
                    v-model="store.character.addonLevels[cls][i]"
                    min="0"
                    max="20"
                    step="1"
                    density="compact"
                    hide-details
                    :color="
                      store.character.addonChecked[cls][i]
                        ? 'primary'
                        : 'grey-darken-1'
                    "
                    :disabled="!store.character.addonChecked[cls][i]"
                  ></v-slider>
                </div>
              </template>
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
</script>
