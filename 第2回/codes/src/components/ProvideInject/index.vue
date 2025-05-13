<script setup lang="ts">
import { ref, provide } from 'vue';
import Comp from './Comp.vue';

// 親コンポーネントの状態
const count = ref<number>(0);

// カウントを増やす関数
const increment = () => {
    count.value++;
};

// カウントを減らす関数
const decrement = () => {
    count.value--;
};

// Provide を使って状態と更新関数を提供する
provide('count', count);
provide('increment', increment);
provide('decrement', decrement);
</script>

<template>
    <div>
        <h2>親コンポーネント (App.vue)</h2>
        <p>現在のカウント: {{ count }}</p>
        <Comp />
    </div>
</template>

<style scoped></style>