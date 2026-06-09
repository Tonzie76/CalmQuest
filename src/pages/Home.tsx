import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Gamepad2, Music, LineChart, 
  Search, Bell, User, Heart, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import dailyInspirations from '../content/daily-inspirations.json';

export default function Home() {
  const [greeting, setGreeting] = useState('');
  const [mood, setMood] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const featuredInspiration = dailyInspirations.inspirations[
    new Date().getDate() % dailyInspirations.inspirations.length
  ];

  const pillars = [
    { 
      title: 'Daily Inspirations', 
      desc: 'Affirmations & Quotes', 
      path: '/inspirations', 
      icon: <Sparkles className="text-accent-500" />,
      bg: 'bg-[url("/src/assets/images/bg-inspirations.png")]',
      color: 'from-accent-50/80 to-accent-100/80'
    },
    { 
      title: 'Therapeutic Games', 
      desc: 'Breathing & Focus', 
      path: '/games', 
      icon: <Gamepad2 className="text-primary-500" />,
      bg: 'bg-[url("/src/assets/images/bg-games.png")]',
      color: 'from-primary-50/80 to-primary-100/80'
    },
    { 
      title: 'Calming Music', 
      desc: 'Soundscapes & Beats', 
      path: '/music', 
      icon: <Music className="text-secondary-500" />,
      bg: 'bg-[url("/src/assets/images/bg-music.png")]',
      color: 'from-secondary-50/80 to-secondary-100/80'
    },
    { 
      title: 'Your Progress', 
      desc: 'Track Your Peace', 
      path: '/progress', 
      icon: <LineChart className="text-primary-600" />,
      bg: 'bg-white',
      color: 'from-gray-50 to-gray-100'
    },
  ];

  const moods = [
    { emoji: '😔', label: 'Anxious' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙂', label: 'Calm' },
    { emoji: '✨', label: 'Inspired' },
  ];

  return (
    <div className="min-h-screen bg-calm-mist/20 pb-24">
      <div className="max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary-700">{greeting}, Alex</h1>
            <p className="text-calm-stone text-sm">Welcome to your space of calm.</p>
          </div>
          <Link to="/profile" className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-calm-foam/50 flex items-center justify-center text-primary-600">
            <User size={24} />
          </Link>
        </header>

        {/* Mood Check-in */}
        <section className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-calm-foam/50">
          <h3 className="font-bold text-primary-700 mb-4 text-sm">How are you feeling today?</h3>
          <div className="flex justify-between">
            {moods.map((m) => (
              <button 
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`flex flex-col items-center gap-2 p-2 rounded-2xl transition-all ${
                  mood === m.label ? 'bg-primary-50 ring-1 ring-primary-200' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[10px] font-bold text-calm-stone uppercase tracking-wider">{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Streak Bar */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-4 mb-8 text-white flex items-center justify-between shadow-lg shadow-primary-600/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Heart size={20} fill="white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 leading-none mb-1">Current Streak</p>
              <p className="text-xl font-bold leading-none">7 Days of Calm</p>
            </div>
          </div>
          <ChevronRight size={24} className="opacity-50" />
        </div>

        {/* Daily Inspiration Card */}
        <section className="mb-10">
          <h3 className="font-bold text-primary-700 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-accent-500" />
            <span>Daily Inspiration</span>
          </h3>
          <Link to="/inspirations">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-[32px] p-8 text-white shadow-xl min-h-[200px] flex flex-col justify-center bg-gradient-to-br from-accent-400 to-accent-600"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-8 -mb-8 blur-xl" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 mb-4 block">
                  {featuredInspiration.category}
                </span>
                <p className="text-2xl font-heading font-bold italic mb-6 leading-relaxed">
                  "{featuredInspiration.content}"
                </p>
                <div className="flex items-center gap-2 opacity-80">
                  <div className="w-6 h-0.5 bg-white rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-wider">{featuredInspiration.author}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>

        {/* Pillars Grid */}
        <section className="mb-12">
          <h3 className="font-bold text-primary-700 mb-4">Explore Tools</h3>
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((pillar, i) => (
              <Link key={i} to={pillar.path}>
                <motion.div 
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-[28px] p-5 h-40 flex flex-col justify-end shadow-sm border border-calm-foam/30 ${pillar.bg} bg-cover bg-center`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${pillar.color} z-0`} />
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm">
                      {pillar.icon}
                    </div>
                    <h4 className="font-bold text-primary-900 text-sm leading-tight">{pillar.title}</h4>
                    <p className="text-[10px] text-primary-700/60 font-medium">{pillar.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
