<script setup lang="ts">
import Comp1 from '../Pinia/Comp1.vue';
import useCounterStore from './store.ts';

const store = useCounterStore()

const { count } = store

</script>

<template>
    <div style="border: 1px solid lightblue; padding: 10px; margin-top: 10px;">
        <h3>子コンポーネント (Comp.vue)</h3>
        <p>現在のカウント (Comp): {{ count }}</p>
        <Comp1 />
    </div>
</template>