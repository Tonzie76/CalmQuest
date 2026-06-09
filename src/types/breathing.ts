export interface BreathingPattern {
  inhale: number;
  hold?: number;
  exhale: number;
  hold_empty?: number;
}

export interface BreathingExercise {
  id: string;
  title: string;
  subtitle: string;
  duration_seconds: number;
  cycles?: number;
  pattern?: BreathingPattern;
  category: string;
  difficulty: string;
  benefits: string[];
  script_steps: string[];
  closing: string;
}

export interface BreathingExercisesData {
  description: string;
  total_exercises: number;
  exercises: BreathingExercise[];
}
