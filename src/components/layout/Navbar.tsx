'use client';

import Link from 'next/link';
import { Search, Menu, Gamepad2, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors">
                            <Gamepad2 className="h-8 w-8" />
                            <span className="font-bold text-xl tracking-tight text-gray-900">My-Itch</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/games" className="text-gray-600 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">浏览游戏</Link>
                            <Link href="/jams" className="text-gray-600 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">Game Jams</Link>
                            <Link href="/devlogs" className="text-gray-600 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">开发日志</Link>
                            <Link href="/community" className="text-gray-600 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">社区</Link>
                        </div>
                    </div>

                    {/* Search & Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-rose-500 focus:border-rose-500 block w-64 pl-10 p-2.5 transition-all placeholder-gray-500 focus:w-80 group-focus-within:bg-white"
                                placeholder="搜索游戏..."
                            />
                        </div>

                        {session ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">
                                    {session.user?.name || session.user?.email}
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-gray-500 hover:text-rose-600 transition-colors"
                                    title="退出登录"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                                <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="Avatar" className="h-8 w-8 rounded-full" />
                                    ) : (
                                        <User className="h-4 w-4" />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-gray-600 hover:text-rose-500 font-medium text-sm">登录</Link>
                                <Link href="/register" className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg shadow-rose-200">
                                    注册
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
                        >
                            <span className="sr-only">打开菜单</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/games" className="text-gray-600 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium">浏览游戏</Link>
                        <Link href="/jams" className="text-gray-600 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium">Game Jams</Link>
                        <Link href="/devlogs" className="text-gray-600 hover:text-rose-500 block px-3 py-2 rounded-md text-base font-medium">开发日志</Link>
                        <div className="mt-4 px-3">
                            <input
                                type="text"
                                className="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
                                placeholder="搜索..."
                            />
                        </div>
                        <div className="mt-4 flex flex-col gap-2 px-3 pb-3">
                            {session ? (
                                <button onClick={() => signOut()} className="text-gray-600 hover:text-rose-500 block text-center py-2 border border-gray-200 rounded-md">
                                    退出登录
                                </button>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-600 hover:text-rose-500 block text-center py-2 border border-gray-200 rounded-md">登录</Link>
                                    <Link href="/register" className="bg-rose-600 text-white block text-center py-2 rounded-md hover:bg-rose-700">注册</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
