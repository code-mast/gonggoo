import { useRouter } from "expo-router";
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");
const scale = width / 375; // Figma 기준 iPhone 13 Pro 화면 폭 375 기준 비율

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>회원가입</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  button: {
    backgroundColor: "#FF6F0F",
    paddingVertical: 12 * scale,
    paddingHorizontal: 32 * scale,
    borderRadius: 8 * scale,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16 * scale,
    fontWeight: "600",
  },
});
