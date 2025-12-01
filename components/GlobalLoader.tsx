"use client"

import React from "react"

export default function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main loader content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo with pulsing rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute w-32 h-32 rounded-full border-4 border-blue-200 animate-ping-slow"></div>
          {/* Middle ring */}
          <div className="absolute w-24 h-24 rounded-full border-4 border-purple-300 animate-ping-slower"></div>
          
          {/* Main logo circle */}
          <div className="relative w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-float">
            <span className="text-white font-bold text-4xl animate-pulse-subtle">D</span>
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-transparent via-white to-transparent opacity-20 animate-shine"></div>
          </div>
        </div>

        {/* Loading text with dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
              Loading
            </span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-dot"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-dot animation-delay-200"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce-dot animation-delay-400"></span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-progress bg-size-200"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-ping-slower { animation: ping-slower 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shine { animation: shine 2s infinite; }
        .animate-progress { animation: progress 1.5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-in; }
        .animate-bounce-dot { animation: bounce-dot 1.4s infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .bg-size-200 { background-size: 200% 100%; }
      `}</style>
    </div>
  )
}
