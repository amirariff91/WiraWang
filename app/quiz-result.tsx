import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuiz } from './context/QuizContext';

export default function QuizResultScreen() {
  const { score, total } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentScore } = useQuiz();

  const handleReturnHome = () => {
    setCurrentScore(0);
    router.push('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Keputusan Kuiz</ThemedText>
      <ThemedText style={styles.result}>Skor anda: {score} daripada {total}</ThemedText>
      <Pressable style={styles.button} onPress={handleReturnHome}>
        <ThemedText style={styles.buttonText}>Kembali ke Laman Utama</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E8F5E9', // Light green background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1B5E20', // Dark green for better contrast
  },
  result: {
    fontSize: 20,
    marginBottom: 30,
    color: '#33691E', // Darker green for better contrast
  },
  button: {
    backgroundColor: '#2E7D32', // Darker green for better contrast
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});