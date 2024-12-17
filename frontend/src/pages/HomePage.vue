<template>
    <div class="timeline-container">
        <el-timeline>
            <el-timeline-item center v-for="(status, index) in activityLogs" :key="index"
                :timestamp="formatTimestamp(status.timestamp)" placement="top">
                <StatusCard :activeWindow="status.active_window" :name="status.name" :desc="status.desc"
                    :color="status.color" :icon="status.icon" />
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSocketStore } from '@/stores/socketStore';
import StatusCard from '@/components/StatusCard.vue'; // 引入 StatusCard 组件

// 状态数据
const activityLogs = ref([]);
const maxLogs = 5; // 限制时间轴最大条目数

// 格式化时间戳
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
};

// 动态生成状态信息
const generateStatus = (activeWindow, timestamp) => {
    const lowerWindow = activeWindow.toLowerCase();
    if (lowerWindow.includes('code')) {
        return {
            name: '工作中',
            desc: '正在写代码',
            color: 'status-work',
            icon: 'el-icon-monitor',
            active_window: activeWindow,
            timestamp,
        };
    } else if (lowerWindow.includes('edge') || lowerWindow.includes('browser')) {
        return {
            name: '休闲中',
            desc: '正在浏览网页，可能在学习。',
            color: 'status-relax',
            icon: 'el-icon-sunrise',
            active_window: activeWindow,
            timestamp,
        };
    } else {
        return {
            name: '未知状态',
            desc: '当前状态无法识别。',
            color: 'status-unknown',
            icon: 'el-icon-question-filled',
            active_window: activeWindow,
            timestamp,
        };
    }
};

// WebSocket 监听
const socketStore = useSocketStore();
onMounted(() => {
    socketStore.socket.on('activityUpdate', (data) => {
        console.log('Received activity data:', data);

        // 添加到时间轴
        const newStatus = generateStatus(data.active_window, data.timestamp);
        activityLogs.value.push(newStatus);

        // 限制时间轴长度
        if (activityLogs.value.length > maxLogs) {
            activityLogs.value.shift();
        }
    });
});
</script>

<style scoped>
/* 容器样式 */
.timeline-container {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}
</style>
