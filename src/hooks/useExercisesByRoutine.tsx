/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { supabase } from '../database/supabase';
import { Exercise } from '../interfaces/exerciseInterface';

export const useExercisesByRoutine = (idRoutine: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [exercisesByRoutine, setExercisesByRoutine] = useState<Exercise[]>([]);

    const getExercisesByRoutine = async () => {

        try {
            const { data, error } = await supabase
                .from('routines')
                .select('exercises(*)')
                .eq('id', idRoutine);

            if (error) {
                console.error('Error getting exercises by routine: ', error.message);
            } else {
                if (data && data.length > 0 && data[0].exercises) {
                    setExercisesByRoutine(data[0].exercises);
                    setIsLoading(false);
                }
            }

        } catch (error: any) {
            console.error('Error in getExercisesByRoutine:', error.message);
        }
    };

    useEffect(() => {
        getExercisesByRoutine();
    }, []);

    return {
        isLoading,
        exercisesByRoutine,
    };
};
