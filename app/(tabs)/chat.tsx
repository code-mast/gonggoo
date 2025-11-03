import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  role: "공구장" | "공구원";
}

const chatData: ChatItem[] = [
  { id: "1", name: "공구공구", lastMessage: "안녕하세요!", time: "방금 전", unread: 2, role: "공구장" },
  { id: "2", name: "스터디방", lastMessage: "내일 모임 어때?", time: "20분 전", unread: 0, role: "공구원" },
  { id: "3", name: "친구들", lastMessage: "치킨 시켜먹자!", time: "어제", unread: 1, role: "공구원" },
];

const categories = ["전체", "공구장", "공구원", "안 읽은 메시지"];
const { width } = Dimensions.get("window");
const scale = width / 375; // iPhone 13 기준 비율

export default function ChatListScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 카테고리 필터링
  let filteredChats = chatData.filter((chat) => {
    if (activeCategory === "전체") return true;
    if (activeCategory === "공구장") return chat.role === "공구장";
    if (activeCategory === "공구원") return chat.role === "공구원";
    if (activeCategory === "안 읽은 메시지") return chat.unread > 0;
    return true;
  });

  // 검색 필터링
  if (searchMode && searchText.trim().length > 0) {
    filteredChats = filteredChats.filter(
      (chat) =>
        chat.name.includes(searchText) || chat.lastMessage.includes(searchText)
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          {searchMode ? (
            <View style={styles.searchHeader}>
              <TouchableOpacity
                onPress={() => {
                  setSearchMode(false);
                  setSearchText("");
                }}
              >
                <Ionicons name="chevron-back" size={26 * scale} color="black" />
              </TouchableOpacity>

              <TextInput
                style={styles.searchInput}
                placeholder="닉네임 또는 메시지 검색"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            </View>
          ) : (
            <>
              <Text style={styles.title}>채팅</Text>
              <View style={styles.icons}>
                <TouchableOpacity onPress={() => router.push("/settings")}>
                  <Ionicons
                    name="settings-outline"
                    size={22 * scale}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSearchMode(true)}>
                  <Ionicons
                    name="search-outline"
                    size={22 * scale}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/notifications")}>
                  <Ionicons
                    name="notifications-outline"
                    size={22 * scale}
                    color="black"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* 카테고리 탭 */}
        {!searchMode && (
          <View style={styles.categoryTabs}>
            {categories.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.categoryButton,
                  activeCategory === tab && styles.activeCategory,
                ]}
                onPress={() => setActiveCategory(tab)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === tab && styles.activeCategoryText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 채팅 리스트 */}
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                router.push({
                  pathname: `/chatroom/${item.id}`,
                  params: { name: item.name },
                })
              }
            >
              <Image
                source={{ uri: "https://via.placeholder.com/40" }}
                style={styles.avatar}
              />
              <View style={styles.chatContent}>
                <View style={styles.row}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.row}>
                  <Text numberOfLines={1} style={styles.lastMessage}>
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: { flex: 1, backgroundColor: "#fff" },

  // 헤더
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16 * scale,
    paddingVertical: 14 * scale,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 20 * scale, fontWeight: "700" },
  icons: { flexDirection: "row" },
  icon: { marginLeft: 16 * scale },

  // 검색 모드
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10 * scale,
    marginLeft: 8 * scale,
    borderRadius: 8 * scale,
    fontSize: 16 * scale,
  },

  // 카테고리 탭
  categoryTabs: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 56 * scale,
    paddingLeft: 20 * scale,
    paddingRight: 16 * scale,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  categoryButton: {
    paddingVertical: 6 * scale,
    paddingHorizontal: 14 * scale,
    borderRadius: 20 * scale,
    marginRight: 8 * scale,
    backgroundColor: "#f5f5f5",
  },
  activeCategory: {
    backgroundColor: "#006A4E",
  },
  categoryText: {
    fontSize: 14 * scale,
    color: "#333",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  // 채팅 리스트
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14 * scale,
    paddingHorizontal: 16 * scale,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  avatar: {
    width: 42 * scale,
    height: 42 * scale,
    borderRadius: 21 * scale,
    marginRight: 12 * scale,
  },
  chatContent: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 16 * scale, fontWeight: "600" },
  lastMessage: { fontSize: 14 * scale, color: "#666", flex: 1, marginRight: 6 },
  time: { fontSize: 12 * scale, color: "#888" },
  unreadBadge: {
    backgroundColor: "#006A4E",
    borderRadius: 12 * scale,
    minWidth: 20 * scale,
    paddingHorizontal: 6 * scale,
    paddingVertical: 2 * scale,
    alignItems: "center",
  },
  unreadText: { color: "#fff", fontSize: 12 * scale, fontWeight: "600" },
});
