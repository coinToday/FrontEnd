import axios from "axios";
import { useEffect, useState } from "react";
import { create } from "zustand";
import mainBack from "../shared/mainBack.svg";

// 뉴스 아이템 인터페이스
interface NewsItem {
    title: string;
    url: string;
    image: string;
    content: string;
    newspaper: string;
    time: string;
}

// 뉴스 스토어 인터페이스
interface NewsStore {
    news: NewsItem[];
    coin: string;
    fetchNews: (coinName?: string) => Promise<void>;
    setCoin: (coinName: string) => void;
}

// 코인 인터페이스
interface Coin {
    coinCode: string;
    englishName: string;
    koreanName: string;
}

// 브라우저 환경 확인
const isBrowser = typeof window !== 'undefined';

// 뉴스 데이터 저장
const useNewsStore = create<NewsStore>((set) => ({
    news: [],
    coin: "BTC",
    fetchNews: async (coinName = "BTC") => {
        try {
            const response = await axios.get("http://116.126.197.110:30010/coin-news", {
                params: { coin_name: coinName }
            });
            set({ news: response.data, coin: coinName });
        } catch (error) {
            console.error("Error fetching news", error);
        }
    },
    setCoin: (coinName) => set({ coin: coinName }),
}));

// 뉴스 페이지 컴포넌트
export default function NewsPage() {
    // 초기 코인 설정
    const getInitialCoin = () => {
        if(isBrowser) {
            const params = new URLSearchParams(window.location.search);
            const coinParam = params.get("coin");

            if(!coinParam) {
                setTimeout(() => {
                    setCoin("BTC");
                }, 0);
            }

            return coinParam || "BTC";
        }
        return "BTC";
    };

    // 뉴스 데이터 가져오기
    const { news, fetchNews } = useNewsStore();

    // 초기 코인 설정
    const [coin, setCoinState] = useState<string>(getInitialCoin());

    // 뉴스 순서 변경
    const [order, setOrder] = useState<NewsItem[]>([]);

    // 코인 목록 가져오기
    const [coinList, setCoinList] = useState<Coin[]>([]);

    // 드롭다운 열림 여부
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // 코인 선택 함수
    const setCoin = (coinName: string) => {
        setCoinState(coinName);

        if(typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set("coin", coinName);
            window.history.replaceState({}, '', url.toString());
        }
    };

    // 뉴스 순서 변경
    const handleOrder = (index: number) => {
        if (index === 0) return;

        const newOrder = [...order];
        [newOrder[0], newOrder[index]] = [newOrder[index], newOrder[0]];
        setOrder(newOrder);
    };

    // 드롭다운 코인 목록 가져오기
    const getDropdownCoinList = () => {
        if(["BTC", "ETH", "XRP"].includes(coin)) {
            return '기타 코인';
        }

        return coinList.find(c => c.coinCode === coin)?.koreanName || '기타 코인';
    };

    // 코인 변경 시 뉴스 데이터 가져오기
    useEffect(() => {
        fetchNews(coin);
    }, [coin, fetchNews]);

    // 뉴스 데이터 정렬
    useEffect(() => {
        if(news.length > 0) {
            setOrder(news);
        }
    }, [news]);

    // 코인 목록 가져오기
    useEffect(() => {
        const fetchCoinList = async () => {
            try {
                const response = await axios.get("http://116.126.197.110:30010/coin-name-list");
                setCoinList(response.data);
            } catch (error) {
                console.error("Error fetching coin list", error);
            }
        };
        fetchCoinList();
    }, []);


    return (
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
                    <div>
                        <p>{order[0].content}</p>
                    </div>
                    <div className="font-bold text-sm text-fc">
                        <span>{order[0].newspaper}</span>
                        <span className="mx-2">•</span>
                        <span>{order[0].time}</span>
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
                    {/* src가 none일 때 자체 이미지 넣기 */}
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