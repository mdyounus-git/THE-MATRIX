"""
Real-time Network Traffic Monitor Agent
Captures actual network packets and sends to backend
"""

from scapy.all import sniff, IP, TCP, UDP, ICMP
import asyncio
import aiohttp
import json
from datetime import datetime
import psutil
from collections import defaultdict
import time
import threading

class NetworkAgent:
    def __init__(self, backend_url="http://localhost:8000"):
        self.backend_url = backend_url
        self.packet_count = 0
        self.connection_tracker = defaultdict(int)
        self.suspicious_ips = set()
        self.start_time = time.time()
        
    def analyze_packet(self, packet):
        """Analyze a single packet for threats"""
        if not packet.haslayer(IP):
            return None
            
        self.packet_count += 1
        
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        
        self.connection_tracker[src_ip] += 1
        
        alert = None
        
        if self.connection_tracker[src_ip] > 50:
            if src_ip not in self.suspicious_ips:
                self.suspicious_ips.add(src_ip)
                alert = {
                    "type": "Port Scan Detected",
                    "severity": "high",
                    "source": src_ip,
                    "destination": dst_ip,
                    "description": f"Possible port scan: {self.connection_tracker[src_ip]} connections from {src_ip}",
                    "threatScore": 75
                }
        
        if packet.haslayer(TCP):
            dst_port = packet[TCP].dport
            if dst_port in [4444, 5555, 6666, 31337]:
                alert = {
                    "type": "Suspicious Port Access",
                    "severity": "critical",
                    "source": src_ip,
                    "destination": f"{dst_ip}:{dst_port}",
                    "description": f"Access to suspicious port {dst_port}",
                    "threatScore": 90
                }
        
        if packet.haslayer(ICMP):
            if self.connection_tracker[src_ip] > 100:
                alert = {
                    "type": "ICMP Flood Detected",
                    "severity": "medium",
                    "source": src_ip,
                    "destination": dst_ip,
                    "description": f"Possible ICMP flood from {src_ip}",
                    "threatScore": 60
                }
        
        return alert
    
    async def send_alert(self, alert):
        """Send alert to backend"""
        try:
            async with aiohttp.ClientSession() as session:
                alert_data = {
                    "id": f"REAL-{int(time.time() * 1000)}",
                    "timestamp": datetime.now().isoformat(),
                    "status": "active",
                    **alert
                }
                
                async with session.post(
                    f"{self.backend_url}/api/v1/real-alert",
                    json=alert_data,
                    timeout=aiohttp.ClientTimeout(total=2)
                ) as response:
                    if response.status == 200:
                        print(f"✅ Alert sent: {alert['type']}")
        except Exception as e:
            pass
    
    async def send_stats(self):
        """Send network statistics to backend"""
        try:
            net_io = psutil.net_io_counters()
            
            stats = {
                "packets_captured": self.packet_count,
                "bytes_sent": net_io.bytes_sent,
                "bytes_recv": net_io.bytes_recv,
                "active_connections": len(psutil.net_connections()),
                "suspicious_ips": len(self.suspicious_ips),
                "uptime": int(time.time() - self.start_time)
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.backend_url}/api/v1/real-stats",
                    json=stats,
                    timeout=aiohttp.ClientTimeout(total=2)
                ) as response:
                    if response.status == 200:
                        print(f"📊 Stats: {self.packet_count} packets")
        except Exception as e:
            pass
    
    def packet_callback(self, packet):
        """Callback for each captured packet"""
        alert = self.analyze_packet(packet)
        
        if alert:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                loop.run_until_complete(self.send_alert(alert))
            finally:
                loop.close()
    
    def start_capture(self):
        """Start capturing packets"""
        print("=" * 60)
        print("THE MATRIX - Real Network Monitor Agent")
        print("=" * 60)
        print(f"Backend: {self.backend_url}")
        print("Capturing on: all interfaces")
        print("WARNING: Requires Administrator privileges!")
        print("=" * 60)
        
        async def stats_loop():
            while True:
                await self.send_stats()
                await asyncio.sleep(5)
        
        stats_thread = threading.Thread(
            target=lambda: asyncio.run(stats_loop()), 
            daemon=True
        )
        stats_thread.start()
        
        try:
            print("Starting packet capture...")
            print("Monitoring your network traffic...")
            sniff(prn=self.packet_callback, store=False, count=0)
        except PermissionError:
            print("ERROR: Permission denied!")
            print("Run PowerShell as Administrator and try again")
        except KeyboardInterrupt:
            print("\nStopping capture...")
        except Exception as e:
            print(f"ERROR: {e}")
            print("Make sure WinPcap or Npcap is installed")

def main():
    print("\n🔒 Initializing Network Monitor...\n")
    agent = NetworkAgent()
    agent.start_capture()

if __name__ == "__main__":
    main()
