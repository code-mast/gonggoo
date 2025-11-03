import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get("window");
  const scale = width / 375; // iPhone 13 기준 비율

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#166534",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarLabelStyle: {
          fontSize: 11 * scale,
          marginBottom: Platform.OS === "ios" ? insets.bottom * 0.1 : 2,
        },
        tabBarStyle: {
          height: 56 * scale + insets.bottom, // 홈 인디케이터 공간 포함
          paddingBottom: insets.bottom > 0 ? insets.bottom * 0.6 : 6,
          borderTopWidth: StyleSheet.hairlineWidth,
          backgroundColor: "#fff",
          position: "absolute",
        },
      }}
    >
      {/* 홈 */}
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size * scale}
              color={color}
            />
          ),
        }}
      />

      {/* 메뉴 */}
      <Tabs.Screen
        name="apply"
        options={{
          title: "메뉴",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "menu" : "menu-outline"}
              size={size * scale}
              color={color}
            />
          ),
        }}
      />

      {/* 위치 */}
      <Tabs.Screen
        name="location"
        options={{
          title: "위치",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "location-sharp" : "location-outline"}
              size={size * scale}
              color={color}
            />
          ),
        }}
      />

      {/* 채팅 */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={size * scale}
                color={color}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
          ),
        }}
      />

      {/* 마이페이지 */}
      <Tabs.Screen
        name="mypage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size * scale}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -3,
    right: -8,
    backgroundColor: "#166534",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
