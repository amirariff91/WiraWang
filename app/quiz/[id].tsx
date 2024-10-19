import React, { useState } from 'react';
import { StyleSheet, Pressable, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/app/context/QuizContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { playCorrectSound, playIncorrectSound } from '@/app/utils/sounds';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { quizData, setCurrentScore } = useQuiz();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question: number; answer: number }[]>([]);

  const quiz = quizData.find(q => q.id === id);

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Quiz not found</ThemedText>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswer = async (selectedIndex: number) => {
    const newAnswers = [...answers, { question: currentQuestionIndex, answer: selectedIndex }];
    setAnswers(newAnswers);

    if (selectedIndex === quiz.questions[currentQuestionIndex].correctAnswer) {
      await playCorrectSound();
    } else {
      await playIncorrectSound();
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = newAnswers.reduce((acc, curr) => {
        return curr.answer === quiz.questions[curr.question].correctAnswer ? acc + 1 : acc;
      }, 0);
      setCurrentScore(score);
      router.push({
        pathname: '/quiz-result',
        params: { 
          score: score.toString(),
          total: quiz.questions.length.toString(),
          answers: JSON.stringify(newAnswers),
          quizId: id
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.gradientContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </Pressable>
          <ThemedText style={styles.quizTitle}>{quiz.title}</ThemedText>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }]} />
          </View>
          <ThemedText style={styles.progress}>Soalan {currentQuestionIndex + 1} / {quiz.questions.length}</ThemedText>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Animated.View
            key={currentQuestionIndex}
            entering={FadeInRight}
            exiting={FadeOutLeft}
            style={styles.questionContent}
          >
            <ThemedText style={styles.question}>{currentQuestion.question}</ThemedText>
            {currentQuestion.options.map((option, index) => (
              <Pressable
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(index)}
              >
                <View style={styles.optionIndex}>
                  <ThemedText style={styles.optionIndexText}>{String.fromCharCode(65 + index)}</ThemedText>
                </View>
                <ThemedText style={styles.optionText}>{option}</ThemedText>
              </Pressable>
            ))}
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  gradientContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  quizTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginRight: 44,
  },
  progressBarContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 5,
  },
  progress: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  questionContent: {
    width: '100%',
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionIndex: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionIndexText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    flex: 1,
    color: '#1B5E20',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
