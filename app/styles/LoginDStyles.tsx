import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    keyboardView: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 10, 
    },
    logo: {
      width: 220, 
      height: 220, 
      marginBottom: -25, 
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.25)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
    },
    inputContainer: {
      marginBottom: 24,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    inputIcon: {
      marginLeft: 16,
    },
    input: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#333',
    },
    passwordToggle: {
      paddingRight: 16,
    },
    loginButton: {
      backgroundColor: 'white',
      borderRadius: 10, // Reducido
      paddingVertical: 12, // Reducido
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 }, // Reducido
      shadowOpacity: 0.1,
      shadowRadius: 3, // Reducido
      elevation: 2, // Reducido
      marginTop: -10, // Ajustado
    },
    
    loginButtonPressed: {
      backgroundColor: '#f0f0f0', // Color más claro al presionar
      shadowOpacity: 0.2, // Sombra más pronunciada
    },
    loginButtonText: {
      color: "#8A2BE2",
      fontSize: 18,
      fontWeight: 'bold',
    },
    
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 24,
    },
    signupText: {
      color: 'white',
      fontSize: 16,
    },
    signupLink: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'underline',
    },
  });
  
  export default styles;