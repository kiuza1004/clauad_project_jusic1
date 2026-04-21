import { useState } from 'react'
import { Layers, Search } from 'lucide-react'
import { TAGGED_STOCKS } from '../data/stockThemes'

export default function ThemeStocks({ onSelect }) {
  const [keyword, setKeyword] = useState('')

  const trimmed = keyword.trim()

  const results = trimmed.length >= 1
    ? TAGGED_STOCKS.filter(
        (stock) =>
          stock.tags.some((tag) => tag.includes(trimmed)) ||
          stock.name.includes(trimmed)
      )
    : []

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Layers size={15} className="text-indigo-500" />
        <span className="text-sm font-semibold text-gray-700">테마주 탐색</span>
        <span className="text-xs text-gray-400">종목을 클릭하면 바로 조회됩니다</span>
      </div>

      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="테마 검색 (예: 방산, AI, 바이오, 배터리, 선거, 메타버스...)"
          className="w-full pl-8 pr-4 py-2 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent placeholder-gray-400 transition-all"
        />
      </div>

      {trimmed.length === 0 && (
        <p className="text-xs text-gray-400 py-2">
          테마 키워드를 입력하면 관련 종목이 표시됩니다.
        </p>
      )}

      {trimmed.length >= 1 && results.length === 0 && (
        <p className="text-xs text-gray-400 py-2">
          검색어에 맞는 테마주가 없습니다.
        </p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-xs text-gray-400 mb-2">관련 종목 {results.length}개</p>
          <div className="flex flex-wrap gap-2">
            {results.map((stock) => (
              <button
                key={stock.code}
                onClick={() => onSelect(stock.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors group"
              >
                <span
                  className={`text-[9px] font-bold px-1 py-0.5 rounded ${
                    stock.market === 'KOSPI'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-emerald-100 text-emerald-600'
                  }`}
                >
                  {stock.market}
                </span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">
                  {stock.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
