export interface Exercise {
    id?: number;
    name: string;
    image?: string; // TODO: Cambiar per una imatge real en suapbase
    desc: string;
    longDesc: string;
    video?:  string;
    muscle: MuscleType;
    equipment: string | null;
    intensityLevel: IntensityLevelType;
}

export type MuscleType = 'Biceps' | 'Triceps' | 'Chest' | 'Back' | 'Legs' | 'Abs' | 'Stretching' | 'Warm-up' |  'Lats' | 'Hamstring' | 'Calves' | 'Quadriceps' | 'Trapezius' | 'Shoulders' | 'Glutes';

export type IntensityLevelType = 'Beginner' | 'Intermediate' | 'Expert';
