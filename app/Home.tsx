import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StatusBar, Image, TextInput, Alert, Switch, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { User, HelpCircle, LogOut, Check, X, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles/HomePStyles";
import { ExternalPathString, RelativePathString, router, UnknownInputParams } from "expo-router";

const HomeP = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [ubicacion, setUbicacion] = useState("");
    const [isDriverActive, setIsDriverActive] = useState(false);
    const [showRideRequest, setShowRideRequest] = useState(false);
    const [region, setRegion] = useState({
        latitude: 4.6097,
        longitude: -74.0817,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    
    // Datos de ejemplo para el servicio propuesto
    const [rideRequest, setRideRequest] = useState({
        pickupLocation: "Calle 127 # 11B-42",
        destination: "Centro Comercial Santafé",
        distance: 3.5, // Kilómetros
        estimatedTime: 12, // Minutos
        passenger: {
            name: "Carolina Gómez",
            phone: "+57 315 789 4321",
            whatsapp: "+573157894321",
            photo: "https://i.pravatar.cc/150?img=23"
        }
    });
    
    // Animation references
    const menuAnimation = useRef(new Animated.Value(0)).current;
    const rideRequestAnimation = useRef(new Animated.Value(0)).current;

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
                let data = JSON.parse(textResponse);
        
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

    // Efecto para simular la llegada de un nuevo servicio
    useEffect(() => {
        let timeout: string | number | NodeJS.Timeout | undefined;
        if (isDriverActive) {
            timeout = setTimeout(() => {
                setShowRideRequest(true);
                // Reproducir sonido de notificación aquí si se desea
            }, 3000);
        } else {
            setShowRideRequest(false);
        }
        
        return () => clearTimeout(timeout);
    }, [isDriverActive]);

    // Animaciones
    useEffect(() => {
        Animated.timing(menuAnimation, {
            toValue: menuVisible ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
        
        Animated.timing(rideRequestAnimation, {
            toValue: showRideRequest ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [menuVisible, showRideRequest]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const navigateTo = (screen: RelativePathString | ExternalPathString | "/EditProfileP" | "/Home" | "/ProfileP" | "/RegisterD" | "/TripsP" | "/_sitemap" | "/(tabs)" | `${"/(tabs)"}/explore` | `/explore` | `${"/(tabs)"}` | `/` | `/styles/EditPStyles` | `/styles/HomePStyles` | `/styles/LoginDStyles` | `/styles/ProfilePStyles` | `/styles/RegisterDStyles` | `/styles/TripsPStyles`) => {
        closeMenu();
        router.push(screen as RelativePathString | ExternalPathString);
    };
    
    const toggleDriverActive = () => {
        setIsDriverActive(!isDriverActive);
    };
    
    const handleAcceptRide = () => {
        // Lógica para aceptar el viaje
        setShowRideRequest(false);
    };
    
    const handleRejectRide = () => {
        // Lógica para rechazar el viaje
        setShowRideRequest(false);
    };
    
    const openWhatsApp = () => {
        Linking.openURL(`whatsapp://send?phone=${rideRequest.passenger.whatsapp}`).catch(() => {
            Alert.alert(
                "Error", 
                "No se pudo abrir WhatsApp. Asegúrate de tenerlo instalado.",
                [{ text: "OK" }]
            );
        });
    };
    
    const callPassenger = () => {
        Linking.openURL(`tel:${rideRequest.passenger.phone.replace(/\s/g, '')}`);
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
    
    const rideRequestTranslateY = rideRequestAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0]
    });
    
    const rideRequestOpacity = rideRequestAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
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
            
            {/* Solicitud de viaje */}
            {showRideRequest && (
                <Animated.View 
                    style={[
                        styles.rideRequestContainer, 
                        { 
                            opacity: rideRequestOpacity,
                            transform: [{ translateY: rideRequestTranslateY }] 
                        }
                    ]}
                >
                    <View style={styles.rideRequestHeader}>
                        <Text style={styles.rideRequestTitle}>Nueva solicitud de viaje</Text>
                    </View>
                    
                    {/* Información de la pasajera */}
                    <View style={styles.passengerInfoContainer}>
                        <Image 
                            source={{ uri: rideRequest.passenger.photo }} 
                            style={styles.passengerPhoto} 
                        />
                        <View style={styles.passengerDetails}>
                            <Text style={styles.passengerName}>{rideRequest.passenger.name}</Text>
                        </View>
                        <View style={styles.contactButtons}>
                            <TouchableOpacity 
                                style={styles.contactButton}
                                onPress={openWhatsApp}
                            >
                                <MessageCircle size={22} color="#25D366" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.contactButton}
                                onPress={callPassenger}
                            >
                                <Phone size={22} color="#FF69B4" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.rideRequestDetails}>
                        <View style={styles.locationRow}>
                            <View style={styles.locationPoint} />
                            <Text style={styles.locationText}>{rideRequest.pickupLocation}</Text>
                        </View>
                        
                        <View style={styles.verticalLine} />
                        
                        <View style={styles.locationRow}>
                            <View style={[styles.locationPoint, styles.destinationPoint]} />
                            <Text style={styles.locationText}>{rideRequest.destination}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.rideMetrics}>
                        <View style={styles.metricItem}>
                            <Clock size={18} color="#FF69B4" />
                            <Text style={styles.metricText}>{rideRequest.estimatedTime} min</Text>
                        </View>
                        
                        <View style={styles.metricItem}>
                            <MapPin size={18} color="#FF69B4" />
                            <Text style={styles.metricText}>{rideRequest.distance} km</Text>
                        </View>
                    </View>
                    
                    <View style={styles.rideRequestActions}>
                        <TouchableOpacity 
                            style={styles.rejectButton}
                            onPress={handleRejectRide}
                        >
                            <X size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Rechazar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.acceptButton}
                            onPress={handleAcceptRide}
                        >
                            <Check size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
            
            {/* Footer */}
            <LinearGradient colors={['#FFE4F3', '#FFC1E3']} style={styles.driverFooter}>
                <View style={styles.footerContent}>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>
                            {isDriverActive ? "Disponible" : "No disponible"}
                        </Text>
                        <Switch
                            value={isDriverActive}
                            onValueChange={toggleDriverActive}
                            trackColor={{ false: "#d3d3d3", true: "#FF9ECE" }}
                            thumbColor={isDriverActive ? "#FF69B4" : "#f4f3f4"}
                            ios_backgroundColor="#d3d3d3"
                            style={styles.statusSwitch}
                        />
                    </View>
                    
                    <Text style={styles.driverLocationText}>
                        Tu ubicación actual: {ubicacion}
                    </Text>
                    
                    <Text style={[
                        styles.driverStatusInfo,
                        { color: isDriverActive ? "#FF69B4" : "#757575" }
                    ]}>
                        {isDriverActive 
                            ? "Esperando solicitudes de viaje..." 
                            : "Activa tu disponibilidad para recibir viajes"}
                    </Text>
                </View>
            </LinearGradient>
        </LinearGradient>
    );
};

export default HomeP;