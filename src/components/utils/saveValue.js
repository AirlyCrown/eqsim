// utils/saveValue.ts
import { useBuildStore } from '@/stores/buildStore';
let timer = null;
export function saveValue(id, value) {
    const store = useBuildStore();
    // Pinia に保存
    store.setValue(id, value);
    // 2秒後に LocalStorage 保存（連続入力の無駄保存を防ぐ）
    if (timer)
        clearTimeout(timer);
    timer = setTimeout(() => {
        const json = JSON.stringify(store.values);
        const encoded = btoa(json);
        localStorage.setItem('buildData', encoded);
    }, 2000);
}
