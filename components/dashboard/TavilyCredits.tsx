'use client';

type Props = {
  usage: any;
};

import { useThemeMode } from '@/app/provider';

export default function TavilyCredits({ usage }: Props) {
  if (!usage) return null;

  const total = usage.total_credits || 0;
  const used = usage.used_credits || 0;
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;
  const { theme } = useThemeMode();
  const textPrimary = theme === 'dark' ? '#e2e8f0' : '#0f172a';
  const textSecondary = theme === 'dark' ? '#cbd5e1' : '#475569';
  const cardBg = theme === 'dark' ? 'var(--bg-surface)' : 'linear-gradient(135deg, #f8fafc, #ffffff)';
  const tileBg = theme === 'dark' ? 'rgba(255,255,255,0.04)' : '#f8fafc';
  const barTrack = theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#e2e8f0';
  const barGlow = theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.25)';

  return (
    <div
      className="m-4 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-6 chart-surface p-4!"
      style={{ background: cardBg, borderColor: 'var(--border-subtle)' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 p-2!">
          <div className="p-3 bg-blue-100 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold" style={{ color: textPrimary }}>Tavily API Credits</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-2!">
        <div
          className="group rounded-xl border-2 hover:border-blue-400 hover:shadow-lg transition-all duration-300 p-2!"
          style={{ background: tileBg, borderColor: 'rgba(59,130,246,0.25)' }}
        >
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Total Credits</p>
          <p className="text-4xl font-extrabold" style={{ color: textPrimary }}>{total.toLocaleString()}</p>
        </div>

        <div
          className="group rounded-xl border-2 hover:border-orange-400 hover:shadow-lg transition-all duration-300 p-2!"
          style={{ background: tileBg, borderColor: 'rgba(249,115,22,0.25)' }}
        >
          <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">Used Credits</p>
          <p className="text-4xl font-extrabold" style={{ color: textPrimary }}>{used.toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-2 chart-surface p-4!" style={{ background: cardBg }}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold uppercase tracking-wide" style={{ color: textSecondary }}>Usage Progress</span>
          <span className="bg-linear-to-r from-blue-500 to-orange-500 rounded-full text-sm font-bold text-white shadow-md p-2!">{percent}%</span>
        </div>

        <div className="relative w-full h-6 rounded-full overflow-hidden shadow-inner p-2!" style={{ background: barTrack }}>
          <div
            className="h-full bg-linear-to-r from-blue-500 via-blue-400 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 animate-pulse" style={{ background: barGlow }}></div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 px-2">
          <span className="text-sm font-medium" style={{ color: textSecondary }}>
            <span className="font-bold text-green-400 text-base">{(total - used).toLocaleString()}</span> remaining
          </span>
          <span className="text-sm" style={{ color: textSecondary }}>
            of <span className="font-bold text-base" style={{ color: textPrimary }}>{total.toLocaleString()}</span> total
          </span>
        </div>
      </div>

      <div
        className="group rounded-xl border-2 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer p-4!"
        style={{ background: tileBg, borderColor: 'rgba(16,185,129,0.35)' }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-300 rounded-full">
            <svg className="w-6 h-6 text-green-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold mb-1" style={{ color: textPrimary }}>{(total - used).toLocaleString()} credits available</p>
            <p className="text-sm font-medium" style={{ color: textSecondary }}>Ready for use • System operational</p>
          </div>
          <div className="px-3 py-1 bg-green-600 rounded-full">
            <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
