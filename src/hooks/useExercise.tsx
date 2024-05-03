import { useEffect, useState } from 'react';
import { Exercise } from '../interfaces/exerciseInterface';
import { supabase } from '../database/supabase';

export const useExercise = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<Exercise[]>([]);

    // * Obtenir tots els exercisis
    const getExercises = async () => {

        try {
            const { data, error } = await supabase
                .from('exercises')
                .select('*');

            if (error) {
                console.error('Error getting all exercises:', error.message);
            } else {
                setExercises(data);
                setIsLoading(false);
            }

        } catch (error: any) {
            console.error('Error in getExercies:', error.message);
        }

    };

    useEffect(() => {
        getExercises();
    }, []);

    return {
        isLoading,
        exercises,
    };
};
