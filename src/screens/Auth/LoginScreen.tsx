/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, AppState, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { supabase } from '../../database/supabase';
import { useAuth } from '../../context/authContext/AuthContext';
import { useNavigation } from '@react-navigation/native';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const LoginScreen = () => {

  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const signInWithEmail = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      setLoading(false);
      console.log(user?.id);
      navigation.navigate('MainTabs');
    }
  };

  const signInWithGoogle = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) { Alert.alert(error.message); }

    if (!data) { return; } // ? Comprova si ha arribat algo

    const googleLoginUrl = data.url;

    await Linking.openURL(googleLoginUrl!).then(resp => {
      // * url a la que redirigeix despres de crear la compte amb google
      // console.log(resp); // ? localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsImtpZCI6IkplSHNWQnNLWldCdVZJL28iLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzExMDQwMDIwLCJpYXQiOjE3MTEwMzY0MjAsImlzcyI6Imh0dHBzOi8vc3VpaGFkaGxzYWpsZW51eG5laXguc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjdhODUyYTM5LWZmNjAtNDNmNC05MDEwLWZkOWE2NGE4Mzc4NSIsImVtYWlsIjoianJvdXJhbGVtYUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xvcTJ2S054NVZkMVVIUVhYc3NRYlhiaEtLbEJXU1JXOUlkYnRFSjhCYz1zOTYtYyIsImVtYWlsIjoianJvdXJhbGVtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiSm9hbiBSb3VyYSBMZW1hIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6IkpvYW4gUm91cmEgTGVtYSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xvcTJ2S054NVZkMVVIUVhYc3NRYlhiaEtLbEJXU1JXOUlkYnRFSjhCYz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTAwMDYwOTM0NTY1Njg3NTAzODA3Iiwic3ViIjoiMTAwMDYwOTM0NTY1Njg3NTAzODA3In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTEwMzY0MjB9XSwic2Vzc2lvbl9pZCI6ImY0NTg0ODFlLTBjMzAtNDkyNy1hMDJjLTY0ZDMzMGI1MzUzZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.9IIolox0w6W1Wu6qoeMohlIaRovPg2h2Ma6KjIDEU2A&expires_at=1711040020&expires_in=3600&provider_token=ya29.a0Ad52N3-9IrGiTfes4XyLKpG0EA1VLzYzrWSljg1Yn9kI9phdaDur8qZz_gLX0LAnC4EE_pngJPBUNks6qdrv_FQ4pTvZrX6DIiS7cy2H2EAUSb9HxE2Msq93BUHdoRDLQ2eBTVyhsLUiRcWcvTiFAHFEmDnXZmAuhAaCgYKAZMSARASFQHGX2MiM-JHGsQfr88qwFKVg9isBg0169&refresh_token=pod6ucwduhNBbFTKFReazA&token_type=bearer
    });

    setLoading(false);
  };

  // const handleGoogleSignIn = () => {
  //   const config = {
  //     iosClientId: '304428863134-v3jjukekglg7hhrpu2baa4dlsscpf5eg.apps.googleusercontent.com',
  //     androidClientId: '304428863134-npt979jftg6st0h2l5ej2487hao2cp7c.apps.googleusercontent.com',
  //     scopes: ['profile', 'email'],
  //   };
  // };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/LitFit-Logo-White.png')}
          style={styles.imageLogo}
        />
      </View>

      <View style={styles.containerInputs}>
        <Text style={styles.titleSignIn}>Sign In</Text>

        <View>
          <Input
            label="Email"
            labelStyle={{ color: '#fff', fontSize: 16 }}
            // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            placeholderTextColor="#CDCDD0"
            autoCapitalize={'none'}
            inputStyle={{ color: '#fff' }}
            defaultValue="jrouralema@gmail.com"
          />

          <Input
            label="Password"
            labelStyle={{ color: '#fff', fontSize: 16 }}
            // leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#CDCDD0"
            autoCapitalize={'none'}
            inputStyle={{ color: '#fff' }}
          />
        </View>
      </View>

      <View style={styles.containerButtonSignIn}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => signInWithEmail()}
          style={styles.btnSignIn}
        >
          <Text style={styles.txtButtonSignIn}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.containerSignUp}>
          <Text style={styles.txtAccount}>
            Don’t have an Account?
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.txtSignUp}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skewedRectangle} />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3FC9',
    paddingHorizontal: 20,
  },
  containerImage: {
    paddingTop: 64,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    width: 150,
    aspectRatio: 1,
  },
  titleSignIn: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  containerInputs: {
    gap: 24,
    paddingBottom: 24,
  },
  containerButtonSignIn: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerSignUp: {
    paddingTop: 8,
    alignItems: 'center',
  },
  btnSignIn: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  txtButtonSignIn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtAccount: {
    color: '#fff',
  },
  txtSignUp: {
    color: '#fff',
    fontWeight: 'bold',
  },
  skewedRectangle: {
    position: 'absolute',
    bottom: -300,
    left: -50,
    right: 0,
    height: 200,
    backgroundColor: '#fff',
    transform: [
      { skewY: '16deg' },
    ],
    zIndex: 999,
  },
});
