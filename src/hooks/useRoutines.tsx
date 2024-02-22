import { useEffect, useState } from 'react';
import supabaseAPI from '../api/supabaseAPI';

export const useRoutines = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [routines, setRoutines] = useState([] as any);

    const getRoutines = async () => {

        const resp = (await supabaseAPI.get<any>('/routines?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aWhhZGhsc2FqbGVudXhuZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDU3MjIsImV4cCI6MjAyMjM4MTcyMn0.gIbJ1Nz1mgLAOaTTKuhSnC9NgZQh0ol8UHyeuoNrj_c&select=*'));

        console.log(resp.data);

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
