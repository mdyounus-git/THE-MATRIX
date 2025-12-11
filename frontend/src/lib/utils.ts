import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date/time for Matrix theme
export function formatMatrixTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Format threat score with color
export function getThreatColor(score: number): string {
  if (score >= 81) return 'text-red-500'
  if (score >= 61) return 'text-orange-500'
  if (score >= 41) return 'text-yellow-500'
  if (score >= 21) return 'text-matrix-green'
  return 'text-green-500'
}

// Get threat level text
export function getThreatLevel(score: number): string {
  if (score >= 81) return 'CRITICAL'
  if (score >= 61) return 'HIGH THREAT'
  if (score >= 41) return 'ELEVATED'
  if (score >= 21) return 'SUSPICIOUS'
  return 'SAFE'
}

// Generate random Matrix characters
export function getRandomMatrixChar(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'
  return chars[Math.floor(Math.random() * chars.length)]
}

// Format bytes to human readable
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format IP address
export function formatIP(ip: string): string {
  return ip.padEnd(15, ' ')
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Delay function for animations
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}