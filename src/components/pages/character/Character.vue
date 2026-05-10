<template>
  <v-container fluid>
    <!-- 全体を一つのカードでまとめる -->
    <v-card border elevation="0" class="pa-4">
      <v-card-title class="text-h5 mb-4">キャラクター設定</v-card-title>

      <v-row>
        <!-- ① クラス設定 (ドロップダウン) -->
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="store.character.mainClass"
            label="メインクラス"
            :items="store.classList"
            variant="outlined"
            density="compact"
          ></v-autocomplete>
        </v-col>

        <!-- ② EXスタイル (展開カード) -->
        <v-col cols="12">
          <v-expansion-panels variant="accordion">
            <v-expansion-panel title="EXスタイル設定 (スキルツリー)">
              <v-expansion-panel-text class="bg-grey-darken-4">
                <div class="ex-tree-container py-4">
                  <!-- 1段目 -->
                  <v-row no-gutters class="text-center">
                    <v-col cols="4"><SkillNode :s="getSkill('t1_1')" /></v-col>
                    <v-col cols="4"><SkillNode :s="getSkill('t1_2')" /></v-col>
                    <v-col cols="4"><SkillNode :s="getSkill('t1_3')" /></v-col>
                  </v-row>

                  <!-- コネクトライン：列の境界線上に線を置く -->
                  <v-row no-gutters class="text-center">
                    <!-- 1列目 -->
                    <v-col cols="4">
                      <!-- カードと同じ幅の箱を作って、その中で中央に線を置く -->
                      <div style="width: 120px" class="mx-auto">
                        <div class="line-v"></div>
                      </div>
                    </v-col>

                    <!-- 2列目 -->
                    <v-col cols="4">
                      <div style="width: 120px" class="mx-auto">
                        <div class="line-v"></div>
                      </div>
                    </v-col>

                    <!-- 3列目 -->
                    <v-col cols="4">
                      <!-- 必要ならここにも追加 -->
                    </v-col>
                  </v-row>

                  <!-- 2段目 -->
                  <v-row no-gutters class="text-center">
                    <v-col cols="4"><SkillNode :s="getSkill('t2_1')" /></v-col>
                    <v-col cols="4"><SkillNode :s="getSkill('t2_2')" /></v-col>
                    <v-col cols="4"></v-col>
                    <!-- 3列目は空白 -->
                  </v-row>
                  <v-row no-gutters class="text-center" style="height: 20px">
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                    <v-col cols="4"></v-col>
                  </v-row>
                  <!-- 3段目 -->
                  <v-row no-gutters class="text-center">
                    <v-col cols="4"><SkillNode :s="getSkill('t3_1')" /></v-col>
                    <v-col cols="4"><SkillNode :s="getSkill('t3_2')" /></v-col>
                    <v-col cols="4"><SkillNode :s="getSkill('t3_3')" /></v-col>
                  </v-row>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- ③ アドオンスキル (展開カード) -->
            <v-expansion-panel title="アドオンスキル設定">
              <v-expansion-panel-text>
                <v-row>
                  <v-col v-for="cls in store.classList" :key="cls" cols="12" sm="6" lg="4">
                    <v-card variant="outlined" class="pa-2" height="100%">
                      <v-card-subtitle class="font-weight-bold">{{ cls }}</v-card-subtitle>
                      <v-divider class="my-2"></v-divider>

                      <!-- ここで 0〜3 までループを回す -->
                      <div v-for="(_, i) in 4" :key="i" class="d-flex align-start mb-2">
                        <!-- データが存在する場合のみ表示 -->
                        <template
                          v-if="
                            store.character.addonChecked[cls] && store.character.addonLevels[cls]
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
                                store.character.addonChecked[cls][i] ? 'primary' : 'grey-darken-1'
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

            <!-- ④ クイックフード (合計10個制限) -->
            <v-expansion-panel title="クイックフード (最大合計10個)">
              <v-expansion-panel-text>
                <!-- 合計表示チップ -->
                <div class="d-flex align-center mb-4">
                  <span class="mr-2 text-body-2">現在の合計数量:</span>
                  <v-chip :color="store.isFoodOverLimit ? 'error' : 'primary'" variant="flat">
                    {{ store.foodTotalCount }} / 10
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn size="x-small" variant="outlined" @click="clearFood">リセット</v-btn>
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

            <!-- ⑤ チームマグ -->
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
          </v-expansion-panels>
        </v-col>
      </v-row>

      <!-- 保存ボタン -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="elevated" @click="store.saveToLocalStorage">
          設定を保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSimulatorStore } from '@/stores/simulator'
import SkillNode from '@/components/pages/character/SkillNode.vue'

const store = useSimulatorStore()

// IDを指定して対象のスキルオブジェクトを返す関数
const getSkill = (id: string) => {
  return store.character.exStyles.find((s) => s.id === id)
}

const clearFood = () => {
  if (!store.character.food) return
  store.character.food.forEach((f) => {
    if (f) {
      f.name = ''
      f.type = ''
      f.count = 0
    }
  })
}
</script>
<style scoped>
/* 縦線のスタイル */
.line-v {
  width: 2px;
  height: 20px;
  background-color: #4db6ac; /* ゲーム風の青緑色 */
  margin: 0 auto; /* 列のセンターに配置 */
}

/* 各段ごとのカードの間隔が気になる場合はここで調整 */
.v-row {
  align-items: flex-start;
}
</style>
