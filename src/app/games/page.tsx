'use client';

import { useState } from 'react';
import GameCard, { GameProps } from '@/components/ui/GameCard';
import { Filter, ChevronDown, Search } from 'lucide-react';

// Mock Data (Expanded)
const ALL_GAMES: GameProps[] = [
    {
        id: '1',
        title: 'Pixel Farm',
        author: 'IndieDev99',
        price: '0',
        rating: 4.5,
        tags: ['模拟', '像素风', '可爱'],
        imageUrl: 'https://placehold.co/600x400/004d00/FFF?text=Pixel+Farm',
        platform: ['web'],
        description: '在这个轻松的农场模拟游戏中种植作物并饲养动物。',
    },
    {
        id: '2',
        title: 'Void Drifter',
        author: 'SpaceCadet',
        price: '4.99',
        rating: 4.9,
        tags: ['太空', '射击', '动作'],
        imageUrl: 'https://placehold.co/600x400/000044/FFF?text=Void+Drifter',
        platform: ['windows'],
        description: '在虚空中漂移并消灭敌人。',
    },
    {
        id: '3',
        title: 'Dungeon Crawler X',
        author: 'RPGMaster',
        price: '9.99',
        rating: 4.2,
        tags: ['RPG', '地牢', 'Roguelike'],
        imageUrl: 'https://placehold.co/600x400/440000/FFF?text=Dungeon+X',
        platform: ['windows', 'web'],
        description: '经典的地牢探险动作游戏。',
    },
    {
        id: '4',
        title: 'Speed Racer',
        author: 'Vroom',
        price: '0',
        rating: 3.8,
        tags: ['竞速', '街机', '多人'],
        imageUrl: 'https://placehold.co/600x400/442200/FFF?text=Speed+Racer',
        platform: ['web'],
        description: '速度与激情的碰撞！',
    },
    {
        id: '5',
        title: 'Neon Odyssey',
        author: 'CyberStudios',
        price: '14.99',
        rating: 4.8,
        tags: ['动作', '赛博朋克', '角色扮演'],
        imageUrl: 'https://placehold.co/800x450/220033/FFF?text=Neon+Odyssey',
        platform: ['windows', 'web'],
        description: '潜入一个充满危险、阴谋和无尽动作的霓虹城市。',
    },
    {
        id: '6',
        title: 'Forest Mystery',
        author: 'NatureGames',
        price: '2.99',
        rating: 4.6,
        tags: ['冒险', '解谜', '剧情'],
        imageUrl: 'https://placehold.co/600x400/003300/FFF?text=Forest+Mystery',
        platform: ['windows', 'web'],
        description: '解开古老森林深处的秘密。',
    },
    {
        id: '7',
        title: 'Cyber Net',
        author: 'HackerOne',
        price: '0',
        rating: 4.0,
        tags: ['策略', '黑客', '赛博朋克'],
        imageUrl: 'https://placehold.co/600x400/001133/FFF?text=Cyber+Net',
        platform: ['web'],
        description: '入侵系统，成为网络主宰。',
    },
    {
        id: '8',
        title: 'Cook Chaos',
        author: 'KitchenDev',
        price: '5.99',
        rating: 4.7,
        tags: ['模拟', '合作', '休闲'],
        imageUrl: 'https://placehold.co/600x400/663300/FFF?text=Cook+Chaos',
        platform: ['windows'],
        description: '和朋友一起经营最混乱的厨房。',
    },
];

const FILTERS = {
    tags: ['动作', '冒险', '策略', '角色扮演', '模拟', '休闲', '恐怖', '竞速'],
    platform: ['windows', 'web', 'macOS', 'linux', 'android'],
    price: ['免费', '付费', '特惠'],
};

export default function GamesPage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Simple client-side filtering logic for demo
    const filteredGames = ALL_GAMES.filter(game => {
        // Search Filter
        if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Tag Filter (OR logic for now)
        if (selectedTags.length > 0) {
            const hasTag = game.tags.some(tag => selectedTags.includes(tag));
            // Platform checking as tag for simplicity of demo if needed, but keeping separate.
            return hasTag;
        }
        return true;
    });

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">浏览所有游戏</h1>
                    <p className="text-gray-500 max-w-2xl">
                        探索最新、最热门的独立游戏。支持 Windows、Mac、Linux 和网页端即点即玩。
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                        {/* Search (Mobile/Sidebar integration) */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="筛选游戏..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-rose-500 focus:border-rose-500"
                            />
                            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                        </div>

                        {/* Filter Groups */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Filter className="h-4 w-4" /> 标签
                            </h3>
                            <div className="space-y-2">
                                {FILTERS.tags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => toggleTag(tag)}
                                            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500 transition-colors"
                                        />
                                        <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors">{tag}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">平台</h3>
                            <div className="space-y-2">
                                {FILTERS.platform.map(p => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                                        <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors capitalize">{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">价格</h3>
                            <div className="space-y-2">
                                {FILTERS.price.map(p => (
                                    <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                                        <span className="text-sm text-gray-600 group-hover:text-rose-600 transition-colors">{p}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <span className="text-sm text-gray-500">找到 {filteredGames.length} 款游戏</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">排序:</span>
                                <select className="text-sm border-none bg-transparent font-medium text-gray-900 focus:ring-0 cursor-pointer hover:text-rose-600">
                                    <option>最热门</option>
                                    <option>最新发布</option>
                                    <option>评分最高</option>
                                </select>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Grid */}
                        {filteredGames.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGames.map(game => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900">未找到相关游戏</h3>
                                <p className="text-gray-500 mt-2">尝试清除筛选条件或更换关键词</p>
                                <button
                                    onClick={() => { setSelectedTags([]); setSearchQuery(''); }}
                                    className="mt-4 text-rose-600 font-medium hover:underline"
                                >
                                    清除所有筛选
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
