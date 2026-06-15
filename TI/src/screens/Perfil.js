import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';

export default function Profile(props) {
    const [misPosteos, setMisPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setMisPosteos(posts);
                setLoading(false);
            });
    }, []);

    function handleLogout() {
        auth.signOut()
            .then(() => {
                props.navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                
                <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
                <Text style={styles.infoText}>Total de posteos: {misPosteos.length}</Text>

                <Pressable style={styles.botonLogout} onPress={() => handleLogout()}>
                    <Text style={styles.textoBoton}>Cerrar Sesión</Text>
                </Pressable>
            </View>

            <Text style={styles.subtitulo}>Mis publicaciones</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#dc3545" />
            ) : (
                <FlatList
                    data={misPosteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text style={styles.descText}>{item.data.descripcion}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: { backgroundColor: "#fff", padding: 20, paddingTop: 50, marginBottom: 15, borderBottomWidth: 1, borderColor: "#ddd", alignItems: "center" },
    titulo: { fontSize: 26, fontWeight: "bold", marginBottom: 15 },
    infoText: { fontSize: 16, color: "#333", marginBottom: 5 },
    botonLogout: { backgroundColor: "#dc3545", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, marginTop: 15 },
    textoBoton: { color: "#fff", fontWeight: "bold", fontSize: 15 },
    subtitulo: { fontSize: 18, fontWeight: "bold", marginHorizontal: 20, marginBottom: 10, color: "#333" },
    postContainer: { backgroundColor: "#fff", borderRadius: 8, padding: 15, marginHorizontal: 16, marginBottom: 10, elevation: 1 },
    descText: { fontSize: 15, color: "#444" }
});