<script setup>
const count = defineModel()

const increment = () => {
    count.value++
}

const decrement = () => {
    count.value--
}
</script>

<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>
