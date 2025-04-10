import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StatusBar, Image, TextInput, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { User, HelpCircle, LogOut } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles/HomePStyles";
import { ExternalPathString, RelativePathString, router, UnknownInputParams } from "expo-router";

const HomeP = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [ubicacion, setUbicacion] = useState("");
    const [destino, setDestino] = useState("");
    const [region, setRegion] = useState({
        latitude: 4.6097,
        longitude: -74.0817,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    
    // Animation references
    const menuAnimation = useRef(new Animated.Value(0)).current;

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
                            'User-Agent': 'UberGirl (prietojari27@gmail.com)'
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

    // Animation for menu appearance
    useEffect(() => {
        Animated.timing(menuAnimation, {
            toValue: menuVisible ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [menuVisible]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const navigateTo = (screen: RelativePathString | ExternalPathString | "/_sitemap" | "/(tabs)" | "/(tabs)/explore" | "/explore" | "/" | "/passenger/EditProfileP" | "/passenger/HomeP" | "/passenger/ProfileP" | "/passenger/RegisterP" | "/passenger/TripsP") => {
        closeMenu();
        router.push(screen as RelativePathString | ExternalPathString);
    };

    // Animation styles
    const menuOpacity = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const menuTranslateY = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 0]
    });

    return (
        <LinearGradient colors={['#FFE4F3', '#FFC1E3']} style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFE4F3" />
            
            {/* Mapa como fondo */}
            <View style={styles.mapContainer}>
                <MapView style={styles.map} region={region}>
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView>
            </View>
            
            {/* Overlay to close menu when clicking outside */}
            {menuVisible && (
                <TouchableOpacity 
                    style={styles.menuOverlay} 
                    activeOpacity={1} 
                    onPress={closeMenu}
                />
            )}
            <View style={styles.avatarMenuContainer}>
    <TouchableOpacity 
        onPress={() => navigateTo("./ProfileP")} 
        style={styles.avatarButtonContainer}
        activeOpacity={0.8}
    >
        <Image 
            source={{ uri: "https://i.pravatar.cc/150?img=47" }} 
            style={styles.avatarSmall} 
        />
    </TouchableOpacity>
</View>
            <LinearGradient  colors={['#FFE4F3', '#FFC1E3']} style={styles.footer} >
            
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
                <TouchableOpacity style={styles.confirmButton}>
    <Text style={styles.confirmButtonText}>Confirmar</Text>
</TouchableOpacity>
            </LinearGradient>
        </LinearGradient>
    );
};

export default HomeP;