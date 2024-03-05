/* eslint-disable @typescript-eslint/no-shadow */
import 'react-native-gesture-handler';

import React from 'react';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';

import { Session } from '@supabase/supabase-js';
import { NavigationContainer } from '@react-navigation/native';

import { StackMain } from './src/navigator/stack/StackMain';
import { supabase } from './src/database/supabase';
// import { Tabs } from './src/navigator/tab/Tabs';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <StackMain />
      <Text style={{ marginBottom: 400 }}>
        {session && session.user && <Text>{session.user.id}</Text>}
      </Text>
      {/* <Tabs /> */}
    </NavigationContainer>
  );
};

export default App;
