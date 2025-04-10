import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  TextInput, 
  ScrollView, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { 
  ChevronLeft, 
  Camera, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Check
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import styles from "./styles/EditPStyles";

const EditProfileP = () => {
  const [userData, setUserData] = useState({
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España"
  });

  const handleChange = (field: string, value: string) => {
    setUserData({...userData, [field]: value});
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    router.push('/ProfileP');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFE4F3" />
      
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#FFE4F3', '#FFC1E3']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/ProfileP')}
          >
            <ChevronLeft color="#FF69B4" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Perfil</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Check color="#FF69B4" size={28} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.formContainer}>
        {/* Sección de foto de perfil */}
        <View style={styles.photoSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: "https://i.pravatar.cc/150?img=47" }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.changePhotoText}>Cambiar foto de perfil</Text>
        </View>

        {/* Formulario de edición */}
        <View style={styles.formSection}>
          {/* Campo de nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#FF1493" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Nombre completo"
              />
            </View>
          </View>

          {/* Campo de correo */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color="#FF1493" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={userData.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Correo electrónico"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Campo de teléfono */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Número de teléfono</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#FF1493" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={userData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                placeholder="Número de teléfono"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileP;