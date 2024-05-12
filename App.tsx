/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import 'react-native-gesture-handler';

import React from 'react';
import { useState, useEffect } from 'react';
import { Linking, Text } from 'react-native';

import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';

import { StackMain } from './src/navigator/stack/StackMain';
import { supabase } from './src/database/supabase';
import { Tabs } from './src/navigator/tab/Tabs';
import { AuthProvider } from './src/context/authContext/AuthContext';
// import { Tabs } from './src/navigator/tab/Tabs';

const App = () => {
  // Esta función analiza la URL y extrae el token de acceso
  // const extractParams = (url: any) => {
  //   const [, queryString] = url.split('#');
  //   const params = new URLSearchParams(queryString);
  //   const accessToken = params.get('access_token');
  //   console.log('Access Token:', accessToken);
  //   return accessToken;
  // };

  // // Esta función maneja la URL entrante
  // const handleOpenURL = (event: any) => {
  //   const accessToken = extractParams(event.url);
  //   // Haz algo con el accessToken, como guardarlo o iniciar sesión en tu aplicación
  //   console.log('Token from URL:', accessToken);
  // };

  // useEffect(() => {
  //   // Añade el listener para URLs entrantes
  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       handleOpenURL({ url });
  //     }
  //   });
  //   Linking.addEventListener('url', handleOpenURL);

  //   // Limpiar el listener cuando el componente se desmonte
  //   return () => {
  //     Linking.removeAllListeners('url');
  //   };
  // }, []);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('adalt', session?.user.email);

      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('abaix', session?.user.email);

      setSession(session);
    });
  }, []);

  return (
    <AppState>
      <NavigationContainer>
        <StackMain />
        {/* <Text style={{ marginBottom: 200 }}>
        {session && session.user && <Text>{session.user.id}</Text>}
      </Text> */}
        {/* <Tabs /> */}
      </NavigationContainer>
    </AppState>
  );
};

const AppState = ({ children }: any) => {

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default App;
