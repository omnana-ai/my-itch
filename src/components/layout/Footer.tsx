import Link from 'next/link';
import { Github, Twitter, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">My-Itch</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            发现、游玩并分享独立游戏的绝佳平台。
                            为创作者而生，由热爱创意的玩家共建。
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">发现</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/games" className="hover:text-rose-500 transition-colors">全部游戏</Link></li>
                            <li><Link href="/featured" className="hover:text-rose-500 transition-colors">精选推荐</Link></li>
                            <li><Link href="/sale" className="hover:text-rose-500 transition-colors">特惠促销</Link></li>
                            <li><Link href="/jams" className="hover:text-rose-500 transition-colors">Game Jams</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">支持</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/about" className="hover:text-rose-500 transition-colors">关于我们</Link></li>
                            <li><Link href="/faq" className="hover:text-rose-500 transition-colors">常见问题</Link></li>
                            <li><Link href="/contact" className="hover:text-rose-500 transition-colors">联系方式</Link></li>
                            <li><Link href="/terms" className="hover:text-rose-500 transition-colors">服务条款</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">开发者</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/upload" className="hover:text-rose-500 transition-colors">上传游戏</Link></li>
                            <li><Link href="/dashboard" className="hover:text-rose-500 transition-colors">控制台</Link></li>
                            <li><Link href="/api" className="hover:text-rose-500 transition-colors">API 文档</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} My-Itch. 保留所有权利.
                    </p>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <span>Made with</span>
                        <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
                        <span>by Antigravity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
