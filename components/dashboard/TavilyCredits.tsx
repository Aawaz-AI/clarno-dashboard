'use client';

type Props = {
  usage: any;
};

export default function TavilyCredits({ usage }: Props) {
  if (!usage) return null;

  const total = usage.total_credits || 0;
  const used = usage.used_credits || 0;
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;

  return (
    <div className="m-4 p-6! bg-linear-to-br from-gray-50 to-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3! bg-blue-100 rounded-xl">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Tavily API Credits</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="group p-6! bg-linear-to-br from-blue-50 via-blue-100 to-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Total Credits</p>
          <p className="text-4xl font-extrabold text-blue-900">{total.toLocaleString()}</p>
        </div>

        <div className="group p-6! bg-linear-to-br from-orange-50 via-orange-100 to-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Used Credits</p>
          <p className="text-4xl font-extrabold text-orange-900">{used.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-6! bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Usage Progress</span>
          <span className="p-2! bg-linear-to-r from-blue-500 to-orange-500 rounded-full text-sm font-bold text-white shadow-md">{percent}%</span>
        </div>

        <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-linear-to-r from-blue-500 via-blue-400 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-lg relative overflow-hidden"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 px-2">
          <span className="text-sm text-gray-600 font-medium">
            <span className="font-bold text-green-600 text-base">{(total - used).toLocaleString()}</span> remaining
          </span>
          <span className="text-sm text-gray-500">
            of <span className="font-bold text-gray-800 text-base">{total.toLocaleString()}</span> total
          </span>
        </div>
      </div>

      <div className="group p-5! bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-300 rounded-full">
            <svg className="w-6 h-6 text-green-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-green-900 mb-1">{(total - used).toLocaleString()} credits available</p>
            <p className="text-sm font-medium text-green-700">Ready for use • System operational</p>
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
