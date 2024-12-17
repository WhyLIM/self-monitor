import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null,
        messages: [],
    }),
    actions: {
        connect() {
            this.socket = io('http://localhost:9010');

            this.socket.on('connect', () => {
                console.log('Connected to Socket.IO server');
            });

            this.socket.on('message', (data) => {
                console.log('Message from server:', data);
                this.messages.push(data); // 存储消息
            });

            this.socket.on('connect_error', (err) => {
                console.error('Connection error:', err);
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });
        },
        sendMessage(message) {
            if (this.socket) {
                this.socket.emit('message', message);
            }
        },
    },
});
