import { useEffect, useState } from 'react';
import { Routine } from '../interfaces/routineInterface';
import { supabase } from '../database/Supabase';

export const useRoutines = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [routines, setRoutines] = useState<Routine[]>([]);
    // const [routinesDefault, setRoutinesDefault] = useState<Routine[]>([]);

    // * Obtenir totes les rutines
    const getRoutines = async () => {
        // ? Obtenir les ruitnes per request HTTP
        // ! No te sentit fer-ho d'aquesta manera si el proi Supabase proporciona funcions
        // const resp = (await supabaseAPI.get<Routine[]>('/routines'));
        // setRoutines(resp.data);
        // setIsLoading(false);

        try {
            const { data, error } = await supabase
                .from('routines')
                .select('*');

            if (error) {
                console.error('Error fetching users data:', error.message);
            } else {
                setRoutines(data);
                setIsLoading(false);
            }
        } catch (error: any) {
            console.error('Error in fetchUsersData:', error.message);
        }
    };

    useEffect(() => {
        // ? Obtenir rutines al montar el component
        getRoutines();

        // ? Configuracio de susbcripcio a els events en temps real a la taula 'routines'
        const routinesSubscription = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'routines' },
                (payload) => {
                    console.log('Change received!', payload.new);

                    // ? Actualitza les ruitines si hi ha algun canvi a la base de dades
                    getRoutines();
                }
            )
            .subscribe();

        // ? Natejar la subscripcio al desmontar el component
        return () => {
            routinesSubscription?.unsubscribe();
        };
    }, []);

    return {
        isLoading,
        routines,
    };
};
