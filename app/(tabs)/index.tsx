import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const products = [
  {
    id: "1",
    title: "크리넥스 미용티슈 250매 × 8팩",
    price: 3900,
    image: "https://picsum.photos/200?random=1",
    location: "서울 송파구",
    participants: 3,
  },
  {
    id: "2",
    title: "코스트코 주방세제 리필팩",
    price: 7900,
    image: "https://picsum.photos/200?random=2",
    location: "부산 해운대구",
    participants: 1,
  },
  {
    id: "3",
    title: "생활공구 12종 세트",
    price: 15900,
    image: "https://picsum.photos/200?random=3",
    location: "대전 서구",
    participants: 2,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/product/${item.id}`)} // ✅ 상세 페이지 이동
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
        <View style={styles.bottomRow}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <View style={styles.participantBox}>
            <Ionicons name="people-outline" size={14} color="#166534" />
            <Text style={styles.participantText}>{item.participants}/4명</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>공구 상품</Text>
        <TouchableOpacity onPress={() => router.push("/product/create")}>
          <Ionicons name="add-circle-outline" size={26} color="#166534" />
        </TouchableOpacity>
      </View>

      {/* 상품 리스트 */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#111" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  info: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "600", color: "#111" },
  price: { fontSize: 14, color: "#166534", marginTop: 4 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  locationRow: { flexDirection: "row", alignItems: "center" },
  location: { fontSize: 12, color: "#666", marginLeft: 3 },
  participantBox: { flexDirection: "row", alignItems: "center" },
  participantText: { fontSize: 12, color: "#166534", marginLeft: 3 },
});
