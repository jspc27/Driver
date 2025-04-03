import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { ChevronLeft, Edit2, MapPin, Phone, Mail, Shield, Star, Clock } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import styles from "./styles/ProfilePStyles";

const ProfileP = () => {
  const [user, setUser] = useState({
    name: "Maria Rodriguez",
    email: "maria.garcia@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    memberSince: "Enero 2023",
    rating: 4.8,
    trips: 24
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF69B4" />
      
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#FF69B4', '#FF1493']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.push('/Home')}
          >
            <ChevronLeft color="white" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <TouchableOpacity style={styles.editButton} 
          onPress={() => router.push('/EditProfileP')}>
            <Edit2 color="white" size={20} />
          </TouchableOpacity>
        </View>
        
        {/* Avatar y nombre */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: "https://i.pravatar.cc/150?img=47" }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.ratingContainer}>
            <Star fill="gold" color="gold" size={16} />
            <Text style={styles.ratingText}>{user.rating}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Contenido del perfil */}
      <ScrollView style={styles.profileContent}>
        {/* Sección de información */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información de contacto</Text>
          
          <View style={styles.infoItem}>
            <Phone size={20} color="#FF1493" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Mail size={20} color="#FF1493" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
        </View>

        {/* Sección de estadísticas */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Star size={24} color="#FF1493" />
              <Text style={styles.statValue}>{user.rating}</Text>
              <Text style={styles.statLabel}>Puntaje</Text>
            </View>
            
            <View style={styles.statCard}>
              <Clock size={24} color="#FF1493" />
              <Text style={styles.statValue}>{user.trips}</Text>
              <Text style={styles.statLabel}>Viajes</Text>
            </View>
            
            <View style={styles.statCard}>
              <Shield size={24} color="#FF1493" />
              <Text style={styles.statValue}>{user.memberSince}</Text>
              <Text style={styles.statLabel}>Miembro desde</Text>
            </View>
          </View>
        </View>

        {/* Opciones del perfil */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Historial de viajes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Ayuda y soporte</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Cambiar contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, styles.logoutButton]}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileP;