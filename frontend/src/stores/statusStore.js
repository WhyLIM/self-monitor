import { defineStore } from 'pinia';
import axios from 'axios';

export const useStatusStore = defineStore('status', {
    state: () => ({
        statusList: [],
        currentStatus: null,
    }),
    actions: {
        // 获取状态列表
        async fetchStatusList() {
            try {
                const { data } = await axios.get('http://localhost:9010/api/status/list');
                this.statusList = data;
            } catch (error) {
                console.error('获取状态列表失败:', error);
            }
        },
        // 更新状态
        async updateStatus(id) {
            try {
                const response = await axios.post('http://localhost:9010/api/status/update', { id });
                this.currentStatus = response.data.currentStatus;
            } catch (error) {
                console.error('更新状态失败:', error);
            }
        },
    },
});
