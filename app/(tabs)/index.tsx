import React from 'react';
import { StyleSheet, Pressable, Image, View, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const logoScale = useSharedValue(1);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  const handleLogoPress = () => {
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 2, stiffness: 80 }),
      withSpring(1, { damping: 2, stiffness: 80 })
    );
  };

  const handleStartQuiz = () => {
    router.push('/quiz-selection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Pressable onPress={handleLogoPress}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Pressable>
        </Animated.View>
        <ThemedText type="title" style={styles.title}>Selamat datang ke Wira Wang!</ThemedText>
        <ThemedText style={styles.subtitle}>Belajar tentang wang dan menjadi wira kewangan!</ThemedText>
        <Pressable style={styles.button} onPress={handleStartQuiz}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Mula Kuiz</ThemedText>
          <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable style={styles.leaderboardButton} onPress={() => router.push('/(tabs)/leaderboard')}>
          <ThemedText type="defaultSemiBold" style={styles.leaderboardButtonText}>Papan Pendahulu</ThemedText>
          <Ionicons name="trophy" size={24} color="#4CAF50" />
        </Pressable>
      </View>
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>Dibuat dengan ❤️ oleh SK Kubang Kerian 3</ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666666',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  leaderboardButton: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  leaderboardButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
  },
});
