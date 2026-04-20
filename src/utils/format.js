export function formatPrice(price) {
  return price?.toLocaleString('ko-KR') + '원'
}

export function formatMarketCap(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(1) + '조'
  if (value >= 1e8) return (value / 1e8).toFixed(0) + '억'
  return value?.toLocaleString('ko-KR')
}

export function formatVolume(volume) {
  if (volume >= 1e6) return (volume / 1e6).toFixed(1) + '백만주'
  if (volume >= 1e3) return (volume / 1e3).toFixed(0) + '천주'
  return volume?.toLocaleString('ko-KR') + '주'
}

export function formatChangeRate(rate) {
  const sign = rate >= 0 ? '+' : ''
  return `${sign}${rate?.toFixed(2)}%`
}

export function formatChange(change) {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change?.toLocaleString('ko-KR')}원`
}
