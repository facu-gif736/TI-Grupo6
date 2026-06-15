import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

export default function Home(props) {
    const [posteos, setPosteos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Asegurate de que 'posts' sea el nombre exacto de tu colección en Firebase
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

    function handleLike(item) {
        const userId = auth.currentUser.email;
        const yaLikeo = item.data.likes.includes(userId);

        if (yaLikeo) {
            db.collection("posts")
                .doc(item.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(userId)
                });
        } else {
            db.collection("posts")
                .doc(item.id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(userId)
                });
        }
    }

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
                        const userId = auth.currentUser.email;
                        const yaLikeo = item.data.likes.includes(userId);

                        return (
                            <View style={styles.post}>
                                <Text style={styles.postOwner}>{item.data.email}</Text>
                                <Text style={styles.postTexto}>{item.data.descripcion}</Text>

                                <View style={styles.acciones}>
                                    <Pressable style={styles.likeBtn} onPress={() => handleLike(item)}>
                                        {yaLikeo ? (
                                            <FontAwesome name="heart" size={20} color="#e74c3c" />
                                        ) : (
                                            <FontAwesome name="heart-o" size={20} color="#999" />
                                        )}
                                        <Text style={styles.likeTexto}>{item.data.likes.length} likes</Text>
                                    </Pressable>

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
    acciones: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    likeBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
    likeTexto: { color: "#999", fontSize: 13 },
    comentarBtn: { backgroundColor: "#4A90E2", paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6 },
    comentarTexto: { color: "#fff", fontSize: 13, fontWeight: "600" }
});