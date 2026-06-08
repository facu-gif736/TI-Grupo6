import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';

export default function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [registerError, setRegisterError] = useState('');

    const onSubmit = () => {
        setRegisterError('');
        if (email === '' || password === '' || userName === '') {
            setRegisterError('Por favor, complete todos los campos');
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
          .then(response => {
                db.collection('users').add({
                    email: email,
                    userName: userName,
                    createdAt: Date.now() 
                })
                .then(() => {
                    console.log("Usuario registrado y guardado en la colección 'users'");
                    props.navigation.navigate('Login');
                })
                .catch(error => {
                    setRegisterError('Error al guardar los datos: ' + error.message);
                });
            })
            .catch(error => {
                setRegisterError(error.message);
            });
    };
    return (
      <View style={styles.container}>
            <Text style={styles.titulo}>Crear Cuenta</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Nombre de usuario" 
                onChangeText={text => setUserName(text)} 
                value={userName} 
            />
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

            {registerError ? <Text style={styles.textoError}>{registerError}</Text> : null}

            <Pressable style={styles.boton} onPress={onSubmit}>
                <Text style={styles.textoBoton}>Registrarme</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textoLink}>¿Ya tenés cuenta? Ingresá acá</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15 },
    boton: { backgroundColor: '#4caf50', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
    textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    textoLink: { color: '#007BFF', fontSize: 14, textAlign: 'center', marginTop: 10 },
    textoError: { color: 'red', marginBottom: 15, textAlign: 'center', fontWeight: 'bold' } 
});