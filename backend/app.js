const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // 引入 cors

const app = express();
app.use(cors()); // 启用 CORS 中间件，必须在路由和 socket.io 初始化之前

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // 允许的前端来源
        methods: ['GET', 'POST'],       // 允许的请求方法
    },
});

app.get('/', (req, res) => {
    res.send('WebSocket server is running');
});

io.on('connection', (socket) => {
    console.log('Socket.IO client connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message from client:', data);
        socket.emit('message', `Echo: ${data}`);
    });

    // 监听来自客户端的活动数据
    socket.on('activityUpdate', (data) => {
        console.log('Received activity data from client:', data);

        // 广播数据给所有连接的客户端
        io.emit('activityUpdate', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Socket.IO client disconnected:', socket.id);
    });
});

const PORT = 9010;
server.listen(PORT, () => {
    console.log(`WebSocket server is running at ws://localhost:${PORT}`);
});

// 测试推送逻辑
// setInterval(() => {
//     const activityData = {
//         timestamp: new Date().toISOString(),
//         active_window: `App-${Math.floor(Math.random() * 100)}`,
//     };
//     console.log('Emitting activityUpdate:', activityData);
//     io.emit('activityUpdate', activityData);
// }, 5000);
