'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Monitor, Globe, Download, Calendar, User, Share2, Heart, Flag, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface GameDetail {
    id: string;
    title: string;
    description: string;
    price: number;
    coverUrl: string | null;
    createdAt: string;
    author: {
        name: string | null;
        image: string | null;
    };
    tags: { id: string; name: string }[];
    builds: any[];
}

export default function GameDetailPage() {
    const { id } = useParams();
    const [game, setGame] = useState<GameDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchGame() {
            try {
                const res = await fetch(`/api/games/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setGame(data);
                } else {
                    setError('找不到该游戏');
                }
            } catch (err) {
                setError('获取详情失败');
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchGame();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 text-rose-500 animate-spin" />
                    <p className="text-gray-500 font-medium">加载中...</p>
                </div>
            </div>
        );
    }

    if (error || !game) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || '发生错误'}</h1>
                <Link href="/games" className="text-rose-600 hover:underline flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> 返回游戏列表
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Game Banner / Cover */}
            <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
                <img
                    src={game.coverUrl || 'https://placehold.co/1200x600/333/FFF?text=Header'}
                    alt={game.title}
                    className="w-full h-full object-cover opacity-60 blur-sm scale-105"
                />

                <div className="absolute inset-0 z-20 flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full flex flex-col md:flex-row gap-8 items-end">
                        {/* Box Art */}
                        <div className="hidden md:block w-72 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-transform duration-500">
                            <img src={game.coverUrl || 'https://placehold.co/600x400/333/FFF?text=No+Cover'} className="w-full h-full object-cover" />
                        </div>

                        {/* Title Info */}
                        <div className="flex-1 text-white">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {game.tags.map(tag => (
                                    <span key={tag.id} className="text-xs bg-rose-600/80 backdrop-blur-md px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-lg">{game.title}</h1>
                            <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold">
                                        {game.author.name?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <span>作者: <span className="text-white">{game.author.name || '独立开发者'}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-white">5.0 (0 评分)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>发布日期: {new Date(game.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Column: Description & Media */}
                    <div className="flex-1 space-y-12">
                        {/* Description Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <InfoIcon className="h-6 w-6 text-rose-500" /> 游戏介绍
                            </h2>
                            <div className="prose prose-rose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {game.description}
                            </div>
                        </div>

                        {/* Screenshots Placeholder */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 px-2">游戏截图</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
                                    <img src={game.coverUrl || 'https://placehold.co/800x450/333/FFF?text=Screen+1'} className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
                                    <img src="https://placehold.co/800x450/222/FFF?text=Screen+2" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Purchase & Info */}
                    <aside className="lg:w-96 space-y-6">
                        {/* Download/Purchase Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-rose-100 sticky top-24">
                            <div className="text-center mb-8">
                                <span className="text-5xl font-black text-gray-900">
                                    {Number(game.price) === 0 ? '免费' : `$${Number(game.price).toFixed(2)}`}
                                </span>
                                <p className="text-sm text-gray-500 mt-2">支持开发者继续创作</p>
                            </div>

                            <button className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mb-4">
                                <Download className="h-5 w-5" />
                                {game.price === 0 ? '立即下载' : '立即购买'}
                            </button>

                            <button className="w-full py-3 bg-white hover:bg-gray-50 text-rose-600 font-bold rounded-2xl border-2 border-rose-50 transition-all flex items-center justify-center gap-2 mb-8">
                                <Heart className="h-5 w-5" />
                                收藏到我的库
                            </button>

                            <div className="border-t border-gray-100 pt-8 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">发布平台</span>
                                    <div className="flex gap-2">
                                        <div title="Windows"><Monitor className="h-4 w-4 text-blue-500" /></div>
                                        <div title="Web"><Globe className="h-4 w-4 text-green-500" /></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">文件大小</span>
                                    <span className="font-medium text-gray-900 underline">245 MB</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">版本</span>
                                    <span className="font-medium text-gray-900">v1.2.4</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button className="flex-1 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors flex items-center justify-center gap-2">
                                    <Share2 className="h-3 w-3" /> 分享
                                </button>
                                <button className="flex-1 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-rose-500 transition-colors flex items-center justify-center gap-2">
                                    <Flag className="h-3 w-3" /> 举报
                                </button>
                            </div>
                        </div>

                        {/* Author/Similar Card */}
                        <div className="bg-gray-900 p-6 rounded-3xl text-white">
                            <h3 className="font-bold mb-4">关于开发商</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-full bg-rose-500 flex items-center justify-center font-bold text-xl">
                                    {game.author.name?.[0].toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-tight">{game.author.name || '独立开发者'}</p>
                                    <p className="text-rose-400 text-xs font-bold uppercase tracking-widest">3 款游戏</p>
                                </div>
                            </div>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors mb-4">
                                关注开发者
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

function InfoIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}
