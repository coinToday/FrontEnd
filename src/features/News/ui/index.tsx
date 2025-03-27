import { useNewsPage } from "../model";
import mainBack from "../../../shared/mainBack.svg";

export default function NewsPageUI() {
  const {
    order,
    coin,
    coinList,
    isDropdownOpen,
    setIsDropdownOpen,
    setCoin,
    handleOrder,
    getDropdownCoinList
  } = useNewsPage();

  return(
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-6 text-fc">주요뉴스</h1>
        
        <div className="flex gap-2 mb-8 items-center">
          {coinList
            .filter(({coinCode}) => ["BTC", "ETH", "XRP"].includes(coinCode))
            .sort((a, b) => {
              const order = ["BTC", "ETH", "XRP"];
              return order.indexOf(a.coinCode) - order.indexOf(b.coinCode);
            })
            .map(({coinCode, koreanName}) => (
              <button
                key={coinCode}
                className={`px-4 py-2 rounded-md ${coin === coinCode ? "bg-blue-600" : "bg-blue-500"} text-fc hover:bg-blue-600 transition-colors duration-100`}
                onClick={() => setCoin(coinCode)}
              >
                {koreanName}
              </button>
            ))
          }
          
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-48 px-4 py-2 rounded-md bg-blue-500 text-fc hover:bg-blue-600 transition-colors duration-100"
            >
              {getDropdownCoinList()}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {coinList
                  .filter(({coinCode}) => !["BTC", "ETH", "XRP"].includes(coinCode))
                  .map(({coinCode, koreanName}) => (
                    <button
                      key={coinCode}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                      onClick={() => {
                        setCoin(coinCode);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {koreanName}
                    </button>
                  ))
                }
              </div>
            )}
          </div>
        </div>
        
        {order.length > 0 && (
          <div className="mb-12">
            {/* 첫 번째 뉴스 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl">
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <a href={order[0].url} target="_blank" rel="noopener noreferrer">
                  <img src={order[0].image} alt={order[0].title} className="w-full h-full object-cover"/>
                </a>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl font-bold mb-2 text-fc">{order[0].title}</h2>
                <div className="font-bold text-sm text-[#9E9EA4] mt-2">
                  <span>{order[0].time}</span>
                  <span className="mx-2">•</span>
                  <span>{order[0].newspaper}</span>
                </div>
                <div>
                  <p className="mt-7 font-semibold text-left text-[#9E9EA4] leading-7">{order[0].content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 나머지 뉴스 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {order.slice(1).map((item, index) => (
            <div key={index} onClick={() => handleOrder(index + 1)}>
              <div className="w-full h-[7.5rem] overflow-hidden rounded-xl">
                <img
                  src={item.image === 'None' ? mainBack : item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4 flex-1 flex flex-col">
                <h3 className="font-medium line-clamp-2 mb-2 text-fc">{item.title}</h3>
                <div className="font-semibold text-xs text-[#9E9EA4] mt-auto">
                  <span>{item.newspaper}</span>
                  <span className="mx-1">•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}