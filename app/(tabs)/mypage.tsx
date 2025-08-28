import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <Pressable style={styles.button} onPress={() => router.push('/login')}>
      <Text style={styles.buttonText}>회원가입</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6F0F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
