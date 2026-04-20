import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatPrice, formatMarketCap, formatVolume, formatChange, formatChangeRate } from '../../utils/format'

export default function BasicInfoBlock({ stock }) {
  const isUp = stock.change > 0
  const isDown = stock.change < 0
  const colorClass = isUp ? 'text-red-500' : isDown ? 'text-blue-500' : 'text-gray-500'
  const bgClass = isUp ? 'bg-red-50' : isDown ? 'bg-blue-50' : 'bg-gray-50'
  const Icon = isUp ? TrendingUp : isDown ? TrendingDown : Minus

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">{stock.name}</h2>
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-md font-mono">
              {stock.code}
            </span>
            <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded-md">
              {stock.market}
            </span>
          </div>
          <p className="text-xs text-gray-400">기준: 전일 종가</p>
        </div>
      </div>

      <div className={`flex items-center gap-3 p-4 rounded-xl ${bgClass} mb-4`}>
        <Icon size={28} className={colorClass} />
        <div>
          <p className="text-2xl font-bold text-gray-900">{formatPrice(stock.currentPrice)}</p>
          <p className={`text-sm font-medium ${colorClass}`}>
            {formatChange(stock.change)} ({formatChangeRate(stock.changeRate)})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="시가총액" value={formatMarketCap(stock.marketCap)} />
        <InfoItem label="거래량" value={formatVolume(stock.volume)} />
        <InfoItem label="시가" value={formatPrice(stock.open)} />
        <InfoItem label="고가" value={formatPrice(stock.high)} />
        <InfoItem label="저가" value={formatPrice(stock.low)} />
        <InfoItem label="전일 종가" value={formatPrice(stock.prevClose)} />
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="flex flex-col p-3 bg-gray-50 rounded-xl">
      <span className="text-xs text-gray-400 mb-1">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  )
}
