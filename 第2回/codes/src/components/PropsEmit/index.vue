<script setup lang="ts">
import { ref } from 'vue';
import Comp from '@/components/PropsEmit/Comp.vue';

// 親コンポーネントの状態
const count = ref<number>(0);

// 子コンポーネント (Comp.vue) からemitされたイベントを処理する関数
const handleUpdateCount = (newValue: number) => {
    count.value = newValue;
};
</script>

<template>
    <div>
        <h2>親コンポーネント (App.vue)</h2>
        <p>現在のカウント: {{ count }}</p>
        <Comp :count="count" @update-count="handleUpdateCount" />
    </div>
</template>

<style scoped></style>