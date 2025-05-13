<script setup lang="ts">
import Comp from './Comp.vue';
import useCounterStore from './store.ts';

const store = useCounterStore()

const { count } = store

</script>

<template>
    <div>
        <h2>親コンポーネント (App.vue)</h2>
        <p>現在のカウント (App): {{ count }}</p>
        <Comp />
    </div>
</template>