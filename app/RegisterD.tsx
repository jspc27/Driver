import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from 'react-native';
import { Lock, Mail, EyeOff, Eye, Car, Phone, Palette, ChevronLeft, IdCard, User, CreditCard, Hash } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import styles from "./styles/RegisterDStyles";

const RegisterD = () => {
  // Form state variables
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: '',
    password: '',
    vehicleType: '', // 'car', 'motorcycle', 'motocarro'
    licenseNumber: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleColor: '',
    plateNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // Update form data
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle submission
  const handleRegister = () => {
    console.log('Registrando con:', formData);
    // Add your registration logic here
  };

  // Handle next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Handle previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render step indicator
  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {[1, 2, 3].map((step) => (
          <View 
            key={step} 
            style={[
              styles.stepDot, 
              currentStep === step ? styles.activeStepDot : null
            ]}
          />
        ))}
      </View>
    );
  };

  // Render form based on current step
  const renderForm = () => {
    switch(currentStep) {
      case 1:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Datos Personales</Text>
            <View style={styles.inputWrapper}>
              <User color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Nombre completo" 
                placeholderTextColor="#999" 
                value={formData.fullName} 
                onChangeText={(text) => updateFormData('fullName', text)} 
                keyboardType="default" 
                autoCapitalize="words" 
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrapper}>
              <CreditCard color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput
                placeholder="Cédula"
                placeholderTextColor="#999"
                value={formData.idNumber}
                onChangeText={(text) => updateFormData('idNumber', text)}
                keyboardType="number-pad"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Mail color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Correo electrónico" 
                placeholderTextColor="#999" 
                value={formData.email} 
                onChangeText={(text) => updateFormData('email', text)} 
                keyboardType="email-address" 
                autoCapitalize="none" 
                style={styles.input} 
              />
            </View>
            <View style={styles.inputWrapper}>
              <Phone color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput
                placeholder="Teléfono"
                placeholderTextColor="#999"
                value={formData.phone}
                onChangeText={(text) => updateFormData('phone', text)}
                keyboardType="phone-pad"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Lock color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor="#999" 
                value={formData.password} 
                onChangeText={(text) => updateFormData('password', text)} 
                secureTextEntry={!showPassword} 
                style={styles.input} 
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                {showPassword ? <EyeOff color='#FF69B4' size={24} /> : <Eye color='#FF69B4' size={24} />}
              </TouchableOpacity>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Tipo de Vehículo</Text>
            <View style={styles.vehicleTypeContainer}>
  <TouchableOpacity 
    style={[
      styles.vehicleTypeOption, 
      formData.vehicleType === 'car' ? styles.selectedVehicleType : null
    ]}
    onPress={() => updateFormData('vehicleType', 'car')}
  >
    <Image 
      source={require('../assets/images/carro.png')} // Ruta de la imagen del carro
      style={styles.vehicleImage} 
      resizeMode="contain" 
    />
    <Text style={[
      styles.vehicleTypeText,
      formData.vehicleType === 'car' ? styles.selectedVehicleTypeText : null
    ]}>Carro</Text>
  </TouchableOpacity>
  
  <TouchableOpacity 
    style={[
      styles.vehicleTypeOption, 
      formData.vehicleType === 'motorcycle' ? styles.selectedVehicleType : null
    ]}
    onPress={() => updateFormData('vehicleType', 'motorcycle')}
  >
    <Image 
      source={require('../assets/images/moto.png')} // Ruta de la imagen de la moto
      style={styles.vehicleImage} 
      resizeMode="contain" 
    />
    <Text style={[
      styles.vehicleTypeText,
      formData.vehicleType === 'motorcycle' ? styles.selectedVehicleTypeText : null
    ]}>Moto</Text>
  </TouchableOpacity>
  
  <TouchableOpacity 
    style={[
      styles.vehicleTypeOption, 
      formData.vehicleType === 'motocarro' ? styles.selectedVehicleType : null
    ]}
    onPress={() => updateFormData('vehicleType', 'motocarro')}
  >
    <Image 
      source={require('../assets/images/motocarro.png')} // Ruta de la imagen del motocarro
      style={styles.vehicleImage} 
      resizeMode="contain" 
    />
    <Text style={[
      styles.vehicleTypeText,
      formData.vehicleType === 'motocarro' ? styles.selectedVehicleTypeText : null
    ]}>Moto - carro</Text>
  </TouchableOpacity>
</View>
          </View>
        );
      case 3:
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.sectionTitle}>Datos del Vehículo</Text>
            <View style={styles.inputWrapper}>
              <IdCard color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput
                placeholder="Número de licencia de conducción"
                placeholderTextColor="#999"
                keyboardType="default"
                style={styles.input}
                value={formData.licenseNumber}
                onChangeText={(text) => updateFormData('licenseNumber', text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Car color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Marca del vehículo" 
                placeholderTextColor="#999" 
                keyboardType="default" 
                style={styles.input} 
                value={formData.vehicleBrand}
                onChangeText={(text) => updateFormData('vehicleBrand', text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Car color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Modelo del vehículo" 
                placeholderTextColor="#999" 
                keyboardType="default" 
                style={styles.input}
                value={formData.vehicleModel}
                onChangeText={(text) => updateFormData('vehicleModel', text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Palette color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Color del vehiculo" 
                placeholderTextColor="#999" 
                keyboardType="default" 
                style={styles.input}
                value={formData.vehicleColor}
                onChangeText={(text) => updateFormData('vehicleColor', text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Hash color='#FF69B4' size={24} style={styles.inputIcon} />
              <TextInput 
                placeholder="Número de placa" 
                placeholderTextColor="#999" 
                keyboardType="default" 
                style={styles.input}
                value={formData.plateNumber}
                onChangeText={(text) => updateFormData('plateNumber', text)}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  // Render buttons based on current step
  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <TouchableOpacity onPress={goToNextStep} style={styles.nextButton}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      );
    } else if (currentStep === 2) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToPreviousStep} style={styles.backButton}>
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextStep} style={styles.nextButton}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goToPreviousStep} style={styles.backButton}>
            <Text style={styles.backButtonText}>Atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <LinearGradient
      colors={['#FFE4F3', '#FFC1E3']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFE4F3" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.logoContainer}>
              <Image 
                source={require('../assets/images/LogoPink.png')} 
                style={styles.logo} 
                resizeMode="contain" 
              />
            </View>

            {renderStepIndicator()}
            {renderForm()}
            {renderButtons()}

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.signupLink}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RegisterD;