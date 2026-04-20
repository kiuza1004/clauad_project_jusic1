import { DollarSign } from 'lucide-react'

export default function DividendBlock({ dividends }) {
  if (!dividends || dividends.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={18} className="text-green-500" />
          <h3 className="font-bold text-gray-900">배당 정보</h3>
        </div>
        <p className="text-sm text-gray-400">배당 정보가 없습니다.</p>
      </div>
    )
  }

  const maxTotal = Math.max(...dividends.map((d) => d.total))

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign size={18} className="text-green-500" />
        <h3 className="font-bold text-gray-900">배당 정보</h3>
        <span className="text-xs text-gray-400">(최근 2년)</span>
      </div>

      <div className="space-y-4">
        {dividends.map((d) => (
          <div key={d.year} className="p-4 bg-green-50 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-gray-700">{d.year}년</span>
              <span className="text-sm font-bold text-green-600">
                수익률 {d.yield?.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">연간 배당금 합계</span>
              <span className="text-base font-bold text-gray-900">
                {d.total?.toLocaleString('ko-KR')}원
              </span>
            </div>
            <div className="mt-2 h-1.5 bg-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${(d.total / maxTotal) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
