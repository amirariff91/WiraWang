import React from 'react';
import { StyleSheet, FlatList, View, Pressable, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from './context/QuizContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9;

const iconNames = ['wallet-outline', 'shield-checkmark-outline', 'bar-chart-outline', 'bulb-outline'] as const;
const gradients = [
  ['#4CAF50', '#2E7D32'],
  ['#2196F3', '#1565C0'],
  ['#FF9800', '#F57C00'],
  ['#9C27B0', '#6A1B9A']
];

export default function QuizSelectionScreen() {
  const { quizData } = useQuiz();
  const router = useRouter();

  const handleQuizSelect = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const renderQuizItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
      <Pressable onPress={() => handleQuizSelect(item.id)}>
        <LinearGradient
          colors={gradients[index % gradients.length]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.quizItem}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={iconNames[index % iconNames.length]} size={40} color="white" />
          </View>
          <View style={styles.textContainer}>
            <ThemedText type="defaultSemiBold" style={styles.quizTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.quizInfo}>{item.questions.length} Soalan</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.gradient}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.pageTitle}>Kategori Kuiz</ThemedText>
          <ThemedText style={styles.pageSubtitle}>Pilih kategori untuk memulakan kuiz</ThemedText>
        </View>
        <FlatList
          data={quizData}
          renderItem={renderQuizItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    marginTop: 5,
  },
  listContainer: {
    padding: 20,
    paddingTop: 30,
  },
  quizItem: {
    width: ITEM_WIDTH,
    height: 120,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  quizInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
