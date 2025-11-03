import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

const { width } = Dimensions.get("window");
const scale = width / 375; // iPhone 13 기준 비율

export default function ChatRoom() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "안녕하세요!", sender: "other", time: "오후 8:00" },
    { id: "2", text: "반가워요!", sender: "me", time: "오후 8:01" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        sender: "me",
        time: "오후 8:05",
      },
    ]);
    setInput("");
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26 * scale} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
          <Ionicons name="menu" size={24 * scale} color="black" />
        </View>

        {/* 메시지 목록 */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.row,
                item.sender === "me" ? styles.myRow : styles.otherRow,
              ]}
            >
              {item.sender === "other" ? (
                <View style={styles.bubbleRow}>
                  <View style={[styles.bubble, styles.otherBubble]}>
                    <Text style={styles.otherText}>{item.text}</Text>
                  </View>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              ) : (
                <View style={styles.bubbleRow}>
                  <Text style={styles.time}>{item.time}</Text>
                  <View style={[styles.bubble, styles.myBubble]}>
                    <Text style={styles.myText}>{item.text}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
          contentContainerStyle={{ padding: 10 * scale, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        />

        {/* 입력창 */}
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom / 2 }]}>
          <TextInput
            style={styles.input}
            placeholder="메시지 입력"
            value={input}
            onChangeText={setInput}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="arrow-up" size={22 * scale} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  title: { fontSize: 16 * scale, fontWeight: "600" },

  row: { flexDirection: "row", marginVertical: 6 * scale },
  myRow: { justifyContent: "flex-end" },
  otherRow: { justifyContent: "flex-start" },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", maxWidth: "75%" },
  bubble: { padding: 10 * scale, borderRadius: 16 * scale },
  myBubble: {
    backgroundColor: "#006A4E",
    borderTopRightRadius: 0,
    marginLeft: 6 * scale,
  },
  otherBubble: {
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 0,
    marginRight: 6 * scale,
  },
  myText: { color: "#fff", fontSize: 14 * scale },
  otherText: { color: "#111", fontSize: 14 * scale },
  time: { fontSize: 11 * scale, color: "#666", marginHorizontal: 4 * scale },

  inputContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 10 * scale,
    paddingVertical: 6 * scale,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20 * scale,
    paddingHorizontal: 14 * scale,
    fontSize: 14 * scale,
  },
  sendButton: {
    marginLeft: 8 * scale,
    backgroundColor: "#006A4E",
    borderRadius: 20 * scale,
    paddingHorizontal: 14 * scale,
    justifyContent: "center",
    alignItems: "center",
  },
});
