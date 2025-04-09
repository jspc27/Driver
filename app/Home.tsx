import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StatusBar, Image, TextInput, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { User, Map, LogOut, Menu as MenuIcon, X, Settings, HelpCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles/HomePStyles";
import { router } from "expo-router";

const HomeP = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarAnim = useRef(new Animated.Value(-300)).current;
    const [ubicacion, setUbicacion] = useState("");
    const [destino, setDestino] = useState("");
    const [region, setRegion] = useState({
        latitude: 4.6097,
        longitude: -74.0817,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    useEffect(() => {
        const obtenerUbicacion = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permiso denegado", "No se pudo acceder a la ubicación");
                return;
            }
            
            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 200000,
                    distanceInterval: 50,
                },
                async (location) => {
                    const { latitude, longitude } = location.coords;
                    setRegion((prev) => ({ ...prev, latitude, longitude }));
                    await obtenerDireccion(latitude, longitude);
                }
            );
        };

        const obtenerDireccion = async (lat: number, lng: number) => {
            try {
                let response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`, 
                    {
                        headers: {
                            'User-Agent': 'UberGirl (prietojari27@gmail.com)' // Cambia esto por tu nombre de app y tu correo
                        }
                    }
                );
        
                const textResponse = await response.text();
                console.log(textResponse); 
        
                let data = JSON.parse(textResponse);
                console.log(data);
        
                if (data.address) {
                    setUbicacion(data.address.road || "Ubicación no encontrada");
                } else {
                    setUbicacion("Ubicación no encontrada");
                }
            } catch (error) {
                console.error("Error al obtener la dirección:", error);
                setUbicacion("Error al obtener ubicación");
            }
        };
        

        obtenerUbicacion();
    }, []);

    const toggleSidebar = () => {
        Animated.spring(sidebarAnim, {
            toValue: sidebarOpen ? -300 : 0,
            friction: 10,
            tension: 40,
            useNativeDriver: false,
        }).start(() => {
            if (sidebarOpen) {
                setSidebarOpen(false);
            }
        });
        if (!sidebarOpen) {
            setSidebarOpen(true);
        }
    };

    return (
        <LinearGradient colors={['#6A0DAD', '#8A2BE2']} style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#6A0DAD" />
            
            {/* Mapa como fondo */}
            <View style={styles.mapContainer}>
                <MapView style={styles.map} region={region}>
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView>
            </View>
            
            {/* Botón de menú */}
            {!sidebarOpen && (
                <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
                    <MenuIcon size={28} color="#8A2BE2" />
                </TouchableOpacity>
            )}

            {/* Sidebar animado */}
            <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
                <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
                    <X size={28} color="#8A2BE2" />
                </TouchableOpacity>

                {/* Perfil */}
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Image source={require("../assets/images/profile-placeholder.png")} style={styles.avatar} />
                    </View>
                    <Text style={styles.username}>María Rodríguez</Text>
                    <Text style={styles.userRole}>Conductora</Text>
                </View>

                {/* Menú */}
                <View style={styles.menuSection}>
                    <TouchableOpacity onPress={() => router.push("/ProfileP")} style={styles.menuItem}>
                        <User size={22} color="#8A2BE2" />
                        <Text style={styles.menuText}>Mi Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/TripsP")} style={styles.menuItem}>
                        <Map size={22} color="#8A2BE2" />
                        <Text style={styles.menuText}>Mis Viajes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <HelpCircle size={22} color="#8A2BE2" />
                        <Text style={styles.menuText}>Ayuda/Soporte</Text>
                    </TouchableOpacity>
                </View>

                {/* Cerrar sesión */}
                <TouchableOpacity  onPress={() => router.push("/(tabs)")} style={styles.logoutButton}>
                    <LogOut size={22} color="#fff" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.footer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ubicación actual"
                    placeholderTextColor="#666"
                    value={ubicacion}
                    onChangeText={setUbicacion}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    placeholder="¿A dónde quieres ir?"
                    placeholderTextColor="#666"
                    value={destino}
                    onChangeText={setDestino}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default HomeP;
