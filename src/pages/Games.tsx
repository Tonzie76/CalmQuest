import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Brain, Puzzle, Sparkles, ChevronRight, Lock } from 'lucide-react';
import breathingData from '../content/breathing-exercises.json';
import { BreathingExercisesData, BreathingExercise } from '../types/breathing';
import { BreathingTimer } from '../components/games/BreathingTimer';
import { FocusMatch } from '../components/games/FocusMatch';
import { CalmPuzzle } from '../components/games/CalmPuzzle';

const data = breathingData as BreathingExercisesData;

type GameType = 'breathing' | 'focus' | 'puzzle' | 'none';

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>('none');
  const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);

  const featuredExercise = data.exercises[0];

  const handleStartBreathing = (exercise: BreathingExercise) => {
    setSelectedExercise(exercise);
    setActiveGame('breathing');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-24">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif font-bold text-calm-green-dark"
          >
            Therapeutic Games
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-calm-mist-dark/70"
          >
            Interactive tools to calm your mind
          </motion.p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Featured Breathing Section */}
          <motion.section variants={itemVariants}>
            <div className="bg-gradient-to-br from-calm-green to-calm-green-dark rounded-[32px] p-8 text-white shadow-xl shadow-calm-green/20 relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                  <Wind size={14} />
                  <span>Featured Exercise</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-1">{featuredExercise.title}</h2>
                <p className="text-white/80 text-sm mb-6">{featuredExercise.subtitle}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {featuredExercise.benefits.slice(0, 2).map((benefit, i) => (
                      <span key={i} className="text-[10px] bg-white/20 px-2 py-1 rounded-full border border-white/10">
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleStartBreathing(featuredExercise)}
                    className="bg-white text-calm-green-dark p-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* More Games Grid */}
          <motion.section variants={itemVariants}>
            <h3 className="text-lg font-bold text-calm-green-dark mb-4 flex items-center space-x-2">
              <Sparkles size={18} className="text-calm-green" />
              <span>Explore More</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <GameCard 
                icon={<Brain className="text-calm-green" />}
                title="Focus Match"
                desc="Memory & focus"
                duration="3 min"
                onClick={() => setActiveGame('focus')}
              />
              <GameCard 
                icon={<Puzzle className="text-calm-green" />}
                title="Calm Puzzle"
                desc="Visual serenity"
                duration="5 min"
                onClick={() => setActiveGame('puzzle')}
              />
              <GameCard 
                icon={<Wind className="text-calm-green" />}
                title="Deep Breathing"
                desc="Quick relaxation"
                duration="2 min"
                locked
              />
              <GameCard 
                icon={<Sparkles className="text-calm-green" />}
                title="Cloud Watcher"
                desc="Mindful observation"
                duration="10 min"
                locked
              />
            </div>
          </motion.section>

          {/* All Breathing Exercises List */}
          <motion.section variants={itemVariants}>
            <h3 className="text-lg font-bold text-calm-green-dark mb-4">Breathing Library</h3>
            <div className="space-y-3">
              {data.exercises.slice(1, 4).map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleStartBreathing(ex)}
                  className="w-full bg-white/60 backdrop-blur-sm border border-white p-4 rounded-2xl flex items-center justify-between hover:bg-white/80 transition-colors text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-calm-green/10 rounded-xl flex items-center justify-center text-calm-green">
                      <Wind size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-calm-green-dark">{ex.title}</h4>
                      <p className="text-xs text-calm-mist-dark/60">{ex.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-calm-green uppercase tracking-wider block">
                      {ex.duration_seconds / 60} min
                    </span>
                    <span className="text-[10px] text-calm-mist-dark/40 capitalize">
                      {ex.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Active Game Overlay */}
      <AnimatePresence>
        {activeGame === 'breathing' && selectedExercise && (
          <BreathingTimer 
            exercise={selectedExercise} 
            onClose={() => setActiveGame('none')} 
          />
        )}
        {activeGame === 'focus' && (
          <FocusMatch onClose={() => setActiveGame('none')} />
        )}
        {activeGame === 'puzzle' && (
          <CalmPuzzle onClose={() => setActiveGame('none')} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  duration: string;
  onClick?: () => void;
  locked?: boolean;
}

function GameCard({ icon, title, desc, duration, onClick, locked }: GameCardProps) {
  return (
    <button 
      onClick={locked ? undefined : onClick}
      className={`bg-white/60 backdrop-blur-sm border border-white p-5 rounded-[24px] text-left transition-all ${
        locked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg hover:-translate-y-1 active:scale-95'
      }`}
    >
      <div className="w-12 h-12 bg-calm-green/10 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-calm-green-dark text-sm">{title}</h4>
        {locked && <Lock size={12} className="text-calm-mist-dark/40" />}
      </div>
      <p className="text-[11px] text-calm-mist-dark/60 mt-1 mb-3 leading-tight">{desc}</p>
      <span className="text-[10px] font-bold text-calm-green uppercase tracking-wider">{duration}</span>
    </button>
  );
}
