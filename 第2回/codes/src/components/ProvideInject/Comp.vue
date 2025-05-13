<script setup lang="ts">
import { inject, Ref } from 'vue';
import Comp1 from './Comp1.vue';

// Inject を使って状態を受け取る
const count = inject<Ref<number>>('count');
</script>

<template>
    <div style="border: 1px solid lightblue; padding: 10px; margin-top: 10px;">
        <h3>子コンポーネント (Comp.vue)</h3>
        <p>現在のカウント (Comp): {{ count }}</p>
        <Comp1 />
    </div>
</template>

<style scoped></style>