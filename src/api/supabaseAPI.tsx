import axios from 'axios';

const supabaseAPI = axios.create({
    baseURL: 'https://suihadhlsajlenuxneix.supabase.co/rest/v1',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aWhhZGhsc2FqbGVudXhuZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDU3MjIsImV4cCI6MjAyMjM4MTcyMn0.gIbJ1Nz1mgLAOaTTKuhSnC9NgZQh0ol8UHyeuoNrj_c',
    },
});

export default supabaseAPI;
