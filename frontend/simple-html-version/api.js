/**
 * The Matrix - Frontend API Service
 * Handles all backend API calls
 */

const API_BASE_URL = 'http://localhost:8000';

class MatrixAPI {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.ws = null;
    }

    // Helper method for GET requests
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (GET ${endpoint}):`, error);
            return null;
        }
    }

    // Helper method for POST requests
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error (POST ${endpoint}):`, error);
            return null;
        }
    }

    // Get all alerts
    async getAlerts(limit = 20, severity = null) {
        let endpoint = `/api/v1/alerts?limit=${limit}`;
        if (severity) {
            endpoint += `&severity=${severity}`;
        }
        return await this.get(endpoint);
    }

    // Get specific alert
    async getAlert(alertId) {
        return await this.get(`/api/v1/alerts/${alertId}`);
    }

    // Get system stats
    async getStats() {
        return await this.get('/api/v1/stats');
    }

    // Get threat score
    async getThreatScore() {
        return await this.get('/api/v1/threat-score');
    }

    // Get agents
    async getAgents() {
        return await this.get('/api/v1/agents');
    }

    // Block IP
    async blockIP(ipAddress) {
        return await this.post('/api/v1/block-ip', { ip_address: ipAddress });
    }

    // Unblock IP
    async unblockIP(ipAddress) {
        return await this.post('/api/v1/unblock-ip', { ip_address: ipAddress });
    }

    // Health check
    async healthCheck() {
        return await this.get('/health');
    }

    // Connect to WebSocket
    connectWebSocket(onMessage) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('WebSocket already connected');
            return;
        }

        this.ws = new WebSocket('ws://localhost:8000/ws');

        this.ws.onopen = () => {
            console.log('✅ WebSocket connected');
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (onMessage) {
                onMessage(data);
            }
        };

        this.ws.onerror = (error) => {
            console.error('❌ WebSocket error:', error);
        };

        this.ws.onclose = () => {
            console.log('🔌 WebSocket disconnected');
            // Auto-reconnect after 5 seconds
            setTimeout(() => {
                console.log('🔄 Reconnecting WebSocket...');
                this.connectWebSocket(onMessage);
            }, 5000);
        };
    }

    // Disconnect WebSocket
    disconnectWebSocket() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

// Create global API instance
const api = new MatrixAPI();

console.log('> Matrix API Service Initialized');