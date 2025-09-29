import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

export default function ChatRoom() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "안녕하세요!", sender: "other", time: "오후 8:00" },
    { id: "2", text: "반가워요!", sender: "me", time: "오후 8:01" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text: input, sender: "me", time: "오후 8:05" },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <Ionicons name="menu" size={24} color="black" />
      </View>

      {/* 메시지 목록 */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.row, item.sender === "me" ? styles.myRow : styles.otherRow]}>
            {item.sender === "other" ? (
              <View style={styles.bubbleRow}>
                <View style={[styles.bubble, styles.otherBubble]}>
                  <Text>{item.text}</Text>
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            ) : (
              <View style={styles.bubbleRow}>
                <Text style={styles.time}>{item.time}</Text>
                <View style={[styles.bubble, styles.myBubble]}>
                  <Text style={{ color: "#fff" }}>{item.text}</Text>
                </View>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />

      {/* 입력창 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지 입력"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="arrow-up" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 16, fontWeight: "600" },

  row: { flexDirection: "row", marginVertical: 6 },
  myRow: { justifyContent: "flex-end" },
  otherRow: { justifyContent: "flex-start" },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", maxWidth: "75%" },
  bubble: { padding: 10, borderRadius: 16 },
  myBubble: { backgroundColor: "#006A4E", borderTopRightRadius: 0, marginLeft: 6 },
  otherBubble: { backgroundColor: "#e0e0e0", borderTopLeftRadius: 0, marginRight: 6 },
  time: { fontSize: 11, color: "#666", marginHorizontal: 4 },

  inputContainer: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#ddd", padding: 6 },
  input: { flex: 1, backgroundColor: "#f2f2f2", borderRadius: 20, paddingHorizontal: 14 },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#006A4E",
    borderRadius: 20,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
