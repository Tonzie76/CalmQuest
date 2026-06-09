import { create } from 'zustand';
import { MusicTrack } from '../types/music';

interface PlayerState {
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  progress: number;
  duration: number;
  setCurrentTrack: (track: MusicTrack | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  isExpanded: false,
  volume: 0.8,
  progress: 0,
  duration: 0,
  setCurrentTrack: (track) => set({ currentTrack: track, isPlaying: !!track, progress: 0 }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
