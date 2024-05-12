// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthState, authReducer } from './authReducer'; // Importa el reducer
import { supabase } from '../../database/supabase';

const AuthContext = createContext<AuthState | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, isAuthenticated: false });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error('Error al obtener la sesión:', error.message);
            } else if (session) {
                console.log('Usuario autenticado:', session.user.email);
                dispatch({ type: 'login', user: session.user });
            }
        });
    }, []);

    useEffect(() => {
        const subscription = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                dispatch({ type: 'login', user: session!.user });
            } else if (event === 'SIGNED_OUT') {
                dispatch({ type: 'logout' });
            }
        });

        return () => {
            subscription.data.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    );
};
