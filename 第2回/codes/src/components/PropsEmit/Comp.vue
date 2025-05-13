<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Comp1 from './Comp1.vue';

// 親コンポーネント (App.vue) から受け取るプロパティの型定義
interface Props {
    count: number;
}

// 孫コンポーネント (Comp1.vue) から受け取るイベントと親コンポーネント (App.vue) へ発行するイベントの型定義
interface Emits {
    (e: 'update-count', value: number): void;
}

// プロパティの定義
const props = defineProps<Props>();

// イベント発行の定義
const emit = defineEmits<Emits>();

// 孫コンポーネント (Comp1.vue) からemitされたイベントを処理し、親コンポーネント (App.vue) へ再発行する関数
const handleUpdateCount = (newValue: number) => {
    emit('update-count', newValue);
};
</script>

<template>
    <div style="border: 1px solid lightblue; padding: 10px; margin-top: 10px;">
        <h3>子コンポーネント (Comp.vue)</h3>
        <p>親コンポーネント (App.vue) から受け取ったカウント: {{ props.count }}</p>
        <Comp1 :count="count" @update-count="handleUpdateCount" />
    </div>
</template>

<style scoped></style>