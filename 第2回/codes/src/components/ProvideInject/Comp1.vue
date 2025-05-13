<script setup lang="ts">
import { inject, type Ref } from 'vue';

// Inject を使って状態と更新関数を受け取る
const count = inject<Ref<number>>('count')!;
const increment = inject<() => void>('increment')!;
const decrement = inject<() => void>('decrement')!;

// カウントを増やす処理
const incrementCount = () => {
    // count.value++ 非推奨
    increment()
};

// カウントを減らす処理
const decrementCount = () => {
    // count.value--　非推奨
    decrement();
};
</script>

<template>
    <div style="border: 1px solid lightgreen; padding: 10px; margin-top: 10px;">
        <h4>孫コンポーネント (Comp1.vue)</h4>
        <p>現在のカウント (Comp1): {{ count }}</p>
        <button @click="incrementCount">カウントを増やす</button>
        <button @click="decrementCount">カウントを減らす</button>
    </div>
</template>

<style scoped></style>