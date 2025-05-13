import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

const useCounterStore = defineStore('counter', () => {
    const count = ref<number>(0)

    const increment = () => {
        count.value++
    }
    const decrement = () => {
        count.value++
    }

    return { count, increment, decrement }
})


// 下記でexportすることで呼び出し元で分割代入が使用可能になる
export default () => {
    const $store = useCounterStore()

    return { ...$store, ...storeToRefs($store) }
}