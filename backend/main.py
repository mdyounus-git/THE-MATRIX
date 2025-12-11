from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from datetime import datetime
import asyncio
from typing import List

APP_TITLE = "The Matrix Cybersecurity Platform"
APP_VERSION = "1.0.0"

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Client connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"Client disconnected. Total: {len(self.active_connections)}")

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                print(f"Broadcast error: {e}")

manager = ConnectionManager()

real_alerts = []
real_stats = {
    "packets_captured": 0,
    "bytes_sent": 0,
    "bytes_recv": 0,
    "active_connections": 0,
    "suspicious_ips": 0,
    "uptime": 0
}

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=" * 60)
    print("THE MATRIX Backend - REAL DATA MODE")
    print("=" * 60)
    print(f"Server: http://localhost:8000")
    print(f"Docs: http://localhost:8000/docs")
    print("Waiting for network_agent.py data...")
    print("=" * 60)
    yield
    print("Shutting down...")

app = FastAPI(
    title=APP_TITLE,
    version=APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "The Matrix - Real Data Mode",
        "version": APP_VERSION,
        "status": "online",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/v1/stats")
async def get_stats():
    threat_score = min(100, real_stats.get("suspicious_ips", 0) * 20)
    
    return {
        "success": True,
        "data": {
            "packets_captured": real_stats.get("packets_captured", 0),
            "suspicious_ips": real_stats.get("suspicious_ips", 0),
            "active_connections": real_stats.get("active_connections", 0),
            "bytes_sent": real_stats.get("bytes_sent", 0),
            "bytes_recv": real_stats.get("bytes_recv", 0),
            "uptime": real_stats.get("uptime", 0),
            "threatScore": threat_score,
            "activeAlerts": len(real_alerts)
        },
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/v1/alerts")
async def get_alerts(limit: int = 20):
    return {
        "success": True,
        "count": len(real_alerts[:limit]),
        "data": real_alerts[:limit]
    }

@app.post("/api/v1/real-alert")
async def receive_real_alert(alert: dict):
    real_alerts.insert(0, alert)
    if len(real_alerts) > 100:
        real_alerts.pop()
    
    await manager.broadcast({
        "type": "new_alert",
        "data": alert
    })
    
    print(f"🚨 ALERT: {alert['type']} from {alert['source']}")
    return {"success": True}

@app.post("/api/v1/real-stats")
async def receive_real_stats(stats: dict):
    global real_stats
    real_stats = stats
    print(f"📊 {stats['packets_captured']} packets | {stats['suspicious_ips']} suspicious IPs")
    return {"success": True}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    
    try:
        await websocket.send_json({
            "type": "connection",
            "message": "Connected to The Matrix",
            "timestamp": datetime.now().isoformat()
        })
        
        while True:
            data = await websocket.receive_text()
            await websocket.send_json({
                "type": "echo",
                "message": f"Received: {data}",
                "timestamp": datetime.now().isoformat()
            })
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )