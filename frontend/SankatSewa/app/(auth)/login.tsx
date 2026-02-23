import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

export default function Login() {
    const { login } = useAuth()
    const router = useRouter();
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {

        try {
            await login(username, password);
            router.replace("/");
        } catch (error) {
            Alert.alert(""+error);
        }


    }
    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput style={styles.input} onChangeText={setUsername}/>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry />
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonLabel}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#cc2424',
        borderRadius: 10,
        width: '100%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
})