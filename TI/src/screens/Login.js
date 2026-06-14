import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { auth} from '../firebase/config';

export default function Login ({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                props.navigation.navigate('HomeMenu');
            }
        });
        return () => unsubcribe();
    }, []);

    const onSubmit = () => {
        setLoginError('');
        if (email === '' || password === '') {
            setLoginError('Por favor, completar todos los campos');
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('HomeMenu');
            })
            .catch(error => {
                setLoginError('Credenciales incorrectas' + error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Bienvenido</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                keyboardType="email-address" 
                onChangeText={text => setEmail(text)} 
                value={email} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Contraseña" 
                secureTextEntry={true} 
                onChangeText={text => setPassword(text)} 
                value={password} 
            />

            {loginError ? <Text style={styles.textoError}>{loginError}</Text> : null}

            <Pressable style={styles.boton} onPress={onSubmit}>
                <Text style={styles.textoBoton}>Ingresar</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.textoLink}>¿No tenés cuenta? Registrate acá</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
    boton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
    textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    textoLink: { color: '#4caf50', fontSize: 14, textAlign: 'center', marginTop: 10 },
    textoError: { color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: 'bold' }
});
    
