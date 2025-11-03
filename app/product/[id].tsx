import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: string;
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Java 백엔드 API 연동 (예시)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 API: http://your-server.com/api/products/{id}
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) throw new Error("Server Error");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        Alert.alert("오류", "상품 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorBox}>
        <Text>상품 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 상단 뒤로가기 */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#333" />
      </TouchableOpacity>

      {/* 상품 이미지 */}
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

      {/* 상품 정보 */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.seller}>판매자: {product.seller}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}원</Text>

        <Text style={styles.descTitle}>상품 설명</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {/* 하단 구매 버튼 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => Alert.alert("채팅 기능", "추후 연결 예정")}
        >
          <Ionicons name="chatbubble-outline" size={22} color="#FF6B00" />
          <Text style={styles.chatText}>채팅하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() => Alert.alert("공동구매", "주문 API 연동 예정")}
        >
          <Text style={styles.buyText}>공동구매 참여</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 4,
  },
  image: {
    width,
    height: width,
    backgroundColor: "#eee",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  seller: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: "#FF6B00",
    fontWeight: "bold",
    marginBottom: 16,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF6B00",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  chatText: {
    color: "#FF6B00",
    marginLeft: 6,
    fontWeight: "bold",
  },
  buyBtn: {
    backgroundColor: "#FF6B00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
