<template>
    <button @click="increment">Count is: {{ count.num }}</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref({
    num: 0
})

// 用来修改状态、触发更新的函数
function increment() {
    count.value.num++
}

// 生命周期钩子
onMounted(() => {
    console.log(`The initial count is ${count.value.num}.`)
})
</script>
