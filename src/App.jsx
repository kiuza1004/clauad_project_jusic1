import { useState } from 'react'
import { AlertCircle, Loader2, TrendingUp } from 'lucide-react'
import SearchBar from './components/SearchBar'
import WatchList from './components/WatchList'
import BasicInfoBlock from './components/blocks/BasicInfoBlock'
import ReturnsBlock from './components/blocks/ReturnsBlock'
import DividendBlock from './components/blocks/DividendBlock'
import MediaBlock from './components/blocks/MediaBlock'
import { useWatchList } from './hooks/useWatchList'
import { fetchStock } from './services/stockApi'

export default function App() {
  const [stock, setStock] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { watchList, addToWatchList, removeFromWatchList } = useWatchList()

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    setStock(null)

    try {
      const result = await fetchStock(query)
      if (!result) {
        setError(`"${query}"에 해당하는 종목을 찾을 수 없습니다.`)
      } else {
        setStock(result)
        addToWatchList(result)
      }
    } catch (e) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <TrendingUp size={22} className="text-blue-500" />
          <span className="text-base font-bold text-gray-800">Stock Info Dash</span>
          <span className="text-xs text-gray-400 hidden sm:inline">국내 주식 정보 조회</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {/* 검색창 */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* 관심종목 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <WatchList
            watchList={watchList}
            onSelect={handleSearch}
            onRemove={removeFromWatchList}
          />
        </div>

        {/* 로딩 */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 size={32} className="text-blue-500 animate-spin" />
            <p className="text-gray-500 text-sm">종목 정보를 불러오는 중...</p>
          </div>
        )}

        {/* 오류 */}
        {error && !loading && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* 결과 블록 */}
        {stock && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Block 1: 기본 정보 */}
            <BasicInfoBlock stock={stock} />

            {/* Block 2: 수익률 통계 */}
            <ReturnsBlock returns={stock.returns} />

            {/* Block 3: 배당 정보 */}
            <DividendBlock dividends={stock.dividends} />

            {/* Block 4: 미디어 피드 */}
            <MediaBlock news={stock.news} youtube={stock.youtube} />
          </div>
        )}

        {/* 초기 안내 */}
        {!stock && !loading && !error && (
          <div className="text-center py-16 text-gray-400">
            <TrendingUp size={48} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">종목명 또는 종목코드를 검색하세요.</p>
            <p className="text-xs mt-1">예: 삼성전자, 005930, SK하이닉스, NAVER</p>
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        <p>본 서비스는 투자 참고용 정보만 제공하며, 투자 권유를 목적으로 하지 않습니다.</p>
      </footer>
    </div>
  )
}
