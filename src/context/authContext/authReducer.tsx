import { User } from "@supabase/supabase-js";

export type AuthAction = { type: 'login', user: User } | { type: 'logout' };

export interface AuthState {
    user: User | null; // Define la forma del objeto de usuario según tus necesidades
    isAuthenticated: boolean;
}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.user, isAuthenticated: true };
        case 'logout':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};
