import React, { useEffect, useState } from 'react'
import { supabase } from '../database/supabase';
import { Routine } from '../interfaces/routineInterface';

export const useCustomRoutine = (userId: string) => {
    const [customRoutines, setCustomRoutines] = useState<Routine[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCustomRoutines = async () => {
        try {
            const { data, error } = await supabase
                .from('routines')
                .select('*')
                .eq('is_default', false)
                .eq('id_user', userId);

            if (error) {
                console.error('Error fetching custom routines:', error.message);
            } else {
                setCustomRoutines(data);
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Error in getCustomRoutines:', error.message);
            setIsLoading(false);
        }
    };

    const createCustomRoutine = async (customRoutine: Routine) => {
        try {
            const { error } = await supabase
                .from('routines')
                .insert({
                    id: customRoutine.id,
                    id_user: userId,
                    name: customRoutine.name,
                    is_default: false,
                });

            if (error) {
                console.error('Error creating custom routine:', error.message);
                return false; // Devuelve false si hay un error
            } else {
                console.log('Custom routine created successfully');
                return true; // Devuelve true si la rutina se crea con éxito
            }
        } catch (error: any) {
            console.error('Error in createCustomRoutine:', error.message);
            return false; // Devuelve false si hay un error
        }
    };

    const addExercisesToRoutine = async (routineId: number, exerciseIds: number[]) => {
        try {

            console.log('routine id', routineId);
            console.log('exerciseIds', exerciseIds);

            const promises = exerciseIds.map(async (exerciseId) => {
                await supabase
                    .from('routine_exercises')
                    .insert({
                        id_routine: routineId,
                        id_exercise: exerciseId,
                    });
            });

            await Promise.all(promises);

            console.log('Exercises added to routine successfully');
            return true;
        } catch (error: any) {
            console.error('Error adding exercises to routine:', error.message);
            return false;
        }
    };

    useEffect(() => {
        if (userId) {
            getCustomRoutines();

            // ? Configuracio de susbcripcio a els events en temps real a la taula 'routines'
            const routinesCustomSubscription = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'routines' },
                    (payload) => {
                        // console.log('Objecte anterior: ', payload.old);
                        // console.log('Objecte nou: ', payload.new);
                        // console.log('Change received!', payload.new);

                        // ? Actualitza les ruitines si hi ha algun canvi a la base de dades
                        getCustomRoutines();
                    }
                )
                .subscribe();

            // ? Natejar la subscripcio al desmontar el component
            return () => {
                routinesCustomSubscription?.unsubscribe();
            };
        }
    }, [userId]);

    return {
        isLoading,
        getCustomRoutines,
        customRoutines,
        createCustomRoutine,
        addExercisesToRoutine
    };
}
