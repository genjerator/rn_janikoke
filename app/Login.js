import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import {API_URL} from "../Constants";
import {useChallenges} from "../context/ChallengesContext";
import {useUser} from "../context/UserContext";
import {router} from "expo-router";

const Login = ({ setToken }) => {
    const { user, setUser,setSignedUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("login button")
        try {
            const url =API_URL + '/login';
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
            <Button title="Loginx" onPress={handleLogin} />
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
