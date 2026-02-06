import GameCard from '@/components/ui/GameCard';
import Link from 'next/link';

// Mock Data
const FEATURED_GAME = {
  id: 'featured-1',
  title: 'Neon Odyssey',
  author: 'CyberStudios',
  price: '14.99',
  rating: 4.8,
  tags: ['动作', '赛博朋克', '角色扮演'],
  imageUrl: 'https://placehold.co/800x450/220033/FFF?text=Neon+Odyssey',
  platform: ['windows', 'web'],
  description: '潜入一个充满危险、阴谋和无尽动作的霓虹城市。黑入安全系统，对抗叛变的仿生人，揭开巨型企业的黑暗秘密。',
};

const TRENDING_GAMES = [
  {
    id: '1',
    title: 'Pixel Farm',
    author: 'IndieDev99',
    price: '0',
    rating: 4.5,
    tags: ['模拟', '像素风'],
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
    tags: ['太空', '射击'],
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
    tags: ['RPG', '地牢'],
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
    tags: ['竞速', '街机'],
    imageUrl: 'https://placehold.co/600x400/442200/FFF?text=Speed+Racer',
    platform: ['web'],
    description: '速度与激情的碰撞！',
  },
];

const CATEGORIES = [
  { name: '动作', color: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' },
  { name: '冒险', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100' },
  { name: '角色扮演', color: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100' },
  { name: '策略', color: 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' },
  { name: '模拟', color: 'bg-yellow-50 text-yellow-600 border-yellow-100 hover:bg-yellow-100' },
  { name: '恐怖', color: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gray-50">
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
            创作. 游玩. <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">连接.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            独立游戏爱好者的聚集地。托管你的游戏，参加 Game Jams，发现下一个爆款神作。
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/browse" className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-rose-500/25 transform hover:-translate-y-1">
              浏览游戏
            </Link>
            <Link href="/upload" className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 px-8 rounded-full border border-gray-200 transition-all hover:border-gray-300 shadow-sm">
              上传你的游戏
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-8 bg-rose-500 rounded-full" />
            精选推荐
          </h2>
        </div>

        {/* Using the GameCard in featured mode */}
        <GameCard game={FEATURED_GAME as any} featured={true} />
      </section>

      {/* Categories */}
      <section className="py-8 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 md:pb-0 gap-4 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/games?tag=${cat.name}`}
                className={`flex-shrink-0 px-6 py-2 rounded-full border text-sm font-semibold transition-transform hover:scale-105 ${cat.color}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Games Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">时下流行</h2>
          <Link href="/games" className="text-rose-600 hover:text-rose-500 font-medium text-sm flex items-center gap-1">
            查看更多 <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRENDING_GAMES.map((game) => (
            <GameCard key={game.id} game={game as any} />
          ))}
        </div>
      </section>

      {/* Game Jam Callout */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">参加下一场 Game Jam</h2>
            <p className="text-gray-300 mb-8 text-lg">
              挑战自我，学习新技能，结识志同道合的朋友。我们为期 7 天的 Game Jam 是你开启游戏开发之旅的最佳方式。
            </p>
            <Link href="/jams" className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              查看日历
            </Link>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/3 w-96 h-96 border-[20px] border-white/10 rounded-full" />
      </section>
    </div>
  );
}
