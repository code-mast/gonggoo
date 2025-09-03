import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  // 단계 관리
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  // 입력값 상태
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // 타이머
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (step === 'code' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  // 인증번호 전송
  const handleSendCode = () => {
    if (phone.length < 10 || phone.length > 11 || phone.slice(0, 3) !== '010') {
      setError('앗, 휴대폰 번호가 맞지 않아요.');
      return;
    }
    setError('');
    setStep('code');
    setTimeLeft(300);
  };

  // 뒤로가기
  const handleBack = () => {
    if (step === 'code') {
      setStep('phone');
    } else {
      router.back();
    }
  };

  // 인증번호 확인
  const handleVerifyCode = () => {
    if (code.length < 6) {
      setError('앗, 인증번호가 맞지 않아요.');
      return;
    }
    setError('');
    setStep('code');
    setTimeLeft(300);
    // TODO: Java 서버 API 호출 → 인증번호 검증
  };

  // 인증번호 재전송 (API와 구성필요)
  /* const resendCode = () => {
    if () {
      
    }
  } */

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <Pressable style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>

      {step === 'phone' ? (
        <>
          <Text style={styles.title}>휴대폰 번호로 가입해주세요.</Text>
          <Text style={[styles.subtitle, error ? styles.errorLabel: null]}>휴대폰 번호</Text>

          {/* 휴대폰 번호 입력칸 + X 버튼 */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              placeholder="숫자만 입력해 주세요"
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              clearButtonMode="while-editing" // iOS 전용 X 버튼
            />
            {/* Android에서는 수동 X 버튼 */}
            {Platform.OS === 'android' && phone.length > 0 && (
              <Pressable style={styles.clearButton} onPress={() => setPhone('')}>
                <Text style={styles.clearText}>X</Text>
              </Pressable>
            )}
          </View>

          {/* 에러 메시지 */}
          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

          {/* 인증번호 전송 버튼 */}
          <Pressable
            style={[
              styles.button,
              phone.length >= 10 ? styles.buttonActive : styles.buttonDisabled,
            ]}
            disabled={phone.length < 10}
            onPress={handleSendCode}
          >
            <Text style={styles.buttonText}>인증번호 전송</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style = {styles.title}>인증번호를 입력해 주세요</Text>
          <Text style = {[styles.subtitle, error ? styles.errorLabel: null]}>인증번호</Text>

          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="숫자를 입력해 주세요"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />

          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

          {/* 남은 시간 */}
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

          {/* 인증번호 재전송 버튼 (비활성화) */}
          <Pressable style={styles.resendButton} onPress={handleSendCode}>
            <Text style={styles.resendButtonText}>인증번호 재전송</Text>
          </Pressable>

          {/* 인증번호 오지 않는 경우 해결방안 (디자인팀과 상의/구현 필요)*/}
          <Pressable>
            <Text style={styles.resend}>인증번호가 오지 않나요?</Text>
          </Pressable>





          <Pressable
            style={[
              styles.button,
              code.length >= 6 ? styles.buttonActive : styles.buttonDisabled,
            ]}
            disabled={code.length < 6}
            onPress={handleVerifyCode}
          >
            <Text style={styles.buttonText}>완료</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24,
    paddingTop:80,  // 상단 여백
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 8,
    borderBottomColor: '#D1D5DB',
    left: 3,
  },

  inputWrapper: {
    position: 'relative',
    width: '100%',
  },

  input: {
    borderBottomWidth: 1, // 밑줄만
    borderBottomColor: '#D1D5DB',
    paddingVertical: 8,
    fontSize: 16,
    height: 44,
    paddingRight: 36, // X 버튼 공간 확보
  },

  clearButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }], // 세로 가운데
    padding: 4,
  },

  clearText: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',  // 전체 가로폭 사용
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonActive: {
    backgroundColor: '#3B82F6', // 파란색 (활성화)
  },

  buttonDisabled: {
    backgroundColor: '#9CA3AF', // 회색 (비활성화)
  },

  resendButton: {
    backgroundColor: '#F3F4F6', // 연한 회색
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center', // 버튼 자체를 가운데 정렬
  },

  resendButtonText: {
    fontSize: 11,
  },

  timer: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 12,
    textAlign: 'center',
    marginBottom: 8,
  },

  resend: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 10,
    marginTop: 4,
  },

  errorLabel: {
    color: '#EF4444',
    fontSize: 8,
  },

  inputError: {
    borderBottomColor: '#EF4444',
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },

});
