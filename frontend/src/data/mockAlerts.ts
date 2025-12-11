export interface Alert {
  id: string
  timestamp: Date
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: string
  source: string
  destination: string
  description: string
  status: 'active' | 'investigating' | 'resolved'
  threatScore: number
}

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    timestamp: new Date(),
    severity: 'critical',
    type: 'Port Scan Detected',
    source: '192.168.1.45',
    destination: '10.0.0.1',
    description: 'Multiple port scan attempts detected from external source',
    status: 'active',
    threatScore: 95
  },
  {
    id: 'ALT-002',
    timestamp: new Date(Date.now() - 120000),
    severity: 'high',
    type: 'Suspicious DNS Query',
    source: '192.168.1.78',
    destination: '8.8.8.8',
    description: 'DNS tunneling pattern detected - possible data exfiltration',
    status: 'investigating',
    threatScore: 78
  },
  {
    id: 'ALT-003',
    timestamp: new Date(Date.now() - 300000),
    severity: 'medium',
    type: 'Unusual Traffic Pattern',
    source: '192.168.1.102',
    destination: '203.45.67.89',
    description: 'Abnormal traffic volume detected to unknown destination',
    status: 'investigating',
    threatScore: 55
  },
  {
    id: 'ALT-004',
    timestamp: new Date(Date.now() - 450000),
    severity: 'low',
    type: 'Failed Login Attempt',
    source: '192.168.1.200',
    destination: 'auth-server',
    description: 'Multiple failed authentication attempts',
    status: 'resolved',
    threatScore: 25
  },
  {
    id: 'ALT-005',
    timestamp: new Date(Date.now() - 600000),
    severity: 'high',
    type: 'Malware Signature',
    source: '192.168.1.156',
    destination: 'malicious-domain.xyz',
    description: 'Known malware communication pattern detected',
    status: 'active',
    threatScore: 88
  }
]

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'text-red-500 border-red-500'
    case 'high':
      return 'text-orange-500 border-orange-500'
    case 'medium':
      return 'text-yellow-500 border-yellow-500'
    case 'low':
      return 'text-green-500 border-green-500'
    default:
      return 'text-matrix-green border-matrix-green'
  }
}