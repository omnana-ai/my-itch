'use client';

import Link from 'next/link';
import { Gamepad2, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2 text-rose-600 mb-6 group">
                        <Gamepad2 className="h-10 w-10 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-3xl tracking-tight text-gray-900">My-Itch</span>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-gray-900">创建新账号</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        加入独立游戏社区，开始你的探索或创作之旅
                    </p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                用户名
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-shadow shadow-sm"
                                    placeholder="Gamer123"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                                邮箱地址
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-shadow shadow-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                密码
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-shadow shadow-sm"
                                    placeholder="请输入您的密码"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700 mb-1">
                                确认密码
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password-confirm"
                                    name="password-confirm"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm transition-shadow shadow-sm"
                                    placeholder="请再次输入您的密码"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        点击“注册”即表示您同意我们的
                        <a href="#" className="font-medium text-rose-600 hover:text-rose-500 mx-1">服务条款</a>
                        和
                        <a href="#" className="font-medium text-rose-600 hover:text-rose-500 mx-1">隐私政策</a>.
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all shadow-md hover:shadow-lg hover:shadow-rose-100"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowRight className="h-5 w-5 text-rose-500 group-hover:text-rose-400" aria-hidden="true" />
                            </span>
                            注册
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        已有账号?{' '}
                        <Link href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                            立即登录
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
