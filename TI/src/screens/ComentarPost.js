import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default function ComentarPost(props) {
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const posteoId = props.route.params.posteoId;

    useEffect(() => {
        db.collection('posts')
            .doc(posteoId)
            .onSnapshot(doc => {
                if (doc.exists && doc.data().comentarios) {
                    setComentarios(doc.data().comentarios);
                }
            });
    }, []);

    const enviarComentario = () => {
        if (nuevoComentario.trim() === '') return;

        db.collection('posts')
            .doc(posteoId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    texto: nuevoComentario,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                setNuevoComentario('');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comentarios</Text>

            <FlatList
                data={comentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentarioCard}>
                        <Text style={styles.comentarioEmail}>{item.email}</Text>
                        <Text style={styles.comentarioTexto}>{item.texto}</Text>
                    </View>
                )}
            />

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribí un comentario..."
                    value={nuevoComentario}
                    onChangeText={text => setNuevoComentario(text)}
                />
                <Pressable style={styles.button} onPress={enviarComentario}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#333' },
    comentarioCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#e1e4e6' },
    comentarioEmail: { fontWeight: 'bold', fontSize: 13, color: '#333', marginBottom: 2 },
    comentarioTexto: { fontSize: 14, color: '#555' },
    form: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
    input: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, height: 45 },
    button: { backgroundColor: '#4A90E2', paddingHorizontal: 20, height: 45, justifyContent: 'center', borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});