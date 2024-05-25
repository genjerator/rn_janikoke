import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://your-app-url/api/login', {
                email: email,
                password: password
            });

            const token = response.data.token;
            setToken(token); // Store token in state or AsyncStorage

            // Navigate to the next screen or perform any other action
            // Example: navigation.navigate('Home');
        } catch (error) {
            console.error('Login error:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
});

export default Login;
