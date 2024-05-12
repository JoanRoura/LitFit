/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert, AppState, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image, Input } from 'react-native-elements';
import { supabase } from '../../database/supabase';
import { useAuth } from '../../context/authContext/AuthContext';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const RegisterScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, clearUser } = useAuth();

  const signUpWithEmail = async () => {
    setLoading(true);

    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) { Alert.alert(error.message); }

    if (!session) { Alert.alert('Please check your inbox for email verification!'); }

    setLoading(false);
  };

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
            label="Name"
            labelStyle={{ color: '#fff', fontSize: 16 }}
            // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Name"
            placeholderTextColor="#CDCDD0"
            autoCapitalize={'none'}
            inputStyle={{ color: '#fff' }}
            defaultValue="jrouralema@gmail.com"
          />

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
          onPress={() => signUpWithEmail()}
          style={styles.btnSignIn}
        >
          <Text style={styles.txtButtonSignIn}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.skewedRectangle} /> */}
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
    bottom: -140,
    left: -30,
    right: 0,
    height: 200,
    backgroundColor: '#fff',
    transform: [
      { skewY: '18deg' },
    ],
    zIndex: 999,
  },
});
