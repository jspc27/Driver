import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Lock, Mail, EyeOff, Eye, Car, Phone, Palette, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import styles from "./styles/RegisterDStyles";

const RegisterD = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVehicleSection, setIsVehicleSection] = useState(false);
  const [phone, setPhone] = useState ('');

  const handleRegister = () => {
    console.log('Registrando con:', email);
  };

  return (
    <LinearGradient colors={['#6A0DAD', '#8A2BE2']} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6A0DAD" />
      <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => router.push('/')}>
      <ChevronLeft color="#fff" size={42} />
    </TouchableOpacity>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/LogoPink.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.logoText}>Conductora</Text>
          </View>

          {!isVehicleSection ? (
            <View style={styles.inputContainer}>
              
              <View style={styles.inputWrapper}>
                <Mail color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Nombre completo" placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="default" autoCapitalize="words" style={styles.input} />
              </View>
              <View style={styles.inputWrapper}>
                <Mail color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Correo electrónico" placeholderTextColor="#999" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
              </View>
              <View style={styles.inputWrapper}>
  <Phone color="#8A2BE2" size={24} style={styles.inputIcon} />
  <TextInput
    placeholder="Teléfono"
    placeholderTextColor="#999"
    value={phone}
    onChangeText={setPhone}
    keyboardType="phone-pad"
    autoCapitalize="none"
    style={styles.input}
  />
</View>

              <View style={styles.inputWrapper}>
                <Lock color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Contraseña" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={styles.input} />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                  {showPassword ? <EyeOff color="#8A2BE2" size={24} /> : <Eye color="#8A2BE2" size={24} />}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              
              <View style={styles.inputWrapper}>
                <Car color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Marca del vehículo" placeholderTextColor="#999" keyboardType="default" style={styles.input} />
              </View>
              <View style={styles.inputWrapper}>
                <Car color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Modelo del vehículo" placeholderTextColor="#999" keyboardType="default" style={styles.input} />
              </View>
              <View style={styles.inputWrapper}>
              <Palette color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Color del vehiculo" placeholderTextColor="#999" keyboardType="default" style={styles.input} />
              </View>
              <View style={styles.inputWrapper}>
                <Car color="#8A2BE2" size={24} style={styles.inputIcon} />
                <TextInput placeholder="Número de placa" placeholderTextColor="#999" keyboardType="default" style={styles.input} />
              </View>
            </View>
          )}

          <TouchableOpacity onPress={() => setIsVehicleSection(!isVehicleSection)} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>{isVehicleSection ? 'Datos de la Conductora' : 'Datos del Vehículo'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push("/")}>
              <Text style={styles.signupLink}>Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterD;
