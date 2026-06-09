import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, 
  ChevronDown, Maximize2, Repeat, Shuffle, Heart
} from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';

export const MusicPlayer: React.FC = () => {
  const { 
    currentTrack, isPlaying, isExpanded, progress, duration, volume,
    setIsPlaying, setIsExpanded, setProgress, setDuration, togglePlay, setCurrentTrack
  } = usePlayerStore();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  // Placeholder audio if no real URL is provided in metadata
  // In a real app, track.url would be used.
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  return (
    <>
      <audio 
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence>
        {!isExpanded ? (
          /* Mini Player Bar */
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-20 left-0 right-0 z-20 px-4"
          >
            <div 
              onClick={() => setIsExpanded(true)}
              className="bg-[#111d4d]/90 backdrop-blur-lg border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-2xl cursor-pointer"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-calm-green to-blue-600 flex-shrink-0 flex items-center justify-center">
                  <Volume2 size={20} className="text-white/80" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white text-sm font-medium truncate">{currentTrack.title}</h4>
                  <p className="text-white/50 text-xs truncate capitalize">{currentTrack.category}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="w-10 h-10 flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentTrack(null); }}
                  className="w-10 h-10 flex items-center justify-center text-white/40"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
              
              {/* Mini progress line */}
              <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-white/10 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-calm-green transition-all duration-300" 
                  style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* Full Screen Player */
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a1628] via-[#111d4d] to-[#1a2a5e] text-white flex flex-col"
          >
            <div className="p-6 flex items-center justify-between">
              <button onClick={() => setIsExpanded(false)} className="p-2 -ml-2 rounded-full hover:bg-white/10">
                <ChevronDown size={28} />
              </button>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Now Playing</p>
                <p className="text-sm font-medium text-white/80">{currentTrack.category.replace('_', ' ')}</p>
              </div>
              <button className="p-2 -mr-2 rounded-full hover:bg-white/10 text-white/60">
                <Heart size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8">
              {/* Animated Album Art */}
              <motion.div 
                animate={{ scale: isPlaying ? 1 : 0.9, rotate: isPlaying ? [0, 1, -1, 0] : 0 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="w-full max-w-[280px] aspect-square rounded-[32px] bg-gradient-to-br from-calm-green/20 via-blue-600/20 to-purple-600/20 border border-white/10 shadow-2xl flex items-center justify-center relative overflow-hidden mb-12"
              >
                {/* Decorative glows */}
                <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent" />
                <Volume2 size={80} className="text-white/20" />
                
                {/* Visualizer bars placeholder */}
                <div className="absolute bottom-8 flex items-end space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 4 }}
                      transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                      className="w-1.5 bg-calm-green rounded-full opacity-60"
                    />
                  ))}
                </div>
              </motion.div>

              <div className="text-center w-full mb-10">
                <h2 className="text-2xl font-bold mb-2">{currentTrack.title}</h2>
                <p className="text-white/50">{currentTrack.description}</p>
              </div>

              {/* Progress Slider */}
              <div className="w-full space-y-2 mb-8">
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none accent-calm-green cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-medium text-white/30 font-mono">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="w-full flex items-center justify-between mb-12">
                <button className="text-white/40 hover:text-white transition-colors">
                  <Shuffle size={20} />
                </button>
                <div className="flex items-center space-x-8">
                  <button className="text-white hover:text-calm-green transition-colors">
                    <SkipBack size={32} fill="currentColor" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#111d4d] shadow-xl hover:scale-105 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="text-white hover:text-calm-green transition-colors">
                    <SkipForward size={32} fill="currentColor" />
                  </button>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                  <Repeat size={20} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="w-full flex items-center space-x-4 px-4">
                <Volume2 size={16} className="text-white/40" />
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => usePlayerStore.getState().setVolume(Number(e.target.value))}
                  className="flex-1 h-1 bg-white/10 rounded-full appearance-none accent-white/60 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-8 text-center">
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors"
              >
                Back to Library
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
