import { useState, useEffect } from 'react'

const STORAGE_KEY = 'stock_watchlist'
const MAX_SIZE = 10

export function useWatchList() {
  const [watchList, setWatchList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchList))
  }, [watchList])

  const addToWatchList = (stock) => {
    setWatchList((prev) => {
      // 이미 존재하면 맨 앞으로 이동
      const filtered = prev.filter((s) => s.code !== stock.code)
      const updated = [{ code: stock.code, name: stock.name }, ...filtered]
      // 최대 10개 유지
      return updated.slice(0, MAX_SIZE)
    })
  }

  const removeFromWatchList = (code) => {
    setWatchList((prev) => prev.filter((s) => s.code !== code))
  }

  return { watchList, addToWatchList, removeFromWatchList }
}
