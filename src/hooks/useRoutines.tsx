import { useEffect, useState } from 'react';
import supabaseAPI from '../api/supabaseAPI';
import { Routine } from '../interfaces/routineInterface';

export const useRoutines = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [routines, setRoutines] = useState<Routine[]>([]);

    const getRoutines = async () => {

        const resp = (await supabaseAPI.get<Routine[]>('/routines'));

        setRoutines(resp.data);

        setIsLoading(false);
    };

    useEffect(() => {
      getRoutines();
    }, []);

    return {
        isLoading,
        routines,
    };
};
