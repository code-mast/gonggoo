import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scale = width / 375; // iPhone 13 기준 비율

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (step === "code" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleSendCode = () => {
    if (phone.length < 11 || phone.slice(0, 3) !== "010") {
      setError("앗, 휴대폰 번호가 맞지 않아요.");
      return;
    }
    setError("");
    setStep("code");
    setTimeLeft(300);
  };

  const handleBack = () => {
    if (step === "code") setStep("phone");
    else router.back();
  };

  const handleVerifyCode = () => {
    if (code.length < 6) {
      setError("앗, 인증번호가 맞지 않아요.");
      return;
    }
    setError("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* ✅ 뒤로가기 버튼을 ScrollView 밖으로 이동 */}
        <Pressable
          style={[styles.backButton, { top: insets.top + 10 * scale }]}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={24 * scale} color="black" />
        </Pressable>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 70 * scale }}>
            {step === "phone" ? (
              <>
                <Text style={styles.title}>휴대폰 번호로 가입해주세요.</Text>
                <Text style={[styles.subtitle, error ? styles.errorLabel : null]}>
                  휴대폰 번호
                </Text>

                {/* 입력칸 */}
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, error ? styles.inputError : null]}
                    placeholder="숫자만 입력해 주세요"
                    keyboardType="number-pad"
                    value={phone}
                    onChangeText={setPhone}
                    clearButtonMode="while-editing"
                    maxLength={11}
                  />
                  {Platform.OS === "android" && phone.length > 0 && (
                    <Pressable style={styles.clearButton} onPress={() => setPhone("")}>
                      <Text style={styles.clearText}>X</Text>
                    </Pressable>
                  )}
                </View>

                {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

                <Pressable
                  style={[
                    styles.button,
                    phone.length >= 11 ? styles.buttonActive : styles.buttonDisabled,
                  ]}
                  disabled={phone.length < 11}
                  onPress={handleSendCode}
                >
                  <Text style={styles.buttonText}>인증번호 전송</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.title}>인증번호를 입력해 주세요</Text>
                <Text style={[styles.subtitle, error ? styles.errorLabel : null]}>
                  인증번호
                </Text>

                <TextInput
                  style={[styles.input, error ? styles.inputError : null]}
                  placeholder="숫자를 입력해 주세요"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={code}
                  onChangeText={setCode}
                />

                {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

                <Pressable style={styles.resendButton} onPress={handleSendCode}>
                  <Text style={styles.resendButtonText}>인증번호 재전송</Text>
                </Pressable>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24 },
  title: {
    fontSize: 20 * scale,
    fontWeight: "700",
    marginBottom: 20 * scale,
  },
  subtitle: {
    fontSize: 10 * scale,
    borderBottomColor: "#D1D5DB",
    left: 3,
  },
  inputWrapper: { position: "relative", width: "100%" },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingVertical: 8 * scale,
    fontSize: 16 * scale,
    height: 44 * scale,
    paddingRight: 36,
  },
  clearButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -10 }],
    padding: 4,
  },
  clearText: { fontSize: 15 * scale, color: "#9CA3AF" },
  button: {
    marginTop: 20 * scale,
    paddingVertical: 14 * scale,
    borderRadius: 8 * scale,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16 * scale,
    fontWeight: "600",
  },
  buttonActive: { backgroundColor: "#3B82F6" },
  buttonDisabled: { backgroundColor: "#9CA3AF" },
  resendButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4 * scale,
    paddingHorizontal: 10 * scale,
    borderRadius: 5 * scale,
    alignSelf: "center",
    marginTop: 10 * scale,
  },
  resendButtonText: { fontSize: 11 * scale },
  timer: {
    fontSize: 14 * scale,
    color: "#EF4444",
    marginTop: 12 * scale,
    textAlign: "center",
    marginBottom: 8 * scale,
  },
  resend: {
    fontSize: 12 * scale,
    marginTop: 10 * scale,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 11 * scale,
    marginTop: 4 * scale,
  },
  errorLabel: { color: "#EF4444", fontSize: 8 * scale },
  inputError: { borderBottomColor: "#EF4444" },
  backButton: {
    position: "absolute",
    left: 16 * scale,
    zIndex: 20,
  },
});
