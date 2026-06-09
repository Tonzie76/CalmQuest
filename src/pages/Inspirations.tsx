import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Calendar, ChevronLeft, ChevronRight, 
  Lock, ArrowRight, Heart, Share2, Quote
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import dailyInspirations from '../content/daily-inspirations.json';

export default function Inspirations() {
  const { user } = useAuthStore();
  const isPremium = user?.tier && user.tier !== 'free';
  const [currentIndex, setCurrentIndex] = useState(0);

  const inspirations = dailyInspirations.inspirations;
  const todayIndex = new Date().getDate() % inspirations.length;
  const currentInspiration = isPremium ? inspirations[currentIndex] : inspirations[todayIndex];

  const handleNext = () => {
    if (!isPremium) return;
    setCurrentIndex((prev) => (prev + 1) % inspirations.length);
  };

  const handlePrev = () => {
    if (!isPremium) return;
    setCurrentIndex((prev) => (prev - 1 + inspirations.length) % inspirations.length);
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-20">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-calm-foam/50 mb-4"
          >
            <Calendar size={16} className="text-primary-500" />
            <span className="text-xs font-bold text-calm-stone uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
          <h1 className="text-4xl font-heading font-bold text-primary-700">Daily Sparks</h1>
          <p className="text-calm-stone text-sm mt-2">Guidance for your mindful journey</p>
        </header>

        {/* Featured Card */}
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInspiration.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600" />
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-24 -mb-24 blur-2xl" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                    {currentInspiration.category}
                  </span>
                  <Quote size={40} className="text-white/20" />
                </div>

                <div className="space-y-6">
                  <p className="text-3xl font-heading font-bold text-white leading-relaxed italic">
                    "{currentInspiration.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-0.5 w-8 bg-white/50 rounded-full" />
                    <p className="text-sm font-bold text-white/80 uppercase tracking-wider">
                      {currentInspiration.author}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                      <Heart size={20} />
                    </button>
                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                  
                  {isPremium && (
                    <div className="flex gap-2">
                      <button 
                        onClick={handlePrev}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={handleNext}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {!isPremium && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full px-6">
              <Link 
                to="/pricing"
                className="bg-white rounded-2xl p-4 shadow-lg border border-calm-foam/50 flex items-center justify-between hover:border-accent-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-700">Unlock Browse Mode</p>
                    <p className="text-[10px] text-calm-stone">Access all 500+ inspirations</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-calm-mist-dark/30 group-hover:text-accent-500 transition-colors" />
              </Link>
            </div>
          )}
        </div>

        {/* History / Previous Days Section (Premium) */}
        <section className={`mt-16 ${!isPremium ? 'opacity-40 pointer-events-none' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-primary-700">Previous Sparks</h3>
            {!isPremium && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-accent-600 uppercase tracking-widest bg-accent-50 px-2 py-1 rounded-full">
                <Lock size={10} /> Premium
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            {inspirations.slice(0, 3).map((item, i) => (
              <div 
                key={i}
                className="bg-white/60 backdrop-blur-sm border border-white p-5 rounded-3xl flex items-center gap-4 hover:bg-white transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-2xl flex items-center justify-center text-accent-600 shrink-0">
                  <Sparkles size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-primary-700 truncate">{item.content}</p>
                  <p className="text-[10px] text-calm-stone uppercase tracking-widest font-bold mt-1">
                    {item.category} • Yesterday
                  </p>
                </div>
                <ChevronRight size={18} className="text-calm-mist-dark/20" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
