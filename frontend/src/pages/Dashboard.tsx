import { useState } from 'react'
import MatrixRain from '../components/effects/MatrixRain'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Home,
  Settings,
  LogOut
} from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [activeAlerts] = useState(12)
  const [threatScore] = useState(34)
  const [blockedThreats] = useState(247)

  return (
    <div className="relative min-h-screen bg-matrix-black">
      <MatrixRain />

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-2 border-matrix-green bg-matrix-black/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-2xl font-bold text-matrix-green font-terminal cursor-pointer" onClick={() => navigate('/')}>
                  {'> THE_MATRIX'}
                </div>
                <div className="hidden md:flex items-center space-x-4 text-sm">
                  <div className="text-matrix-green/70">SNSM Dashboard</div>
                  <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                  <div className="text-matrix-green">SYSTEM ACTIVE</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Home size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings size={20} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                  <LogOut size={20} />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Active Alerts</CardTitle>
                <AlertTriangle className="text-red-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-matrix-green">{activeAlerts}</div>
                <p className="text-xs text-matrix-green/60 mt-1">+3 from last hour</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Threat Score</CardTitle>
                <Activity className="text-yellow-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-matrix-green">{threatScore}/100</div>
                <p className="text-xs text-matrix-green/60 mt-1">Elevated status</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Blocked Threats</CardTitle>
                <Shield className="text-green-500" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-matrix-green">{blockedThreats}</div>
                <p className="text-xs text-matrix-green/60 mt-1">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Network Status</CardTitle>
                <TrendingUp className="text-matrix-green" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-matrix-green">98.7%</div>
                <p className="text-xs text-matrix-green/60 mt-1">Uptime</p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Dashboard Under Construction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">🚧</div>
                <h3 className="text-2xl font-bold text-matrix-green font-terminal">
                  {'> BUILDING_IN_PROGRESS'}
                </h3>
                <p className="text-matrix-white/70 max-w-2xl mx-auto">
                  The full SNSM dashboard with live monitoring, threat analysis, 
                  and real-time alerts is currently being built. Check back soon!
                </p>
                <div className="pt-4">
                  <Button onClick={() => navigate('/')}>
                    Return to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default Dashboard