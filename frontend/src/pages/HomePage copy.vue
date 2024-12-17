<template>
    <div>
        <h1>活动监控日志</h1>
        <ul>
            <li v-for="log in activityLogs" :key="log.timestamp">
                {{ log.timestamp }} - {{ log.active_window }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSocketStore } from '@/stores/socketStore';

const activityLogs = ref([]);
const socketStore = useSocketStore();

onMounted(() => {
    socketStore.socket.on('activityUpdate', (data) => {
        console.log('Received activity data:', data); // 检查是否收到推送数据
        activityLogs.value.push(data);

        // 限制日志显示的条数
        if (activityLogs.value.length > 10) {
            activityLogs.value.shift();
        }
    });
});
</script>
