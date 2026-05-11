<template>
  <v-expansion-panel-title class="text-h6 font-weight-bold">
    3. オプション(OP)
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <v-row class="pt-2">
      <v-col v-for="id in slotIds" :key="id" cols="12" md="4">
        <v-card variant="flat" border class="pa-2 bg-grey-darken-3">
          <div
            class="text-overline text-cyan-accent-2 mb-2 px-2 font-weight-black"
          >
            OP GROUP {{ id }}
          </div>
          <draggable
            v-model="store.opSlots[id as SlotId]"
            item-key="id"
            handle=".drag-handle"
            ghost-class="op-ghost"
          >
            <template #item="{ element, index }">
              <div class="d-flex align-center mb-1">
                <!-- ドラッグ用のアイコン -->
                <v-icon
                  class="drag-handle cursor-move mr-1"
                  size="small"
                  color="grey"
                >
                  mdi-drag-vertical
                </v-icon>

                <!-- 上位3枠のみEXチェックボックスを表示 -->
                <div style="width: 40px">
                  <v-checkbox-btn
                    v-if="index < 3"
                    v-model="element.isEX"
                    density="compact"
                    color="cyan-accent-2"
                  ></v-checkbox-btn>
                </div>

                <!-- 特殊能力の選択（オートコンプリート） -->
                <v-autocomplete
                  v-model="element.name"
                  :items="getFilteredList(index, element.isEX, id)"
                  item-title="opname"
                  item-value="opname"
                  :label="`Slot ${index + 1}`"
                  variant="solo-filled"
                  density="compact"
                  hide-details
                  flat
                ></v-autocomplete>
              </div>
            </template>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </v-expansion-panel-text>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import draggable from "vuedraggable";
import { useSimulatorStore } from "@/stores/simulator";
import opMasterListData from "@/assets/jsondb/options.json";

// 1. IDの型を定義
type SlotId = "A" | "B" | "C";
const slotIds: SlotId[] = ["A", "B", "C"];

// 2. reactiveの型を明示
const store = useSimulatorStore();

const createEmptyOps = () =>
  [...Array(8)].map((_, i) => ({
    id: i,
    name: "",
    isEX: i < 3, // 上位3つをデフォルトでEX候補に
  }));

const getFilteredList = (index: number, isEX: boolean, slotId: SlotId) => {
  // JSONの構造が { normal: [...], ex: [...] } の場合、配列部分を直接指定する
  // もし JSON 自体がただの配列なら今のままでOKですが、エラーが出る場合はこちらを試してください
  const master = isEX ? opMasterListData.ex : opMasterListData.normal;

  // 1. 現在の構成（OPAなど）で、自分以外のスロットですでに選ばれている「カテゴリ」を抽出
  const usedCategories = store.opSlots[slotId]
    .filter((slot, i) => i !== index && slot.name)
    .map((slot) => {
      // 探すときは「通常・EX両方」から探すのが安全です
      const allData = [...opMasterListData.normal, ...opMasterListData.ex];
      const found = allData.find((m) => m.opname === slot.name);
      return found ? found.category : null;
    })
    .filter((cat) => cat !== null);

  // 2. マスターデータから、まだ使われていないカテゴリのOPだけを返す
  return master.filter((item) => {
    if (isEX) return true; // EX同士は重複制限なしとする場合
    return !usedCategories.includes(item.category);
  });
};
</script>
