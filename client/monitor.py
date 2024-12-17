import time
import platform
import psutil
import json
from datetime import datetime
import socketio

# 初始化 Socket.IO 客户端
sio = socketio.Client()

# 获取当前活动窗口 (Windows 示例)
def get_active_window():
    if platform.system() == "Windows":
        try:
            import win32gui
            window = win32gui.GetForegroundWindow()
            return win32gui.GetWindowText(window)
        except ImportError:
            return "Unable to get window title (win32gui not installed)"
    else:
        return "Unsupported platform"

# 连接事件
@sio.event
def connect():
    print("Connected to WebSocket server")

# 断开事件
@sio.event
def disconnect():
    print("Disconnected from WebSocket server")

# 发送活动数据
def send_activity_data():
    while True:
        active_window = get_active_window()
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        data = {
            "active_window": active_window,
            "timestamp": timestamp,
        }
        print("Sending data:", data)
        sio.emit("activityUpdate", data)  # 向后端发送活动数据
        time.sleep(5)

if __name__ == "__main__":
    try:
        sio.connect("http://localhost:9010")  # 连接 Socket.IO 服务
        send_activity_data()
    except KeyboardInterrupt:
        print("Exiting...")
        sio.disconnect()
