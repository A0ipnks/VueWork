<script setup lang="ts">
import useCounterStore from './store.ts';

const store = useCounterStore()

const { count, increment, decrement } = store
</script>

<template>
    <div style="border: 1px solid lightgreen; padding: 10px; margin-top: 10px;">
        <h4>孫コンポーネント (Comp1.vue)</h4>
        <p>現在のカウント (Comp1): {{ count }}</p>
        <button @click="increment">カウントを増やす</button>
        <button @click="decrement">カウントを減らす</button>
    </div>
</template>

<style scoped></style>