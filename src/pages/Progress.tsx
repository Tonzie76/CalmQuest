import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, Timer, Target, CheckCircle2, 
  Lock, ArrowRight, Sparkles, Gamepad2, Music 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

export default function Progress() {
  const { user } = useAuthStore();
  const isPremium = user?.tier && user.tier !== 'free';

  // Mock data for the view
  const stats = [
    { label: 'Day Streak', value: '7', icon: <Flame className="text-orange-500" /> },
    { label: 'Sessions', value: '23', icon: <Target className="text-primary-500" /> },
    { label: 'Minutes', value: '185', icon: <Timer className="text-secondary-500" /> },
  ];

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const streakData = [true, true, true, true, false, false, false];

  const activityData = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 25 },
    { label: 'Wed', value: 60 },
    { label: 'Thu', value: 35 },
    { label: 'Fri', value: 0 },
    { label: 'Sat', value: 0 },
    { label: 'Sun', value: 0 },
  ];

  const categories = [
    { name: 'Inspirations', value: 15, total: 20, icon: <Sparkles size={16} />, color: 'bg-accent-300' },
    { name: 'Games', value: 12, total: 20, icon: <Gamepad2 size={16} />, color: 'bg-primary-400' },
    { name: 'Music', value: 9, total: 20, icon: <Music size={16} />, color: 'bg-secondary-400' },
  ];

  const achievements = [
    { name: 'First Calm', icon: '🌟', earned: true },
    { name: 'Week Streak', icon: '🔥', earned: true },
    { name: 'Mindful Hour', icon: '🧠', earned: true },
    { name: '30-Day Streak', icon: '🏆', earned: false },
    { name: 'Deep Breath', icon: '🌊', earned: false },
    { name: 'Puzzle Master', icon: '🧩', earned: false },
  ];

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-24">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary-700">Your Progress</h1>
          <p className="text-calm-stone text-sm">Celebrate your calm journey</p>
        </header>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-calm-foam/50"
            >
              <div className="flex justify-center mb-1 text-lg">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary-700">{stat.value}</div>
              <div className="text-[10px] font-bold text-calm-stone uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <section className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-calm-foam/50">
          <h3 className="font-bold text-primary-700 mb-4 flex items-center justify-between">
            <span>This Week</span>
            <span className="text-[10px] text-primary-500 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded-full">Active</span>
          </h3>
          <div className="flex justify-between">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-calm-stone">{day}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                  i === 3 ? 'ring-2 ring-primary-500 ring-offset-2' : ''
                } ${
                  streakData[i] 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                    : i < 3 ? 'bg-primary-100 text-primary-300' : 'bg-calm-mist/30 text-calm-stone/30'
                }`}>
                  {streakData[i] ? <CheckCircle2 size={18} /> : i + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {!isPremium ? (
          <div className="relative">
            {/* Locked Overlay */}
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center text-center p-8 border border-white">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center text-accent-600 mb-4 shadow-glow-warm">
                <Lock size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary-700 mb-2">Unlock Detailed Insights</h3>
              <p className="text-calm-stone text-sm mb-6">Premium members get detailed activity tracking, achievements, and personalized calm reports.</p>
              <Link 
                to="/pricing" 
                className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary-600/20 flex items-center space-x-2 hover:bg-primary-700 transition-colors"
              >
                <span>Upgrade to Premium</span>
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Blurred Content Placeholder */}
            <div className="space-y-6 opacity-30 grayscale pointer-events-none">
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-calm-foam/50">
                <div className="h-40 bg-calm-mist/20 rounded-xl" />
              </section>
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-calm-foam/50">
                <div className="h-40 bg-calm-mist/20 rounded-xl" />
              </section>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-calm-foam/50">
              <h3 className="font-bold text-primary-700 mb-6">Minutes of Calm</h3>
              <div className="flex items-end justify-between h-32 gap-2">
                {activityData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${data.value}%` }}
                      className="w-full bg-gradient-to-t from-primary-600 to-primary-300 rounded-t-lg min-h-[4px]"
                    />
                    <span className="text-[10px] text-calm-stone font-medium">{data.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-calm-foam/50">
              <h3 className="font-bold text-primary-700 mb-4">Activity Breakdown</h3>
              <div className="space-y-4">
                {categories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 ${cat.color.replace('bg-', 'bg-opacity-10 text-')} rounded-lg flex items-center justify-center`}>
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold text-primary-700">{cat.name}</span>
                        <span className="text-calm-stone">{cat.value} sessions</span>
                      </div>
                      <div className="h-2 bg-calm-mist/30 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.value / cat.total) * 100}%` }}
                          className={`h-full ${cat.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-sm border border-calm-foam/50">
              <h3 className="font-bold text-primary-700 mb-4">Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((ach, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center p-3 rounded-2xl border ${
                      ach.earned ? 'bg-primary-50/50 border-primary-100' : 'bg-gray-50 border-gray-100 grayscale opacity-50'
                    }`}
                  >
                    <span className="text-2xl mb-1">{ach.icon}</span>
                    <span className="text-[9px] font-bold text-center text-primary-700 leading-tight uppercase tracking-tighter">
                      {ach.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
