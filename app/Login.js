import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import {API_URL} from "./axios/Constants";
import {useUser} from "./context/UserContext";
import {router} from "expo-router";

const Login = () => {
    const { setSignedUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        console.log("login button")
        try {
            setError(''); // Clear any previous errors
            const url =API_URL + '/login';
            console.log(url);
            const response = await axios.post(url, {
                email: email,
                password: password
            });

            const user = response.data;
            setSignedUser(response.data);
            console.log("llll",user)
            if(user && user.name){
                router.push({pathname: ``});
            }

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
                // The request was made but no response was received
                setError('Network error: Please check your internet connection');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred');
            }
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button title="Login1" onPress={handleLogin} />
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
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
