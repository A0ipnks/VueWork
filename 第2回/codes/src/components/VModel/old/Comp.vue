<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';


const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['update:modelValue']);

const count = ref(props.modelValue);

const increment = () => {
    count.value++;
    emit('update:modelValue', count.value);
};

const decrement = () => {
    count.value--;
    emit('update:modelValue', count.value);
};

</script>

<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
    </div>
</template>
