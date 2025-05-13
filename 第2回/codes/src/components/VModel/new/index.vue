<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'
// リアクティブ変数
const countValue = ref(0)
</script>

<template>
  <div>
    <Comp v-model="countValue" />
    <p>親コンポーネント: {{ countValue }}</p>
  </div>
</template>
