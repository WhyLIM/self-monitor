import json
from websocket import create_connection

try:
    ws = create_connection("ws://localhost:9010")
    print("Connected to WebSocket server!")

    # 发送 JSON 格式消息
    message = json.dumps({
        "event": "activityData",
        "data": {"message": "Test message from client"}
    })
    ws.send(message)

    response = ws.recv()
    print(f"Message from server: {response}")
    ws.close()
except Exception as e:
    print(f"WebSocket connection failed: {e}")
