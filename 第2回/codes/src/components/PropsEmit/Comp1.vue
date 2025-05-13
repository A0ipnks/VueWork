<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// 子コンポーネント (Comp.vue) から受け取るプロパティの型定義
interface Props {
    count: number;
}

// イベントを発行するための型定義
interface Emits {
    (e: 'update-count', value: number): void;
}

// プロパティの定義
const props = defineProps<Props>();

// イベント発行の定義
const emit = defineEmits<Emits>();

// カウントを増やす処理
const incrementCount = () => {
    emit('update-count', props.count + 1);
};

// カウントを減らす処理
const decrementCount = () => {
    emit('update-count', props.count - 1);
};
</script>

<template>
    <div style="border: 1px solid lightgreen; padding: 10px; margin-top: 10px;">
        <h4>孫コンポーネント (Comp1.vue)</h4>
        <p>子コンポーネント (Comp.vue) から受け取ったカウント: {{ count }}</p>
        <button @click="incrementCount">カウントを増やす</button>
        <button @click="decrementCount">カウントを減らす</button>
    </div>
</template>

<style scoped></style>