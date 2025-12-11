import { useNavigate } from 'react-router-dom'
import { Shield, Users, Gamepad2, Network } from 'lucide-react'
import MatrixRain from '../components/effects/MatrixRain'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const HomePage = () => {
  const navigate = useNavigate()

  const modules = [
    {
      id: 1,
      title: 'Smart Network Security',
      description: 'Real-time network monitoring, IDS/IPS, threat detection and automated response',
      icon: Network,
      path: '/dashboard',
      color: 'text-matrix-green',
      features: ['Live Monitoring', 'Threat Scoring', 'Auto Blocking', 'Deep Packet Inspection']
    },
    {
      id: 2,
      title: 'Cyberbullying Protection',
      description: 'AI-powered toxicity detection and content moderation for social platforms',
      icon: Shield,
      path: '/cyberbullying',
      color: 'text-blue-400',
      features: ['NLP Analysis', 'Real-time Alerts', 'Content Filtering', 'Parent Dashboard']
    },
    {
      id: 3,
      title: 'Incident Response Simulator',
      description: 'Gamified cyber range with realistic attack scenarios and SOC training',
      icon: Gamepad2,
      path: '/simulator',
      color: 'text-purple-400',
      features: ['Attack Scenarios', 'XP & Badges', 'SOC Training', 'MITRE ATT&CK']
    },
    {
      id: 4,
      title: 'Community Connect',
      description: 'Collaborative ecosystem for sharing threat intelligence and cybersecurity knowledge',
      icon: Users,
      path: '/community',
      color: 'text-yellow-400',
      features: ['Q&A Forum', 'Incident Sharing', 'Expert Network', 'Cyber News Feed']
    }
  ]

  return (
    <div className="relative min-h-screen bg-matrix-black overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b-2 border-matrix-green bg-matrix-black/90 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-matrix-green font-terminal">
                  {'> THE_MATRIX'}
                </div>
                <div className="hidden md:block text-sm text-matrix-green/70">
                  v1.0.0 | SYSTEM ONLINE
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Enter System
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="space-y-6 fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-matrix-green font-terminal animate-pulse-glow">
              THE MATRIX
            </h1>
            <p className="text-2xl md:text-3xl text-matrix-green/80 font-mono">
              Unified Cybersecurity Intelligence Platform
            </p>
            <p className="text-lg text-matrix-white/60 max-w-3xl mx-auto">
              Next-generation platform combining network protection, social safety, 
              cyber training, and community intelligence under one unified interface
            </p>
            <div className="flex justify-center gap-4 pt-6">
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8"
              >
                Launch Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
              >
                Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-matrix-green font-terminal mb-4">
              {'> SELECT_MODULE'}
            </h2>
            <p className="text-matrix-white/70">
              Choose from four integrated cybersecurity modules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <Card
                key={module.id}
                className="group cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(module.path)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-matrix-black border-2 border-matrix-green ${module.color}`}>
                        <module.icon size={32} />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-matrix-green-dark transition-colors">
                          {module.title}
                        </CardTitle>
                        <div className="text-xs text-matrix-green/50 font-mono mt-1">
                          MODULE_{module.id.toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-2">
                    {module.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-matrix-green/70 border border-matrix-green/30 rounded px-2 py-1"
                      >
                        • {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(module.path)
                    }}
                  >
                    Access Module →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20 border-t-2 border-matrix-green/30">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-matrix-green font-terminal mb-4">
              {'> PLATFORM_FEATURES'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 border border-matrix-green/30 rounded-lg hover:bg-matrix-green/5 transition-colors">
              <div className="text-5xl">🔒</div>
              <h3 className="text-xl font-bold text-matrix-green">Enterprise-Grade Security</h3>
              <p className="text-matrix-white/60">
                Military-grade encryption, zero-trust architecture, and continuous monitoring
              </p>
            </div>

            <div className="text-center space-y-4 p-6 border border-matrix-green/30 rounded-lg hover:bg-matrix-green/5 transition-colors">
              <div className="text-5xl">⚡</div>
              <h3 className="text-xl font-bold text-matrix-green">Real-Time Analysis</h3>
              <p className="text-matrix-white/60">
                Instant threat detection with sub-second response times and automated blocking
              </p>
            </div>

            <div className="text-center space-y-4 p-6 border border-matrix-green/30 rounded-lg hover:bg-matrix-green/5 transition-colors">
              <div className="text-5xl">🤖</div>
              <h3 className="text-xl font-bold text-matrix-green">AI-Powered Intelligence</h3>
              <p className="text-matrix-white/60">
                Machine learning models for anomaly detecti