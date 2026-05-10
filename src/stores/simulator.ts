// stores/simulator.ts
import { defineStore } from 'pinia'

const classList = [
  'ハンター',
  'ファイター',
  'レンジャー',
  'ガンナー',
  'フォース',
  'テクター',
  'ブレイバー',
  'バウンサー',
  'ウェイカー',
  'スレイヤー',
]

export const useSimulatorStore = defineStore('simulator', {
  state: () => ({
    // キャラクター設定の構造を定義
    character: {
      mainClass: '',
      exStyles: [
        // 1段目
        { id: 't1_1', name: 'アドラス・アフターブラスト', maxLv: 1, currentLv: 0, row: 1 },
        { id: 't1_2', name: 'アドラス・トリガーアタック', maxLv: 1, currentLv: 0, row: 1 },
        { id: 't1_3', name: 'アドラス・パーフェクション', maxLv: 1, currentLv: 0, row: 1 },
        // 2段目（親子関係あり）
        {
          id: 't2_1',
          name: 'アドラス・ブラストエコー',
          maxLv: 1,
          currentLv: 0,
          row: 2,
          parent: 't1_1',
        },
        {
          id: 't2_2',
          name: 'アドラス・アブソープション',
          maxLv: 1,
          currentLv: 0,
          row: 2,
          parent: 't1_2',
        },
        // 3段目
        { id: 't3_1', name: '威力アップ', maxLv: 5, currentLv: 0, row: 3 },
        { id: 't3_2', name: 'PPアップ', maxLv: 10, currentLv: 0, row: 3 },
        { id: 't3_3', name: 'フォトンブラスト再使用時間短縮', maxLv: 10, currentLv: 0, row: 3 },
      ],
      addonSkillNames: {
        ハンター: [
          '打撃威力アップ',
          'トライアル参加時HP回復',
          'HPアップ',
          'PAチャージ移動速度アップ',
        ],
        ファイター: [
          'クリティカル威力アップ',
          'ジャンプ力アップ',
          'トライアル参加時PP回復(Fi)',
          'HPアップ(Fi)',
        ],
        レンジャー: [
          '射撃武器威力アップ',
          'フォトンブラスト威力アップ',
          'トライアル参加時HP回復(Ra)',
          'HPアップ(Ra)',
        ],
        ガンナー: [
          '攻撃時PBゲージ蓄積量アップ',
          '攻撃時PP回復量アップ',
          'トライアル参加時PP回復(Gu)',
          'HPアップ(Gu)',
        ],
        フォース: [
          '法撃武器威力アップ',
          'PP自然回復量アップ',
          'トライアル参加時HP回復(Fo)',
          'HPアップ(Fo)',
        ],
        テクター: [
          'PBゲージ自動蓄積量アップ',
          'ダメージ耐性アップ',
          'トライアル参加時PP回復(Te)',
          'HPアップ(Te)',
        ],
        ブレイバー: [
          'クリティカル率アップ',
          'レスタサイン回復量アップ',
          'トライアル参加時HP回復(Br)',
          'HPアップ(Br)',
        ],
        バウンサー: [
          'ダッシュ＆グライド中PP回復',
          'ワンモアジャンプ',
          'トライアル参加時PP回復(Bo)',
          'HPアップ(Bo)',
        ],
        ウェイカー: [
          'PPアップ(Wa)',
          '静止状態HP回復',
          'トライアル参加時HP回復(Wa)',
          'HPアップ(Wa)',
        ],
        スレイヤー: [
          'ダウン時クリティカル率アップ',
          'PB再使用時間短縮',
          'トライアル参加時PP回復(Sl)',
          'HPアップ(Sl)',
        ],
      } as Record<string, string[]>,

      addonLevels: Object.fromEntries(classList.map((cls) => [cls, [0, 0, 0, 0]])) as Record<
        string,
        number[]
      >,
      addonChecked: Object.fromEntries(
        classList.map((cls) => [cls, [true, false, false, false]]), // メインは最初からtrue
      ) as Record<string, boolean[]>,
      // フード用のデータ（5行分）
      food: Array.from({ length: 5 }, () => ({ name: '', type: '', count: 0 })),
      // チームマグ用
      teamMag: {
        HPアップ: 0,
        PPアップ: 0,
        威力アップ: 0,
      } as Record<string, number>,
    },
    // ...武器やユニットの定義も続く
  }),
  // ...actionsなど
  actions: {
    // 指定したクラスのチェックが入っている数を数える関数
    getCheckedCount(cls: string) {
      const checkedArray = this.character.addonChecked[cls]
      if (!checkedArray) return 0
      return checkedArray.filter(Boolean).length
    },
    // 保存用のアクション（ついでに準備）
    saveToLocalStorage() {
      console.log('保存実行')
    },
  },
  getters: {
    classList: (state) => Object.keys(state.character.addonSkillNames),
    // フードの合計数量を計算
    foodTotalCount: (state) => {
      return state.character.food.reduce((sum, item) => sum + item.count, 0)
    },
    // 合計が10を超えているか判定
    isFoodOverLimit(): boolean {
      return this.foodTotalCount > 10
    },
  },
})
