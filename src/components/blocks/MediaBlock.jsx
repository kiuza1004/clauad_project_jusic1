import { Newspaper, Youtube, ExternalLink } from 'lucide-react'

export default function MediaBlock({ news, youtube }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper size={18} className="text-orange-500" />
        <h3 className="font-bold text-gray-900">미디어 피드</h3>
      </div>

      {/* 뉴스 */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-3">
          <Newspaper size={14} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-600">최신 뉴스</span>
        </div>
        {!news || news.length === 0 ? (
          <p className="text-sm text-gray-400">뉴스 정보가 없습니다.</p>
        ) : (
          <div className="space-y-2">
            {news.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-3 rounded-xl hover:bg-orange-50 group transition-colors border border-transparent hover:border-orange-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-orange-600 line-clamp-2">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{item.press}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-300 group-hover:text-orange-400 shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 유튜브 */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Youtube size={14} className="text-red-500" />
          <span className="text-sm font-semibold text-gray-600">유튜브 검색</span>
        </div>
        {!youtube || youtube.length === 0 ? (
          <p className="text-sm text-gray-400">유튜브 정보가 없습니다.</p>
        ) : (
          <div className="space-y-2">
            {youtube.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-red-50 group transition-colors border border-transparent hover:border-red-100"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded-lg shrink-0 bg-gray-100"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-red-600 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{item.channel}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
