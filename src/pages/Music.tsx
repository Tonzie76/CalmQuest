import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, Leaf, Cloud, Headphones, Wind, 
  Search, Play, Lock, Heart, Clock
} from 'lucide-react';
import musicData from '../content/music-soundscapes.json';
import { MusicData, MusicTrack } from '../types/music';
import { usePlayerStore } from '../store/usePlayerStore';

const data = musicData as MusicData;

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchSearchQuery] = useState('');
  const { currentTrack, setCurrentTrack, isPlaying, togglePlay } = usePlayerStore();

  // Mock premium status
  const isPremium = false;

  const categories = useMemo(() => [
    { id: 'all', label: 'All', icon: Music },
    ...Object.entries(data.categories).map(([id, cat]) => ({
      id,
      label: cat.label,
      icon: getIcon(cat.icon)
    }))
  ], []);

  const filteredTracks = useMemo(() => {
    return data.tracks.filter(track => {
      const matchesCategory = activeCategory === 'all' || track.category === activeCategory;
      const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          track.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  function getIcon(name: string) {
    switch (name) {
      case 'leaf': return Leaf;
      case 'cloud': return Cloud;
      case 'headphones': return Headphones;
      case 'wind': return Wind;
      case 'music': return Music;
      default: return Music;
    }
  }

  const handleTrackClick = (track: MusicTrack) => {
    if (track.tier === 'premium' && !isPremium) {
      // Logic for premium gating could go here
      // For now, we'll allow play but with a visual indicator
      alert("This is a Premium track. Upgrade for full access.");
      return;
    }
    
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      setCurrentTrack(track);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-32">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-bold text-calm-green-dark"
          >
            Soundscapes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-calm-mist-dark/70"
          >
            Curated audio for peace and focus
          </motion.p>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-calm-mist-dark/30" size={18} />
          <input 
            type="text"
            placeholder="Search tracks or moods..."
            value={searchQuery}
            onChange={(e) => setSearchSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-sm border border-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-calm-green/20 transition-all shadow-sm"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-hide no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-calm-green text-white shadow-lg shadow-calm-green/20' 
                    : 'bg-white/60 text-calm-mist-dark/60 hover:bg-white/80'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Track List */}
        <div className="space-y-3">
          {filteredTracks.map((track, index) => {
            const isPlayingThis = currentTrack?.id === track.id && isPlaying;
            const isCurrent = currentTrack?.id === track.id;
            
            return (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={track.id}
                onClick={() => handleTrackClick(track)}
                className={`group relative bg-white/60 backdrop-blur-sm border border-white p-4 rounded-[24px] flex items-center space-x-4 cursor-pointer hover:bg-white hover:shadow-md transition-all ${
                  isCurrent ? 'ring-2 ring-calm-green/20 bg-white shadow-sm' : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden transition-transform group-active:scale-95 ${
                  isCurrent ? 'bg-calm-green text-white' : 'bg-calm-green/10 text-calm-green'
                }`}>
                  {isPlayingThis ? (
                    <div className="flex items-end space-x-0.5 h-6">
                      <motion.div animate={{ height: [4, 16, 8, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-current rounded-full" />
                      <motion.div animate={{ height: [8, 4, 16, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-current rounded-full" />
                      <motion.div animate={{ height: [12, 8, 4, 16, 12] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-current rounded-full" />
                    </div>
                  ) : (
                    <Play size={24} fill={isCurrent ? "white" : "currentColor"} className={isCurrent ? "" : "opacity-60"} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-bold truncate ${isCurrent ? 'text-calm-green-dark' : 'text-gray-800'}`}>
                      {track.title}
                    </h3>
                    {track.tier === 'premium' && (
                      <div className="bg-amber-100 p-0.5 rounded shadow-sm flex-shrink-0">
                        <Lock size={10} className="text-amber-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-calm-mist-dark/60 truncate leading-relaxed">
                    {track.description}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="flex items-center text-[10px] text-calm-mist-dark/40 font-bold uppercase tracking-wider">
                      <Clock size={10} className="mr-1" />
                      {formatDuration(track.duration_seconds)}
                    </span>
                    <div className="flex space-x-1">
                      {track.mood_tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-md capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="p-2 text-calm-mist-dark/20 hover:text-red-400 transition-colors"
                >
                  <Heart size={20} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <Music size={48} className="mx-auto text-calm-mist-dark/10 mb-4" />
            <p className="text-calm-mist-dark/40">No tracks found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
