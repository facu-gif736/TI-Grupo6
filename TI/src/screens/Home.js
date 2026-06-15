import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';

export default function Home(props) {
    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setPosteos(posts);
                setLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color="#4A90E2" />
            ) : (
                <FlatList
                    data={posteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.post}>
                                <Text style={styles.postOwner}>{item.data.email}</Text>
                                <Text style={styles.postTexto}>{item.data.descripcion}</Text>

                                <View style={styles.acciones}>
                                    <Pressable 
                                        style={styles.comentarBtn} 
                                        onPress={() => props.navigation.navigate("comentarPost", { posteoId: item.id })}
                                    >
                                        <Text style={styles.comentarTexto}>Comentar</Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "#333" },
    post: { backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 14, elevation: 2 },
    postOwner: { fontWeight: "bold", fontSize: 14, marginBottom: 6, color: "#333" },
    postTexto: { fontSize: 14, color: "#555", marginBottom: 10 },
    acciones: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center" },
    comentarBtn: { backgroundColor: "#4A90E2", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6 },
    comentarTexto: { color: "#fff", fontSize: 13, fontWeight: "600" }
});