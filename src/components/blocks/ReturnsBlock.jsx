import { BarChart2 } from 'lucide-react'

const PERIODS = [
  { key: 'week', label: '주간 (5일)' },
  { key: 'month', label: '월간 (20일)' },
  { key: 'year', label: '년간 (250일)' },
]

export default function ReturnsBlock({ returns }) {
  const maxAbs = Math.max(...Object.values(returns).map(Math.abs), 1)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 size={18} className="text-purple-500" />
        <h3 className="font-bold text-gray-900">수익률 통계</h3>
      </div>

      <div className="space-y-4">
        {PERIODS.map(({ key, label }) => {
          const rate = returns[key]
          const isUp = rate > 0
          const isDown = rate < 0
          const colorClass = isUp ? 'text-red-500' : isDown ? 'text-blue-500' : 'text-gray-400'
          const barColor = isUp ? 'bg-red-400' : isDown ? 'bg-blue-400' : 'bg-gray-300'
          const barWidth = `${Math.abs(rate) / maxAbs * 100}%`

          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">{label}</span>
                <span className={`text-sm font-bold ${colorClass}`}>
                  {rate >= 0 ? '+' : ''}{rate?.toFixed(2)}%
                </span>
              </div>
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`absolute h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{
                    width: barWidth,
                    left: isDown ? 'auto' : '0',
                    right: isDown ? '0' : 'auto',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> 상승
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-400 inline-block" /> 하락
        </span>
      </div>
    </div>
  )
}
