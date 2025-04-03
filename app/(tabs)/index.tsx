import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Lock, Mail, EyeOff, Eye, ChevronLeft} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from "../styles/LoginDStyles"; // Importación corregida
import { router } from 'expo-router';

const LoginD = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Iniciando sesión con:', email);
  };

  return (
    <LinearGradient
      colors={['#6A0DAD', '#8A2BE2']} // Tonos morados vibrantes
      style={styles.container}
    >
        <StatusBar barStyle="light-content" backgroundColor="#6A0DAD" />
      <SafeAreaView style={styles.safeArea}>
      <View>
  </View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/LogoPink.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Conductora</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Mail color="#8A2BE2" size={24} style={styles.inputIcon} />
              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lock color="#8A2BE2" size={24} style={styles.inputIcon} />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                {showPassword ? (
                  <EyeOff color="#8A2BE2" size={24} />
                ) : (
                  <Eye color="#8A2BE2" size={24} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿No tienes cuenta? </Text>
            <TouchableOpacity
              onPress={() => router.push("/RegisterD")}
            >
              <Text style={styles.signupLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginD;