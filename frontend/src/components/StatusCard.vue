<template>
    <a class="card card1">
        <!-- 左侧图标 -->
        <div class="card-icon" :class="color">
            <font-awesome-icon :icon="icon" class="icon" />
        </div>

        <!-- 右侧内容 -->
        <div class="card-content">
            <p class="status-name">{{ name }}</p>
            <p class="status-desc">{{ desc }}</p>
            <p class="status-window">正在访问: {{ activeWindow }}</p>
        </div>

        <!-- 右上角箭头 -->
        <div class="go-corner">
            <font-awesome-icon icon="fa-solid fa-arrow-right" class="go-arrow" />
        </div>
    </a>
</template>

<script setup>
defineProps({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    activeWindow: {
        type: String,
        required: true,
    },
    icon: {
        type: Array,
        required: true, // FontAwesome 图标定义
    },
    color: {
        type: String,
        required: true, // 状态对应的颜色类
    },
});
</script>

<style scoped>
/* 卡片基础样式 */
.card {
    display: flex;
    align-items: center;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 16px;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
}

/* 鼠标悬浮效果 */
.card1 {
    background-color: #f2f8f9;
    border: 1px solid #f2f8f9;
    transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
}

.card1:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.card1:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
}

.card1:hover:before {
    transform: scale(21);
}

.card1:hover .status-name,
.card1:hover .status-desc,
.card1:hover .status-window {
    color: white;
}

/* 左侧图标样式 */
.card-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    transition: background-color 0.25s;
}

.card-icon.work {
    background-color: #e8f5e9;
    color: #388e3c;
}

.card-icon.relax {
    background-color: #e3f2fd;
    color: #0277bd;
}

.card-icon.unknown {
    background-color: #fbe9e7;
    color: #d84315;
}

.icon {
    font-size: 1.5rem;
}

/* 卡片内容样式 */
.card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.status-name {
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    color: #333;
}

.status-desc {
    font-size: 0.9rem;
    margin: 4px 0;
    color: #666;
}

.status-window {
    font-size: 0.8rem;
    color: #888;
}

/* 右上角箭头样式 */
.go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color: #00838d;
    border-radius: 0 4px 0 32px;
}

.go-arrow {
    color: white;
    font-size: 1.2rem;
}

/* 动画 */
@keyframes loadGradient {
    100% {
        background-position: -100% 0;
    }
}
</style>
