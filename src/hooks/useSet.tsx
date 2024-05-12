/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { supabase } from '../database/supabase';

export const useSet = (exerciseId: number) => {

    const [sets, setSets] = useState<any>();

    const getSetsByExercise = async () => {
        try {
            const { data: exerciseSetData, error: exerciseSetError } = await supabase
                .from('exercise_set')
                .select('id_set')
                .eq('id_exercise', exerciseId);

            if (exerciseSetError) {
                console.error('Error getting exercise sets:', exerciseSetError.message);
                return;
            }

            const setIdList = exerciseSetData?.map((row: any) => row.id_set) || [];

            const { data: setsData, error: setsError } = await supabase
                .from('sets')
                .select('*')
                .in('id', setIdList);

            if (setsError) {
                console.error('Error getting sets:', setsError.message);
                return;
            }

            setSets(setsData || []);
        } catch (error: any) {
            console.error('Error in getSetsByExercise:', error.message);
        }
    };

    useEffect(() => {
        getSetsByExercise();
    }, []);

    return {
        sets,
    };
};
