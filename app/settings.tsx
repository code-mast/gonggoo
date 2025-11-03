import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scale = width / 375; // iPhone 13 기준

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
    >
      <View style={styles.container}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26 * scale} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>설정</Text>
          <View style={{ width: 26 * scale }} /> {/* 오른쪽 여백 맞추기 */}
        </View>

        {/* 본문 */}
        <View style={styles.body}>
          <Text style={styles.text}>⚙️ 설정 화면입니다</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12 * scale,
    paddingVertical: 14 * scale,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18 * scale,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16 * scale,
  },
});
