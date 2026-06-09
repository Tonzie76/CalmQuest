import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, RefreshCw, ChevronLeft, Info } from 'lucide-react';
import { BreathingExercise } from '../../types/breathing';

interface BreathingTimerProps {
  exercise: BreathingExercise;
  onClose: () => void;
}

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'hold_empty' | 'completed';

export const BreathingTimer: React.FC<BreathingTimerProps> = ({ exercise, onClose }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const { pattern } = exercise;

  const getNextPhase = useCallback((current: Phase): Phase => {
    if (!pattern) return 'completed';

    switch (current) {
      case 'inhale':
        return pattern.hold ? 'hold' : 'exhale';
      case 'hold':
        return 'exhale';
      case 'exhale':
        if (pattern.hold_empty) return 'hold_empty';
        if (exercise.cycles && currentCycle >= exercise.cycles) return 'completed';
        setCurrentCycle(prev => prev + 1);
        return 'inhale';
      case 'hold_empty':
        if (exercise.cycles && currentCycle >= exercise.cycles) return 'completed';
        setCurrentCycle(prev => prev + 1);
        return 'inhale';
      default:
        return 'inhale';
    }
  }, [pattern, currentCycle, exercise.cycles]);

  const getPhaseDuration = useCallback((p: Phase): number => {
    if (!pattern) return 0;
    switch (p) {
      case 'inhale': return pattern.inhale;
      case 'hold': return pattern.hold || 0;
      case 'exhale': return pattern.exhale;
      case 'hold_empty': return pattern.hold_empty || 0;
      default: return 0;
    }
  }, [pattern]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && phase !== 'completed' && phase !== 'idle') {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(prev => Math.max(0, prev - 1));
        }, 1000);
      } else {
        const next = getNextPhase(phase);
        setPhase(next);
        setTimeLeft(getPhaseDuration(next));
      }
    }

    return () => clearInterval(timer);
  }, [isActive, phase, timeLeft, getNextPhase, getPhaseDuration]);

  const toggleStart = () => {
    if (phase === 'idle' || phase === 'completed') {
      setPhase('inhale');
      setTimeLeft(getPhaseDuration('inhale'));
      setCurrentCycle(1);
    }
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setPhase('idle');
    setTimeLeft(0);
    setCurrentCycle(1);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      case 'hold_empty': return 'Hold';
      case 'completed': return 'Well Done';
      default: return 'Ready?';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe in through your nose';
      case 'hold': return 'Hold your breath gently';
      case 'exhale': return 'Breathe out through your mouth';
      case 'hold_empty': return 'Keep your lungs empty';
      case 'completed': return exercise.closing;
      default: return 'Find a comfortable position';
    }
  };

  // Animation variants
  const circleVariants = {
    inhale: {
      scale: 1.2,
      transition: { duration: pattern?.inhale || 4, ease: "easeInOut" }
    },
    hold: {
      scale: 1.2,
      transition: { duration: pattern?.hold || 0 }
    },
    exhale: {
      scale: 0.8,
      transition: { duration: pattern?.exhale || 6, ease: "easeInOut" }
    },
    hold_empty: {
      scale: 0.8,
      transition: { duration: pattern?.hold_empty || 0 }
    },
    idle: {
      scale: 1,
      transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-calm-mist-dark text-white p-6 md:p-12 overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold">{exercise.title}</h2>
          <p className="text-sm opacity-70">{exercise.subtitle}</p>
        </div>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Info size={24} />
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4 bg-white/10 rounded-2xl text-sm"
          >
            <h3 className="font-semibold mb-2">Benefits:</h3>
            <ul className="list-disc list-inside mb-4 opacity-80">
              {exercise.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <h3 className="font-semibold mb-2">How to:</h3>
            <p className="opacity-80">{exercise.script_steps[0]}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="relative flex items-center justify-center">
          {/* Background pulses */}
          <motion.div 
            animate={isActive && phase !== 'completed' ? phase : 'idle'}
            variants={circleVariants}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/5 border border-white/10"
          />
          <motion.div 
            animate={isActive && phase !== 'completed' ? phase : 'idle'}
            variants={circleVariants}
            className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/10 border border-white/20"
          />
          
          {/* Main circle */}
          <motion.div 
            animate={isActive && phase !== 'completed' ? phase : 'idle'}
            variants={circleVariants}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-calm-green to-calm-green-dark shadow-2xl flex flex-col items-center justify-center text-center p-4"
          >
            <span className="text-sm font-bold uppercase tracking-widest mb-1">{getPhaseText()}</span>
            {isActive && phase !== 'completed' && phase !== 'idle' && (
              <span className="text-3xl font-light">{timeLeft}</span>
            )}
          </motion.div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-medium h-8">{getPhaseInstruction()}</p>
          {exercise.cycles && (
            <p className="text-sm opacity-60">Cycle {currentCycle} of {exercise.cycles}</p>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={reset}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Reset"
          >
            <RefreshCw size={24} />
          </button>
          
          <button 
            onClick={toggleStart}
            className="w-20 h-20 rounded-full bg-white text-calm-green-dark flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={onClose}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            title="Stop"
          >
            <Square size={24} fill="white" />
          </button>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs opacity-40">
        Focus on the sensation of your breath.
      </div>
    </div>
  );
};
