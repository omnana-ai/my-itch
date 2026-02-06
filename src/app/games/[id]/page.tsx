'use client';

import { useParams } from 'next/navigation';
import { Monitor, Globe, Download, Star, Share2, MessageSquare, Flag } from 'lucide-react';

// Mock Data (In a real app, fetch this based on params.id)
const GAME_DETAILS = {
    id: 'featured-1',
    title: 'Neon Odyssey',
    author: 'CyberStudios',
    price: '14.99',
    rating: 4.8,
    reviewCount: 342,
    tags: ['动作', '赛博朋克', '角色扮演', '单人', '科幻'],
    bannerUrl: 'https://placehold.co/1200x400/220033/FFF?text=Neon+Odyssey+Banner',
    screenshots: [
        'https://placehold.co/600x337/330044/FFF?text=Gameplay+1',
        'https://placehold.co/600x337/440055/FFF?text=Gameplay+2',
        'https://placehold.co/600x337/550066/FFF?text=Menu+UI',
        'https://placehold.co/600x337/660077/FFF?text=Combat',
    ],
    description: `
    ## 关于这款游戏
    潜入 **Neon Odyssey** 的世界，一个充满危险、阴谋和无尽动作的霓虹城市。作为一名被遗弃的特工，你必须利用你的黑客技能和战斗义体，揭开控制着这座城市的巨型企业背后的黑暗秘密。

    ### 核心特性
    - **开放世界探索**：自由穿梭于贫民窟、高科技中心和废弃的地下设施。
    - **深度战斗系统**：结合枪械、近战武器和黑客能力，创造你独特的战斗风格。
    - **非线性叙事**：你的选择将直接影响故事的走向和最终结局。
    
    ### 系统需求
    - 操作系统: Windows 10/11
    - 处理器: Intel Core i5-8400 / AMD Ryzen 5 2600
    - 内存: 16 GB RAM
    - 显卡: NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB
  `,
    files: [
        { name: 'NeonOdyssey_Win_v1.0.zip', size: '2.4 GB', platform: 'windows', type: 'zip' },
        { name: 'NeonOdyssey_Mac_v1.0.dmg', size: '2.5 GB', platform: 'mac', type: 'dmg' },
    ],
    comments: [
        { user: 'GamerOne', content: '画面太惊艳了！赛博朋克风格还原度满分。', rating: 5, date: '2天前' },
        { user: 'IndieFan', content: '战斗手感不错，但是剧情稍微有点短。期待DLC。', rating: 4, date: '1周前' },
    ]
};

export default function GameDetailsPage() {
    const params = useParams();
    const gameid = params.id;

    // In reality, use gameid to fetch data. Here we just use the mock.
    const game = GAME_DETAILS;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Banner */}
            <div className="h-64 md:h-96 w-full relative overflow-hidden">
                <img src={game.bannerUrl} alt={game.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto flex items-end">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-t-xl shadow-lg border border-gray-100 hidden md:block w-2/3">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{game.title}</h1>
                        <p className="text-gray-500 font-medium">by <span className="text-rose-600 cursor-pointer hover:underline">{game.author}</span></p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="flex-1 space-y-12">

                    {/* Mobile Header (Visible only on small screens) */}
                    <div className="md:hidden bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{game.title}</h1>
                        <p className="text-gray-500 font-medium">by <span className="text-rose-600">{game.author}</span></p>
                    </div>

                    {/* Screenshots Gallery */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
                        <div className="grid grid-cols-2 gap-2">
                            {game.screenshots.map((shot, idx) => (
                                <img key={idx} src={shot} alt={`Screenshot ${idx}`} className="rounded-lg hover:opacity-90 transition-opacity cursor-pointer w-full h-auto" />
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-gray max-w-none">
                        {/* Rendering markdown-like text with simple split for demo */}
                        {game.description.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            if (trimmed.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
                            if (trimmed.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
                            if (trimmed.startsWith('- ')) return <li key={i} className="ml-4 text-gray-600">{trimmed.replace('- ', '')}</li>;
                            return <p key={i} className="text-gray-600 leading-relaxed mb-4">{trimmed}</p>;
                        })}
                    </div>

                    {/* Downloads Section */}
                    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Download className="h-5 w-5 text-rose-600" />
                            下载文件
                        </h3>
                        <div className="space-y-4">
                            {game.files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:border-rose-300 transition-colors shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-100 rounded text-gray-500 uppercase font-bold text-xs">{file.type}</div>
                                        <div>
                                            <p className="font-semibold text-gray-900 font-mono text-sm">{file.name}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <span>{file.size}</span>
                                                <span className="flex items-center gap-1">
                                                    {file.platform === 'windows' ? <Monitor className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                                                    {file.platform}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                                        <Download className="h-4 w-4" /> 下载
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" /> 评论 ({game.reviewCount})
                        </h3>
                        <div className="space-y-6">
                            {game.comments.map((comment, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
                                                {comment.user.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-900 text-sm">{comment.user}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{comment.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`h-3 w-3 ${i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 mt-6 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                            查看更多评论
                        </button>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">

                        {/* Action Card */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                            <div className="text-3xl font-extrabold text-gray-900 mb-2">${game.price}</div>
                            <p className="text-gray-500 text-sm mb-6">如果喜欢这个游戏，请支持开发者</p>
                            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-rose-200 transition-all transform hover:-translate-y-1 mb-3">
                                立即购买
                            </button>
                            <button className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors">
                                加入收藏
                            </button>
                        </div>

                        {/* Game Info */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">游戏信息</h4>
                            <dl className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">更新时间</dt>
                                    <dd className="text-gray-900 font-medium">2023-11-15</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">发布状态</dt>
                                    <dd className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">已发布</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500">平均评分</dt>
                                    <dd className="flex items-center gap-1 text-gray-900 font-medium">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        {game.rating} <span className="text-gray-400 font-normal">({game.reviewCount})</span>
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">标签</h4>
                                <div className="flex flex-wrap gap-2">
                                    {game.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Share/Report */}
                        <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm font-medium">
                                <Share2 className="h-4 w-4" /> 分享
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm font-medium">
                                <Flag className="h-4 w-4" /> 举报
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
