<template>
    <div
        class="clock_box"
        :style="{ backgroundImage: gradient }"
        @click="toggleFullscreen"
        ref="fullscreenElement"
    >
        <div class="clock">
            <p ref="time">{{ formattedTime }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 定义样式变量
// const color2 = '#56d5fc'
// const color4 = '#def700'
// const color6 = '#fa3195'
// const gradient = `linear-gradient(135deg, ${color2}, ${color4}, ${color6})`

const time = ref(null)
const fullscreenElement = ref(null)
let intervalId
const toggleFullscreen = () => {
    if (fullscreenElement.value.requestFullscreen) {
        fullscreenElement.value.requestFullscreen()
    } else if (fullscreenElement.value.webkitRequestFullscreen) {
        // Safari
        fullscreenElement.value.webkitRequestFullscreen()
    } else if (fullscreenElement.value.msRequestFullscreen) {
        // IE/Edge
        fullscreenElement.value.msRequestFullscreen()
    }
}
// 定义更新时间的函数
const updateClock = () => {
    const now = new Date()
    let hours = now.getHours()
    const amPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // 将0小时转换为12小时制的12
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    time.value.textContent = `${hours}:${minutes}:${seconds} ${amPm}`
}

onMounted(() => {
    // 组件挂载后开始定时更新时间
    intervalId = setInterval(updateClock, 1000)
})

onUnmounted(() => {
    // 组件卸载前清除定时器
    clearInterval(intervalId)
})
</script>

<style scoped>
:root {
    --color2: #56d5fc;
    --color4: #def700;
    --color6: #fa3195;
}

* {
    margin: 0;
    padding: 0;
}

html {
    font-size: 14px;
}

body {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif, Arial, 'Microsoft Yahei';
}

.clock_box {
    position: relative;
    width: 380px;
    height: 80px;
    border-radius: 10px;
    /* background-image: linear-gradient(135deg, var(--color2), var(--color4), var(--color6)); */
    /* 居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: animate 4s linear infinite;
}

.clock_box::after,
.clock_box::before {
    position: absolute;
    content: '';
    background-image: inherit;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 10px;
    filter: blur(15px);
}

.clock_box::before {
    filter: blur(100px);
}

.clock {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    /* background-color: #2b2a2a; */
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.clock p {
    font-size: 50px;
    font-weight: bold;
    color: transparent;
    letter-spacing: 2px;
    background-image: linear-gradient(135deg, var(--color2), var(--color4), var(--color6));
    background-clip: text;
    -webkit-background-clip: text;
}

@keyframes animate {
    100% {
        filter: hue-rotate(360deg);
    }
}
</style>
