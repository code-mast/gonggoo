import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



export default function LoginScreen() {
    const [phone, setPhone] = useState('');


    const handleSendCode=()=>{
        if (phone.length < 10 || phone.length > 11) {
            Alert.alert('휴대폰 번호를 정확히 입력해주세요.');
            return;
        }
            TODO: // Java 서버로 인증번호 요청 API 호출
        Alert.alert(`${phone} 번호로 인증번호를 보냈습니다.`);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>어서오세요.</Text>
            <Text style={styles.subtitle}>휴대폰 번호로 가입해 주세요.</Text>
            <Text style={styles.description}>
                휴대폰 번호는 안전하게 보관되며 공개되지 않아요.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="휴대폰 번호 입력"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}  // 값 바뀔 때 state 업데이트
            />

            <Pressable style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>인증문자 받기</Text>
            </Pressable>
        </View>
    )
    
}    


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        padding:24,
        backgroundColor:"#fff",
    },

    title: {
        fontSize:24,
        fontWeight:'700',
        marginBottom:4,
    },

    subtitle: {
        fontSize:24,
        fontWeight:'700',
        marginBottom:8,
    },

    description: {
        fontSize: 10,
        color: '#6B7280',
        marginBottom: 24,
    },

    input: {
        borderWidth: 1,
        borderRadius:8,
        padding:12,
        fontSize:16,
        marginBottom: 12,
    },

    button: {
        borderWidth:1 ,
        borderColor: '#D1D5DB',
        paddingVertical:1,
        borderRadius : 8,
        alignItems : 'center',
    },

    buttonText: {
        padding:12,
        color : "#0b0a0aff",
        fontSize: 14,
        fontWeight: '500',
        alignItems : 'center',
        justifyContent: 'center',
    },



});


