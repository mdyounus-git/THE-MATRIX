import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { Button } from '../components/ui/button'
import MatrixRain from '../components/effects/MatrixRain'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-matrix-black flex items-center justify-center overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 text-center space-y-8 p-8">
        <div className="flex justify-center">
          <AlertTriangle size={120} className="text-red-500 animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-matrix-green font-terminal">
            404
          </h1>
          <h2 className="text-3xl font-bold text-matrix-green">
            {'> ACCESS_DENIED'}
          </h2>
          <p className="text-xl text-matrix-white/70 max-w-md mx-auto">
            The requested resource does not exist in the Matrix database
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <div className="text-matrix-green/50 font-mono text-sm">
            ERROR_CODE: ROUTE_NOT_FOUND
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound