import { useState, useRef, useEffect } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { suggestStocks } from '../data/stockList'

function HighlightMatch({ text, query }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-100 text-yellow-800 font-semibold rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  )
}

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const wrapperRef = useRef(null)

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    setActiveIdx(-1)
    if (val.trim().length >= 2) {
      const results = suggestStocks(val)
      setSuggestions(results)
      setOpen(results.length > 0)
    } else {
      setSuggestions([])
      setOpen(false)
    }
  }

  const handleSelect = (stock) => {
    setQuery(stock.name)
    setSuggestions([])
    setOpen(false)
    onSearch(stock.code)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    if (activeIdx >= 0 && suggestions[activeIdx]) {
      handleSelect(suggestions[activeIdx])
    } else {
      setOpen(false)
      onSearch(query.trim())
    }
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((prev) => Math.max(prev - 1, -1))
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }

  // 키보드 선택 항목 자동 스크롤
  useEffect(() => {
    if (activeIdx >= 0 && listRef.current) {
      const item = listRef.current.children[activeIdx]
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIdx])

  return (
    <div ref={wrapperRef} className="w-full relative">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="종목명 또는 종목코드 입력 (예: 삼성전자, 005930)"
            className="w-full px-5 py-4 pr-14 text-base rounded-2xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 transition-all"
            disabled={loading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 p-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* 자동완성 드롭다운 */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-1.5">
            <TrendingUp size={13} className="text-blue-400" />
            <span className="text-xs text-gray-400 font-medium">
              종목 검색결과 {suggestions.length}개
            </span>
          </div>
          <ul ref={listRef} className="max-h-72 overflow-y-auto py-1">
            {suggestions.map((stock, i) => {
              const isActive = i === activeIdx
              return (
                <li key={stock.code}>
                  <button
                    type="button"
                    onMouseDown={() => handleSelect(stock)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* 마켓 배지 */}
                    <span
                      className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        stock.market === 'KOSPI'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {stock.market}
                    </span>

                    {/* 종목명 (하이라이트) */}
                    <span className="flex-1 text-sm text-gray-800 font-medium truncate">
                      <HighlightMatch text={stock.name} query={query} />
                    </span>

                    {/* 종목코드 (하이라이트) */}
                    <span className="shrink-0 text-xs text-gray-400 font-mono">
                      <HighlightMatch text={stock.code} query={query} />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
