import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StatusBar, Image, TextInput, Alert, Switch, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { User, HelpCircle, LogOut, Check, X, Clock, MapPin, MessageCircle, Phone, Star } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles/HomePStyles";
import { ExternalPathString, RelativePathString, router } from "expo-router";

const HomeP = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [ubicacion, setUbicacion] = useState("");
    const [isDriverActive, setIsDriverActive] = useState(false);
    const [showRideRequest, setShowRideRequest] = useState(false);
    const [region, setRegion] = useState({
        latitude: 3.4516, // Coordenadas de Cali
        longitude: -76.5319,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [rideRequest, setRideRequest] = useState({
        pickupLocation: "Av. Circunvalar #9-42, Belen, Cali, Valle del Cauca", // Dirección de recogida
        destination: "Centro Comercial Palmetto", // Destino
        distance: 3.5, // Distancia en kilómetros
        estimatedTime: 12, // Tiempo estimado en minutos
        passenger: {
            name: "Carolina Gómez",
            phone: "+57 315 789 4321",
            whatsapp: "+573157894321",
            photo: "https://i.pravatar.cc/150?img=23",
            latitude: 3.4409, // Coordenadas del pasajero en Cali
            longitude: -76.5225,
        },
    });

    const [routeToPickup, setRouteToPickup] = useState<{ latitude: number; longitude: number }[]>([]);
    
    const fetchRouteToPickup = async () => {
        if (!region.latitude || !region.longitude) {
            console.warn("Ubicación actual no disponible.");
            return;
        }
    
        const origin = `${region.latitude},${region.longitude}`;
        const destination = `${rideRequest.passenger.latitude},${rideRequest.passenger.longitude}`;
        const apiKey = "AIzaSyB2OJc4ACBmYRNyILaTTCGJicbApIU-cqE"; 
    
        console.log("🧭 Origen:", origin);
        console.log("🧭 Destino:", destination);
    
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
            );
            const data = await response.json();
    
            if (data.routes.length > 0) {
                const points = data.routes[0].overview_polyline.points;
                const coordinates = decodePolyline(points);
                setRouteToPickup(coordinates);
            } else {
                console.error("❌ No se encontró una ruta.");
                console.log("Google response:", data);
            }
        } catch (error) {
            console.error("🚨 Error al obtener la ruta:", error);
        }
    };
    
    
    // Decodifica la polyline de Google Maps
    const decodePolyline = (t: string, e = 5) => {
        let points = [];
        let index = 0,
            lat = 0,
            lng = 0;
    
        while (index < t.length) {
            let b, shift = 0,
                result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;
    
            shift = 0;
            result = 0;
            do {
                b = t.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;
    
            points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
        return points;
    };
    
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
                }
            );
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
    useEffect(() => {
        if (!showRideRequest && isDriverActive) {
            fetchRouteToPickup();
        }
    }, [showRideRequest, isDriverActive]);    
    
    const handleAcceptRide = () => {
        setShowRideRequest(false);
        fetchRouteToPickup();
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
            
            {/* Implementación de Google Maps */}
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={region}
                    initialRegion={region}
                >
                    <Marker
  coordinate={{ latitude: region.latitude, longitude: region.longitude }}
  title="Tú (conductora)"
  pinColor="red"
/>
<Marker
  coordinate={{ latitude: rideRequest.passenger.latitude, longitude: rideRequest.passenger.longitude }}
  title="Pasajera"
  pinColor="green"
/>
                    {routeToPickup.length > 0 && (
                        <Polyline
                            coordinates={routeToPickup}
                            strokeColor="#FF69B4"
                            strokeWidth={4}
                        />
                    )}
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