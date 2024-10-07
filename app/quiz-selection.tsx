import React from 'react';
import { StyleSheet, FlatList, View, Pressable, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuiz } from './context/QuizContext';

const iconNames = ['wallet-outline', 'shield-checkmark-outline', 'bar-chart-outline', 'bulb-outline'] as const;
const gradients = [
  ['#4CAF50', '#2E7D32'],
  ['#2196F3', '#1565C0'],
  ['#FF9800', '#F57C00'],
  ['#9C27B0', '#6A1B9A']
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = 150;

export default function QuizSelectionScreen() {
  const { quizData } = useQuiz();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Pilih Kategori Kuiz</ThemedText>
      <FlatList
        data={quizData}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
            <Link href={`/quiz/${item.id}`} asChild>
              <Pressable>
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
            </Link>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B5E20',
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  quizItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginVertical: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  quizInfo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});