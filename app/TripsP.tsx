import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  StatusBar 
} from "react-native";
import { 
  ChevronLeft, 
  Search
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import styles from "./styles/TripsPStyles";

const TripsScreen = () => {
  const [activeTab, setActiveTab] = useState("completed");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF69B4" />
      
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#FF69B4', '#FF1493']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.push('/Home')}
          >
            <ChevronLeft color="white" size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mis Viajes</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search color="white" size={22} />
          </TouchableOpacity>
        </View>
        
        {/* Tabs de navegación */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
          >
            <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>
              Completados
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === "canceled" && styles.activeTab]}
            onPress={() => setActiveTab("canceled")}
          >
            <Text style={[styles.tabText, activeTab === "canceled" && styles.activeTabText]}>
              Cancelados
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Contenedor de lista vacío */}
      <View style={styles.emptyContainer}>
        {/*
        <Image 
          source={require('../assets/empty-trips.png')} 
          style={styles.emptyImage} 
        />
         */}
        <Text style={styles.emptyTitle}>No hay viajes en esta sección</Text>
        <Text style={styles.emptyText}>Tus viajes aparecerán aquí</Text>
      </View>
    </View>
  );
};

export default TripsScreen;
