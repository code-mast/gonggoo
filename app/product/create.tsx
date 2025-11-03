import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router"; // ✅ 뒤로가기용
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function ProductCreateScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // ✅ router 객체 생성

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [slot, setSlot] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });
    if (!result.canceled) {
      const selected = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...selected].slice(0, 10));
    }
  };

  const handleDayPress = (day: any) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (new Date(day.dateString) < new Date(startDate)) {
        setStartDate(day.dateString);
        setEndDate(null);
      } else {
        setEndDate(day.dateString);
      }
    }
  };

  const getMarkedDates = () => {
    const marked: any = {};
    if (startDate)
      marked[startDate] = { startingDay: true, color: "#166534", textColor: "white" };
    if (startDate && endDate) {
      let current = new Date(startDate);
      const last = new Date(endDate);
      while (current <= last) {
        const formatted = current.toISOString().split("T")[0];
        marked[formatted] = {
          color:
            formatted === startDate || formatted === endDate
              ? "#166534"
              : "#A7D3B6",
          textColor: "white",
        };
        current.setDate(current.getDate() + 1);
      }
      marked[startDate].startingDay = true;
      marked[endDate].endingDay = true;
    }
    return marked;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* ✅ 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>공구 상품 등록하기</Text>
          <TouchableOpacity>
            <Text style={styles.saveText}>저장</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ 이미지 첨부 영역 */}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.cameraBox} onPress={pickImage}>
            <Ionicons name="camera-outline" size={26} color="#666" />
            <Text style={styles.imageCount}>{images.length}/10</Text>
          </TouchableOpacity>
          <FlatList
            data={images}
            horizontal
            keyExtractor={(uri) => uri}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.previewImage} />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* 제목 */}
        <Text style={styles.label}>제목</Text>
        <TextInput
          placeholder="글 제목"
          placeholderTextColor="#999"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        {/* 거래 방식 */}
        <Text style={styles.label}>거래 방식</Text>
        <View style={styles.boxRow}>
          <Text style={styles.boxText}>나눔</Text>
          <TouchableOpacity onPress={() => setIsShare(!isShare)}>
            <View style={[styles.checkbox, isShare && styles.checkedBox]}>
              {isShare && <Ionicons name="checkmark" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
        </View>

        {/* 가격 */}
        <Text style={styles.label}>가격</Text>
        <TextInput
          placeholder="₩ 가격을 입력해주세요"
          placeholderTextColor="#999"
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* 기간 설정 */}
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.boxRowInner}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.boxText}>
              {startDate && endDate ? `${startDate} ~ ${endDate}` : "기간 설정"}
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* 슬롯 */}
        <View style={styles.box}>
          <View style={styles.slotInner}>
            <Text style={styles.boxText}>슬롯</Text>
            <View style={styles.slotControls}>
              <TouchableOpacity onPress={() => setSlot((prev) => Math.max(1, prev - 1))}>
                <Text style={styles.slotBtn}>−</Text>
              </TouchableOpacity>
              <Text style={styles.slotText}>{slot}</Text>
              <TouchableOpacity onPress={() => setSlot((prev) => prev + 1)}>
                <Text style={styles.slotBtn}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 추가 설명 */}
        <Text style={styles.label}>추가 설명</Text>
        <TextInput
          placeholder="입력하세요"
          placeholderTextColor="#999"
          style={[styles.input, { height: 80 }]}
          value={description}
          multiline
          onChangeText={setDescription}
        />

        {/* 거래 정보 */}
        <Text style={styles.label}>거래 정보</Text>
        <View style={styles.box}>
          <TouchableOpacity style={styles.boxRowInner}>
            <Text style={styles.boxText}>위치 추가</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <View style={styles.boxRowInner}>
            <Text style={styles.boxText}>택배 가능</Text>
            <TouchableOpacity onPress={() => setDelivery(!delivery)}>
              <View style={[styles.checkbox, delivery && styles.checkedBox]}>
                {delivery && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 달력 모달 */}
        <Modal visible={showCalendar} transparent animationType="slide">
          <View style={styles.modalWrapper}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>공구 일정</Text>
              <Calendar
                markingType="period"
                markedDates={getMarkedDates()}
                onDayPress={handleDayPress}
                theme={{
                  selectedDayBackgroundColor: "#166534",
                  todayTextColor: "#166534",
                  arrowColor: "#166534",
                }}
              />
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={styles.applyText}>적용</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 작성 완료 버튼 */}
        <TouchableOpacity
          style={[styles.submitButton, { marginBottom: insets.bottom + 20 }]}
        >
          <Text style={styles.submitText}>작성 완료</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  saveText: { color: "#166534", fontWeight: "600" },
  imageSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  cameraBox: {
    width: 70,
    height: 70,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  imageCount: { fontSize: 12, color: "#999", marginTop: 2 },
  previewImage: { width: 70, height: 70, borderRadius: 10, marginRight: 8 },
  label: { fontSize: 13, fontWeight: "600", marginBottom: 4, color: "#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
    fontSize: 14,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  boxRowInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxText: { color: "#333", fontSize: 14 },
  slotInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotControls: { flexDirection: "row", alignItems: "center" },
  slotBtn: { fontSize: 20, width: 30, textAlign: "center", color: "#333" },
  slotText: { fontSize: 16, fontWeight: "500", color: "#333" },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.3,
    borderColor: "#bbb",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkedBox: { backgroundColor: "#166534", borderColor: "#166534" },
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalBox: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  applyBtn: {
    backgroundColor: "#166534",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 14,
  },
  applyText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  submitButton: {
    backgroundColor: "#166534",
    borderRadius: 8,
    paddingVertical: 13,
    marginTop: 20,
  },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "bold", textAlign: "center" },
});
