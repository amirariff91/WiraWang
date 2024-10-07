import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const mascotScale = useSharedValue(1);

  const mascotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(mascotScale.value) }],
    };
  });

  const handleMascotPress = () => {
    mascotScale.value = withSpring(1.2);
    setTimeout(() => {
      mascotScale.value = withSpring(1);
    }, 300);
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.mascotContainer, mascotStyle]}>
        <Ionicons
          name="person"
          size={200}
          color="#2E7D32" // Darker green for better contrast
          onPress={handleMascotPress}
        />
      </Animated.View>
      <ThemedText type="title" style={styles.title}>Selamat datang ke Wira Wang!</ThemedText>
      <ThemedText style={styles.subtitle}>Belajar tentang wang dan menjadi wira kewangan!</ThemedText>
      <Link href="/quiz-selection" asChild>
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Mula Kuiz</ThemedText>
        </Pressable>
      </Link>
      <Link href="/(tabs)/leaderboard" asChild>
        <Pressable style={styles.button}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Papan Pendahulu</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFDE7', // Lighter yellow for better contrast
  },
  mascotContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20', // Dark green for better contrast
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#33691E', // Darker green for better contrast
  },
  button: {
    backgroundColor: '#F57C00', // Darker orange for better contrast
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
