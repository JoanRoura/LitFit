/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Exercise } from '../interfaces/exerciseInterface';
import { supabase } from '../database/supabase';

export const useExercise = (idRoutine: number) => {

    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [exercisesByRoutine, setExercisesByRoutine] = useState<Exercise[]>([]);

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
            }

        } catch (error: any) {
            console.error('Error in getExercies:', error.message);
        }

    };

    // * Obtenir els exercisis asosicats a una rutina en especific
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
                }
            }

        } catch (error: any) {
            console.error('Error in getExercisesByRoutine:', error.message);
        }
    };

    useEffect(() => {
        getExercises();
        getExercisesByRoutine();
    }, []);

    return {
        exercises,
        exercisesByRoutine,
    };
};
