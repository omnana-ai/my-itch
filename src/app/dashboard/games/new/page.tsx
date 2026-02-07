'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gamepad2, Upload, DollarSign, Tag, Info, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewGamePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            coverUrl: formData.get('coverUrl'),
        };

        try {
            const res = await fetch('/api/games', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push('/games');
                router.refresh();
            } else {
                const errData = await res.json();
                setError(errData.error || '创建失败，请稍后再试');
            }
        } catch (err) {
            setError('发生网络错误');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/games" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">发布新游戏</h1>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Basic Info Section */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
                            <Info className="h-5 w-5 text-rose-500" />
                            <h2 className="font-bold text-gray-900">基本信息</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">游戏标题</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="例如: Pixel Farm"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">游戏简介 (Markdown)</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={6}
                                    placeholder="介绍一下你的游戏特色、玩法和背景..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Media & Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Cover Image */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
                                <Upload className="h-5 w-5 text-rose-500" />
                                <h2 className="font-bold text-gray-900">封面图片 URL</h2>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500">
                                    暂不支持直接上传文件，请提供外部图片链接 (推荐 600x400)
                                </p>
                                <input
                                    name="coverUrl"
                                    type="url"
                                    placeholder="https://example.com/cover.jpg"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                />
                            </div>
                        </section>

                        {/* Pricing */}
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
                                <DollarSign className="h-5 w-5 text-rose-500" />
                                <h2 className="font-bold text-gray-900">定价设置</h2>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-500">
                                    输入 0 即为免费游戏
                                </p>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        defaultValue="0.00"
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href="/games"
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            取消
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-lg shadow-rose-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    发布中...
                                </>
                            ) : (
                                '保存并发布项目'
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
