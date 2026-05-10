<template>
  <v-container>
    <!-- 各ブロック -->
    <WeaponSelect v-model="weaponSlots" @change="updateRanking" />
    <PresetSelect v-model="presetSlots" @change="updateRanking" />
    <OptionSelect v-model="slots" @change="updateRanking" />

    <!-- ランキング（計算済みの rowData を渡すだけ） -->
    <RankingTable :rowData="rankingRows" @refresh="updateRanking" />
  </v-container>
</template>

<script setup lang="ts">
// オプション用インターフェース
interface OptionItem {
  category: string
  opname: string
  hp: number
  pp: number
  competitive: number
  lowercompetitive: number
  damageresist: number
  statusresist: number
}

// JSON全体の形を定義
interface OptionMaster {
  normal: OptionItem[]
  ex: OptionItem[]
}

import { ref, onMounted } from 'vue'
import { useCalculator } from '@/components/utils/useCalculator'
import WeaponSelect from '@/components/pages/equips/WeaponSelect.vue'
import PresetSelect from '@/components/pages/equips/PresetSelect.vue'
import OptionSelect from '@/components/pages/equips/OptionSelect.vue'
import RankingTable from '@/components/pages/equips/RankingTable.vue'
import weaponMasterData from '@/assets/jsondb/weaponMaster.json'
import optionMasterRaw from '@/assets/jsondb/options.json'

// リアクティブ変数
const rankingRows = ref<any[]>([])

// 型を確定させる
const optionMaster = optionMasterRaw as unknown as OptionMaster

// 武器管理用構造体
const weaponSlots = ref([
  {
    key: null,
    weaponname: '未選択',
    rare: null,
    attackvalue: 0,
    persistent: null,
    effectcompetitive: 0,
    effectcontet: null,
    lowercompetitive: 0,
    conditionalcompetitive: 0,
  },
  {
    key: null,
    weaponname: '未選択',
    rare: null,
    attackvalue: 0,
    persistent: null,
    effectcompetitive: 0,
    effectcontet: null,
    lowercompetitive: 0,
    conditionalcompetitive: 0,
  },
  {
    key: null,
    weaponname: '未選択',
    rare: null,
    attackvalue: 0,
    persistent: null,
    effectcompetitive: 0,
    effectcontet: null,
    lowercompetitive: 0,
    conditionalcompetitive: 0,
  },
])

// プリセット管理用構造体
const presetSlots = ref([
  {
    key: null,
    presetname: '未選択',
    lv: 1,
    effectcompetitive: [0, 0, 0, 0, 0, 0],
    conditionalcompetitive: [0, 0, 0, 0, 0, 0],
  },
  {
    key: null,
    presetname: '未選択',
    lv: 1,
    effectcompetitive: [0, 0, 0, 0, 0, 0],
    conditionalcompetitive: [0, 0, 0, 0, 0, 0],
  },
  {
    key: null,
    presetname: '未選択',
    lv: 1,
    effectcompetitive: [0, 0, 0, 0, 0, 0],
    conditionalcompetitive: [0, 0, 0, 0, 0, 0],
  },
])

// OPスロット管理用構造体
const slots = ref(
  Array.from({ length: 3 }, () => Array.from({ length: 8 }, () => ({ key: null, isEX: false }))),
)

// オプションjsonを検索する(名前から検索)
const findOptionData = (name: string, isEX: boolean): OptionItem | undefined => {
  if (!optionMaster) return undefined

  // isEX が true なら EXリスト、false なら 通常リスト を参照
  const list = isEX ? optionMaster.ex : optionMaster.normal

  // JSON内の opname と一致するものを探す
  return list.find((o: OptionItem) => o.opname === name)
}

// Composableの初期化（必要な引数を渡す）
const { generateRankingRows } = useCalculator(
  weaponSlots,
  presetSlots,
  slots,
  findOptionData, // 前に作ったJSONから引く関数
)

// ランキングを更新する。
const updateRanking = () => {
  const rows = generateRankingRows()
  rankingRows.value = rows
}

// 初期表示用
onMounted(() => {
  updateRanking()
})
</script>
<style scoped>
/* 2. AG Grid の微調整 */
.ag-theme-quartz-dark {
  --ag-font-size: 13px;
  /* ヘッダーと行の高さを変えた際、文字が中央に来るように調整 */
  --ag-grid-size: 4px;
}

/* AG Grid内の各セルを垂直中央揃えに強制する */
:deep(.ag-cell) {
  display: flex;
  align-items: center; /* 40pxの高さの中で文字を中央に */
  line-height: 1 !important;
}

/* ヘッダーも同様に中央揃え */
:deep(.ag-header-cell-label) {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
