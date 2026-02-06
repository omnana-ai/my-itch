import Link from 'next/link';
import { Star, Monitor, Globe } from 'lucide-react';

export interface GameProps {
    id: string;
    title: string;
    author: string;
    price: string;
    rating: number;
    tags: string[];
    imageUrl: string;
    platform: ('windows' | 'web')[];
    description: string;
}

export default function GameCard({ game, featured = false }: { game: GameProps; featured?: boolean }) {
    return (
        <div className={`group relative bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-500/30 ${featured ? 'md:col-span-2 md:flex' : 'flex flex-col'}`}>

            {/* Image Container */}
            <div className={`relative overflow-hidden ${featured ? 'md:w-3/5 h-64 md:h-auto' : 'h-48'}`}>
                <div className="absolute inset-0 bg-gray-100 animate-pulse" /> {/* Placeholder */}
                <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-900 flex items-center gap-1 shadow-sm">
                    {game.price === '0' ? '免费' : `$${game.price}`}
                </div>
            </div>

            {/* Content */}
            <div className={`p-4 flex flex-col justify-between ${featured ? 'md:w-2/5 md:p-6' : 'flex-1'}`}>
                <div>
                    <h3 className={`font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
                        <Link href={`/games/${game.id}`}>
                            <span className="absolute inset-0" />
                            {game.title}
                        </Link>
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">作者: {game.author}</p>

                    {featured && (
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{game.description}</p>
                    )}
                </div>

                <div className="mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {game.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors z-10 relative">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                            {game.platform.includes('windows') && <Monitor className="w-3 h-3 hover:text-blue-500" />}
                            {game.platform.includes('web') && <Globe className="w-3 h-3 hover:text-green-500" />}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{game.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
