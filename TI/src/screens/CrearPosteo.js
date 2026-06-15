import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'; 

import { db, auth } from '../firebase/config'; 

export default function CrearPosteo({ navigation }) {
    const [descripcion, setDescripcion] = useState(''); 

    const crearPost = () => {
        if (descripcion.trim() === '') {
            console.log("El posteo no puede estar vacio");
            return;
        }

        db.collection('posts').add({
            email: auth.currentUser.email, 
            descripcion: descripcion,
            likes: [], 
            createdAt: Date.now(), 
            imagen: '' 
        })
        .then(() => {
            console.log("Posteo creado exitosamente");
            setDescripcion(''); 
            
            navigation.navigate('Home'); 
        })
        .catch((error) => console.log("Error al crear el post:", error));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Nuevo Posteo</Text>

            <TextInput
                style={styles.input}
                placeholder="Escribi una descripción..."
                keyboardType="default"
                onChangeText={(text) => setDescripcion(text)} 
                value={descripcion}
                multiline={true} 
                numberOfLines={4}
            />

            <Pressable style={styles.button} onPress={() => crearPost()}>
                <Text style={styles.buttonText}>Publicar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 30
    },
    input: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        textAlignVertical: 'top' 
    },
    button: {
        backgroundColor: '#007BFF', 
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});