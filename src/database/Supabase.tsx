// * Documentacio oficial:

import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://suihadhlsajlenuxneix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aWhhZGhsc2FqbGVudXhuZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDU3MjIsImV4cCI6MjAyMjM4MTcyMn0.gIbJ1Nz1mgLAOaTTKuhSnC9NgZQh0ol8UHyeuoNrj_c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// * Short Version:

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     'https://suihadhlsajlenuxneix.supabase.co',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aWhhZGhsc2FqbGVudXhuZWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MDU3MjIsImV4cCI6MjAyMjM4MTcyMn0.gIbJ1Nz1mgLAOaTTKuhSnC9NgZQh0ol8UHyeuoNrj_c'
// );

// export { supabase };
