import { X, Star } from 'lucide-react'

export default function WatchList({ watchList, onSelect, onRemove }) {
  if (watchList.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-700">관심종목</span>
        </div>
        <p className="text-sm text-gray-400">검색한 종목이 여기에 표시됩니다.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-semibold text-gray-700">관심종목</span>
        <span className="text-xs text-gray-400">({watchList.length}/10)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {watchList.map((stock) => (
          <div
            key={stock.code}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <button
              onClick={() => onSelect(stock.name)}
              className="text-sm text-gray-700 group-hover:text-blue-600 font-medium"
            >
              {stock.name}
            </button>
            <span className="text-xs text-gray-400">{stock.code}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(stock.code)
              }}
              className="ml-1 text-gray-300 hover:text-red-400 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
