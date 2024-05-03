import React, { useState } from 'react';
import { Alert, AppState, Linking, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { supabase } from '../../database/supabase';

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState .addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async  () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {Alert.alert(error.message);}
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);

    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {Alert.alert(error.message);}

    if (!session) {Alert.alert('Please check your inbox for email verification!');}

    setLoading(false);
  };

  const signInWithGoogle = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {Alert.alert(error.message);}

    if (!data) {return;} // ? Comprova si ha arrbat algo

    const googleLoginUrl = data.url;

    await Linking.openURL(googleLoginUrl!).then(resp => {
      // * url a la que redirigeix despres de crear la compte amb google
      console.log(resp); // ? localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IkplSHNWQnNLWldCdVZJL28iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExMDQwMDIwLCJpYXQiOjE3MTEwMzY0MjAsImlzcyI6Imh0dHBzOi8vc3VpaGFkaGxzYWpsZW51eG5laXguc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjdhODUyYTM5LWZmNjAtNDNmNC05MDEwLWZkOWE2NGE4Mzc4NSIsImVtYWlsIjoianJvdXJhbGVtYUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xvcTJ2S054NVZkMVVIUVhYc3NRYlhiaEtLbEJXU1JXOUlkYnRFSjhCYz1zOTYtYyIsImVtYWlsIjoianJvdXJhbGVtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiSm9hbiBSb3VyYSBMZW1hIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IkpvYW4gUm91cmEgTGVtYSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xvcTJ2S054NVZkMVVIUVhYc3NRYlhiaEtLbEJXU1JXOUlkYnRFSjhCYz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTAwMDYwOTM0NTY1Njg3NTAzODA3Iiwic3ViIjoiMTAwMDYwOTM0NTY1Njg3NTAzODA3In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTEwMzY0MjB9XSwic2Vzc2lvbl9pZCI6ImY0NTg0ODFlLTBjMzAtNDkyNy1hMDJjLTY0ZDMzMGI1MzUzZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.9IIolox0w6W1Wu6qoeMohlIaRovPg2h2Ma6KjIDEU2A&expires_at=1711040020&expires_in=3600&provider_token=ya29.a0Ad52N3-9IrGiTfes4XyLKpG0EA1VLzYzrWSljg1Yn9kI9phdaDur8qZz_gLX0LAnC4EE_pngJPBUNks6qdrv_FQ4pTvZrX6DIiS7cy2H2EAUSb9HxE2Msq93BUHdoRDLQ2eBTVyhsLUiRcWcvTiFAHFEmDnXZmAuhAaCgYKAZMSARASFQHGX2MiM-JHGsQfr88qwFKVg9isBg0169&refresh_token=pod6ucwduhNBbFTKFReazA&token_type=bearer
    });

    setLoading(false);
  };

  // const logOut = () => {

  // }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Google" disabled={loading} onPress={() => signInWithGoogle()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
