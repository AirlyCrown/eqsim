// src/composables/useCalculator.ts
import type { Ref } from 'vue'

export const useCalculator = (
  weaponSlots: Ref<any[]>,
  presetSlots: Ref<any[]>,
  slots: Ref<any[][]>,
  findOptionData: (name: string, isEX: boolean) => any,
) => {
  /**
   * 単体の組み合わせを計算するコア関数
   * 武器(w)、プリセット(p)、オプションリスト(oList)を受け取って1行分のデータを返す
   */
  const calculateCombinedStats = (w: any, p: any, oList: any[], isMax: boolean) => {
    // ① 武器×潜在
    const weaponAtk = w.attackvalue || 0
    const potMul = 1 + (w.effectcompetitive || 0) / 100
    const weaponPart = weaponAtk * potMul

    // ② プリセット倍率 (isMaxによって配列を切り替え)
    let presetMul = 1.0
    if (p && p.key) {
      const lv = p.lv || 0

      // 最大時(isMax)に conditional... が存在しない場合は、通常の effect... を参照させる
      const pArray = isMax ? p.conditionalcompetitive || p.effectcompetitive : p.effectcompetitive

      const pValue = pArray ? pArray[lv] : 0
      presetMul = 1 + pValue / 100
    }

    // ③ オプション倍率
    let opMul = 1.0
    let opFloorMul = 1.0
    if (oList && oList.length > 0) {
      oList.forEach((opt) => {
        if (!opt.key) return
        const data = findOptionData(opt.key, opt.isEX)
        if (data) {
          opMul *= 1 + data.competitive / 100
          opFloorMul *= 1 + data.lowercompetitive / 100
        }
      })
    }

    const weaponFloor = w.lowercompetitive || 50.0

    return {
      conditionType: isMax ? '最大' : '最小',
      summary: '', // ここは generateRankingRows で上書きする
      baseAtk: Math.floor(weaponPart),
      totalMul: presetMul * opMul,
      floorAtk: weaponFloor * opFloorMul,
    }
  }

  /**
   * 三重ループによる総当たり生成（最大3*3*3パターン）
   */
  const generateRankingRows = () => {
    const newRows: any[] = []

    // 1. 有効な武器を抽出（武器が1つもない場合は空を返す）
    const validWeapons = weaponSlots.value.filter((w) => w.key)
    if (validWeapons.length === 0) return []

    // 2. 有効なプリセットを抽出。1つもなければ「なし」枠を作る
    let validPresets = presetSlots.value.filter((p) => p.key)
    if (validPresets.length === 0) {
      validPresets = [{ key: null, name: 'なし', lv: 0 }]
    }

    // 3. 有効なオプションを抽出。1つもなければ「空配列」を1セット作る
    let validOptionSets = slots.value.filter((oList) => oList.some((o) => o.key))
    if (validOptionSets.length === 0) {
      validOptionSets = [[]]
    }

    // 武器 × プリセット × オプション の三重ループ
    validWeapons.forEach((w) => {
      validPresets.forEach((p) => {
        validOptionSets.forEach((oList, oIdx) => {
          // 最小(isMax=false)と最大(isMax=true)の両方を計算
          const minRes = calculateCombinedStats(w, p, oList, false)
          const maxRes = calculateCombinedStats(w, p, oList, true)

          // 最小と最大が完全に一致するか判定 (倍率と下限)
          const isSame = minRes.totalMul === maxRes.totalMul && minRes.floorAtk === maxRes.floorAtk

          // 表示用ラベルの作成
          const pName = p.key ? p.name : 'なし'
          const oName = oList.some((o: any) => o.key) ? `構成${oIdx + 1}` : 'なし'
          const combinedSummary = `${w.name} / ${pName} / ${oName}`

          if (isSame) {
            // 差がない場合は「固定」1行のみ
            newRows.push({
              ...minRes,
              summary: combinedSummary,
              conditionType: '固定',
            })
          } else {
            // 差がある場合は「最小」「最大」の2行を出す
            newRows.push({ ...minRes, summary: combinedSummary })
            newRows.push({ ...maxRes, summary: combinedSummary })
          }
        })
      })
    })

    return newRows
  }

  return {
    generateRankingRows,
  }
}
