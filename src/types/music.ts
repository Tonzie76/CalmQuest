export interface MusicTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  duration_seconds: number;
  mood_tags: string[];
  tier: 'free' | 'premium';
  frequencies?: {
    carrier: number;
    beat: number;
  };
}

export interface MusicCategory {
  label: string;
  description: string;
  icon: string;
}

export interface MusicData {
  description: string;
  total_tracks: number;
  tracks: MusicTrack[];
  categories: Record<string, MusicCategory>;
}
