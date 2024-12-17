import { io } from 'socket.io-client';

const socket = io('http://localhost:9010'); // 指向后端地址

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
    socket.emit('message', 'Hello, server!');
});

socket.on('message', (data) => {
    console.log('Message from server:', data);
});

socket.on('connect_error', (err) => {
    console.error('Connection error:', err);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
