import { searchMockStock } from '../data/mockData'

const USE_MOCK = true // API 키 설정 후 false로 변경

// KRX 공공데이터 API 기반 실제 주식 조회 (API 키 필요)
async function fetchRealStock(query) {
  const apiKey = import.meta.env.VITE_PUBLIC_DATA_API_KEY
  if (!apiKey) throw new Error('API 키가 설정되지 않았습니다.')

  const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${apiKey}&numOfRows=1&pageNo=1&resultType=json&itmsNm=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('API 요청 실패')
  const data = await res.json()
  const item = data?.response?.body?.items?.item?.[0]
  if (!item) return null

  return {
    code: item.srtnCd,
    name: item.itmsNm,
    market: item.mrktCtg,
    currentPrice: parseInt(item.clpr),
    prevClose: parseInt(item.basPrc),
    change: parseInt(item.vs),
    changeRate: parseFloat(item.fltRt),
    marketCap: parseInt(item.mrktTotAmt),
    volume: parseInt(item.trqu),
    high: parseInt(item.hipr),
    low: parseInt(item.lopr),
    open: parseInt(item.mkp),
    returns: { week: 0, month: 0, year: 0 }, // 별도 조회 필요
    dividends: [],
    news: [],
    youtube: [],
  }
}

export async function fetchStock(query) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400)) // 로딩 UX 시뮬레이션
    return searchMockStock(query)
  }
  return fetchRealStock(query)
}

// Naver 뉴스 검색 (CORS 문제로 프록시 서버 필요)
export async function fetchNews(stockName) {
  if (USE_MOCK) return null // mock 데이터의 news 사용

  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID
  const clientSecret = import.meta.env.VITE_NAVER_CLIENT_SECRET
  if (!clientId) return null

  const url = `/api/naver/news?query=${encodeURIComponent(stockName)}&display=3&sort=date`
  const res = await fetch(url, {
    headers: {
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret,
    },
  })
  if (!res.ok) return null
  return res.json()
}

// YouTube 검색 (API 키 필요)
export async function fetchYoutube(stockName) {
  if (USE_MOCK) return null // mock 데이터의 youtube 사용

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  if (!apiKey) return null

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(stockName + ' 주가')}&maxResults=3&type=video&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}
