<script setup lang="ts">
import PropsEmit from '@/components/PropsEmit/index.vue'
import ProvideInject from '@/components/ProvideInject/index.vue'
import Pinia from '@/components/Pinia/index.vue'
import VModelOldOld from '@/components/VModel/old/index.vue'
import VModelOldNew from '@/components/VModel/new/index.vue'

</script>

<template>
  <div>
    <h1 style="color: blue;">状態管理</h1>
    <h1>Props / Emit</h1>
    <PropsEmit />

    <div class="spacer-l"></div>

    <h1>Provide / Inject</h1>
    <ProvideInject />

    <div class="spacer-l"></div>

    <h1>Pinia</h1>
    <Pinia />

    <div class="spacer-l"></div>
    <h1 style="color: blue;">v-model</h1>
    <h3>従来</h3>
    <VModelOldOld />
    <div class="spacer-m"></div>
    <h3>最新</h3>
    <VModelOldNew />
  </div>
</template>

<style scoped>
.spacer-l {
  margin-bottom: 100px;
}
.spacer-m {
  margin-bottom: 60px;
}
</style>